"use client";
import { users } from "@/constants/Grid-Table/ColDefs";
import { useRouter } from "next/navigation";
import useUsersColumn from "@/hooks/Ag-Grid/useUsersColumn";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
  InputAdornment,
  ListSubheader,
  AppBar,
  Toolbar,
  Button,
  Chip,
  Popover,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState, useMemo, useEffect } from "react";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Phone, Send } from "@mui/icons-material";
import debounce from "lodash.debounce";
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";

import Orders from "./Orders";
import SupportTickets from "./SupportTickets";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ResponsiveDashboard from "./TabsContent/ResponsiveDashboard";
import MarketingEvents from "./MarketingEvents";
import DetailedInfo from "./ProfileInfo";

import { getRowStyle } from "@/utils/gridStyles";
import { alignItems } from "@mui/system";
// import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import InventoryIcon from "@mui/icons-material/Inventory";
import Sidebar from "./Sidebar";
import CustomerIdFilter from "./TabsContent/Inventory";
import BadgeIcon from "@mui/icons-material/Badge";
import Inventory from "./Inventory";
interface SegmentOption {
  id: string;
  name: string;
}
const Profile = () => {
  const userCol = useUsersColumn(users);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null
  );

  React.useState<string | number | null>(null); // for row style

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [activeMenu, setActiveMenu] = useState("Profile Information");
  const menuItems = [
    {
      key: "Profile Information",
      label: "Profile Information",
      icon: <InfoIcon />,
    },
    {
      key: "Customer Profiles",
      label: "Customer Profiles",
      icon: <PeopleIcon />,
    },
    { key: "Orders", label: "Orders", icon: <ShoppingCartIcon /> },
    {
      key: "Support Tickets",
      label: "Support Tickets",
      icon: <SupportAgentIcon />,
    },
    { key: "Marketing Events", label: "Marketing Events", icon: <EventIcon /> },
    {
      key: "Inventory",
      label: "Inventory",
      icon: <InventoryIcon />, // make sure you import this icon
    },
  ];

  const [sourceFilter, setSourceFilter] = useState<string | undefined>(
    undefined
  );
  const [customerIdFilter, setCustomerIdFilter] = useState<string | undefined>(
    undefined
  );
  const [fullNameFilter, setFullNameFilter] = useState<string | undefined>(
    undefined
  );
  const [phoneNumberFilter, setPhoneNumberFilter] = useState<
    string | undefined
  >(undefined);
  const [customerIdInput, setCustomerIdInput] = useState("");
  const [fullNameInput, setFullNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCustomerIDTyping, setIsCustomerIDTyping] = useState(false);
  const [isFullNameTyping, setIsFullNameTyping] = useState(false);
  const [isPhoneNumberTyping, setIsPhoneNumberTyping] = useState(false);
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [lastDateFilter, setLastDateFilter] = useState<string | undefined>(
    undefined
  );
  const [lastDateInput, setLastDateInput] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dateInput, setDateInput] = useState<any>(null);
  const router = useRouter();
  const { data, isLoading, refetch, isFetching } = useGetProfilesQuery(
    {
      page,
      page_size: pageSize,
      email: searchTerm || undefined,
      source: sourceFilter || undefined,
      customer_id: customerIdFilter || undefined,
      full_name: fullNameFilter || undefined,
      phone: phoneNumberFilter || undefined,
      created_at: dateFilter || undefined,
      last_order_date: lastDateFilter || undefined,
    },
    { skip: false }
  );

  const rowData = useMemo(() => {
    const results = data?.data || [];

    return results.map((item: any) => {
      return {
        email: item.email,
        phone: item.phone || "",
        full_name: item.full_name || "",
        source: item.source || "",
        customer_id: item.customer_id || "",
        join_type: item.join_type || "",
        key: item.key || "",
        created_at: item.created_at || "",
        last_order_date: item.last_order_date || "",
        total_orders: item.total_orders || "",
      };
    });
  }, [data]);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("loggedIn");
  //   if (!loggedIn) {
  //     router.push("/sign-in"); // redirect if not signed in
  //   }
  // }, [router]);

  // const onRowClicked = (params: any) => {
  //   if (selectedUser?.customer_id === params.data.customer_id) {
  //     // same row clicked again → clear & close
  //     setSelectedUser(null);
  //   } else {
  //     // new row → set and open
  //     setSelectedUser(params.data);
  //   }
  // };
  // const onRowClicked = (params: any) => {
  //   const custId = params.data.customer_id;

  //   // Only allow numeric IDs (either number or string of digits)
  //   const numericCustId =
  //     typeof custId === "number"
  //       ? custId
  //       : /^\d+$/.test(custId)
  //       ? parseInt(custId, 10)
  //       : null;

  //   if (!numericCustId) {
  //     // If not numeric → do nothing (or show toast/message if you want)
  //     return;
  //   }

  //   if (selectedUser?.customer_id === numericCustId) {
  //     // same row clicked again → clear & close
  //     setSelectedUser(null);
  //   } else {
  //     // new row → set and open
  //     setSelectedUser({ ...params.data, customer_id: numericCustId });
  //   }
  // };

  // const getRowStyle = (params: any) => {
  //   if (selectedUser?.customer_id === params.data.customer_id) {
  //     return {
  //       backgroundColor: "#E0E0E0", // MUI primary.main (blue 700)
  //       color: "#fff !important", //           // white text for contrast
  //       fontWeight: 600, // makes it stand out a bit more
  //     };
  //   }
  //   return {};
  // };
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("loggedIn");
  //   if (!isLoggedIn) {
  //     router.replace("/sign-in"); // redirect if not logged in
  //   }
  // }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/sign-in");
  };
  const onRowClicked = (params: any) => {
    const event = params?.event;
    if ((event?.target as HTMLElement).closest(".MuiIconButton-root")) {
      return; // ignore clicks from any MUI icon button
    }
    const { customer_id } = params.data;

    // always set highlight for clicked row
    setHighlightedId(customer_id);

    // check if ID is numeric
    if (!isNaN(Number(customer_id))) {
      // numeric → send to next component
      if (selectedUser?.customer_id === customer_id) {
        setSelectedUser(null); // toggle off
      } else {
        setSelectedUser(params.data);
      }
    } else {
      // string → don't send to next component
      setSelectedUser(null);
    }
  };

  // const getRowStyle = (params: any) => {
  //   if (highlightedId === params.data.customer_id) {
  //     return {
  //       backgroundColor: "#E0E0E0",
  //       color: "#fff !important",
  //       fontWeight: 600,
  //     };
  //   }
  //   return {};
  // };
  // const getRowStyle = (params: any) => {
  //   // 🔹 If highlighted row → apply highlight style first
  //   if (highlightedId === params.data.customer_id) {
  //     return {
  //       backgroundColor: "#E0E0E0",
  //       color: "#fff", // no need for !important here
  //       fontWeight: 600,
  //     };
  //   }

  //   // 🔹 Otherwise alternate row colors
  //   if (params.node.rowIndex % 2 === 0) {
  //     return { backgroundColor: "#f9f9f9" }; // even row
  //   } else {
  //     return { backgroundColor: "#ffffff" }; // odd row
  //   }
  // };

  const debouncedCustomerId = useMemo(
    () =>
      debounce((value: string) => {
        setCustomerIdFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setIsCustomerIDTyping(false);
      }, 5000),
    []
  );

  const debouncedFullName = useMemo(
    () =>
      debounce((value: string) => {
        setFullNameFilter(value ? value : undefined);
        setPage(1);
        setIsFullNameTyping(false);
      }, 5000),
    []
  );

  const debouncedPhoneNumber = useMemo(
    () =>
      debounce((value: string) => {
        setPhoneNumberFilter(value ? value : undefined);
        setPage(1);
        setIsPhoneNumberTyping(false);
      }, 5000),
    []
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
        setIsTyping(false);
      }, 5000),
    []
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setSearchTerm("");
      setPage(1);
      debouncedSearch.cancel(); // cancel pending debounce
    } else {
      debouncedSearch(value);
      setIsTyping(true);
    }
  };

  const menuConfig: Record<string, { component?: React.ReactNode }> = {
    Orders: {
      component: <Orders />,
    },

    "Support Tickets": {
      component: <SupportTickets />,
    },

    "Marketing Events": {
      component: <MarketingEvents />,
    },
    "Profile Information": {
      component: <DetailedInfo />,
    },
    Inventory: {
      component: <Inventory />,
    },
  };

  const sourceOptions = ["All", "Klaviyo", "Shopify", "Wismo", "Zendesk"];

  return (
    <Box display="flex">
      {/* <Box
        sx={{
          width: 200,
          height: 800,
          borderRight: "1px solid #ddd",
          bgcolor: "#f9f9f9",
          p: 2,
        }}
      >
        <Typography
          variant="h1"
          p={2}
          color="#0D0D12"
          fontWeight={700}
          mb={10}
          mt={1}
        >
          UCP
        </Typography>
        {menuItems.map((item) => (
          <Typography
            key={item}
            component="h2"
            variant="subtitle2"
            onClick={() => setActiveMenu(item)}
            sx={{
              p: 2,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeMenu === item ? "bold" : "normal",
              bgcolor: activeMenu === item ? "#e0e0e0" : "transparent",
              borderRadius: "10px",
            }}
            // sx={{
            //           p: 1,
            //           borderRadius: 1,
            //           cursor: "pointer",
            //           fontWeight: activeMenu ? 600 : 400,
            //           bgcolor: activeMenu ? "#e0e0e0" : "transparent",
            //           "&:hover": { bgcolor: "#F3F4F6" },
            //           fontSize: 15,
            //         }}
          >
            {item}
          </Typography>
        ))}
        <Button
          sx={{
            mt: 13,
            ml: 2,
            backgroundColor: "#4C4C4C",
            color: "#ffff",
            padding: "10px",
          }}
          // color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          variant="outlined" // or "contained" for a filled button
        >
          Logout
        </Button>
      </Box> */}
      {/* <Box
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        sx={{
          position: "fixed",
          width: isSidebarOpen ? 200 : 70,
          height: "100vh",
          borderRight: "1px solid #ddd",
          bgcolor: "#f9f9f9",
          p: 2,
          transition: "width 0.3s ease",
          overflow: "hidden",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h1"
          p={2}
          color="#0D0D12"
          fontWeight={700}
          // mb={10}
          mt={1}
          sx={{
            fontSize: isSidebarOpen ? 40 : 35,
            textAlign: isSidebarOpen ? "left" : "center",
          }}
        >
          {isSidebarOpen ? (
            "UCP"
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              {"UCP".split("").map((char) => (
                <span key={char}>{char}</span>
              ))}
            </Box>
          )}
        </Typography>

        {menuItems.map((item) => (
          <Box
            key={item.key}
            onClick={() => setActiveMenu(item.key)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: isSidebarOpen ? 1.5 : 0,
              p: 1.5,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeMenu === item.key ? "bold" : "normal",
              bgcolor: activeMenu === item.key ? "#e0e0e0" : "transparent",
              borderRadius: "10px",
              justifyContent: isSidebarOpen ? "flex-start" : "center",
              "&:hover": { bgcolor: "#F3F4F6" },
              transition: "all 0.2s ease",
            }}
          >
            {item.icon}
            {isSidebarOpen && item.label}
          </Box>
        ))}
        <Button
          sx={{
            mt: 10,
            ml: isSidebarOpen ? 2 : -1.5,
            backgroundColor: "#4C4C4C",
            color: "#ffff",
            padding: "8px",
            width: isSidebarOpen ? "auto" : "50px",
            justifyContent: isSidebarOpen ? "flex-start" : "center",
            borderRadius: "10px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          startIcon={
            isSidebarOpen ? <LogoutIcon sx={{ fontSize: 16 }} /> : null
          }
          onClick={handleLogout}
          variant="outlined"
        >
          {isSidebarOpen ? "Logout" : <LogoutIcon sx={{ fontSize: 16 }} />}
        </Button>
      </Box> */}
      <Sidebar
        menuItems={menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogout={handleLogout}
      />
      {activeMenu === "Customer Profiles" && (
        <Box flex={1} pl={1.5}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pl={7}
          >
            <Box display={"flex"} flexDirection={"column"}>
              {/* <Typography
            variant="h2"
            p={2}
            mb={1}
            color="#0D0D12"
            fontWeight={700}
          >
            Profile Information
          </Typography> */}
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="h1" p={2} color="#0D0D12" fontWeight={700}>
                  Profile
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  <FormControl size="small" sx={{ width: 150 }}>
                    <Autocomplete
                      size="small"
                      options={sourceOptions}
                      value={sourceFilter ?? "All"}
                      onChange={(e, newValue) => {
                        setSourceFilter(
                          !newValue || newValue === "All" ? undefined : newValue
                        );

                        setPage(1);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Source"
                          placeholder="Source"
                        />
                      )}
                    />
                  </FormControl>
                  <Box>
                    <FormControl size="small">
                      <InputLabel>Page Size</InputLabel>
                      <Select
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setPage(1);
                        }}
                        label="Page Size"
                        sx={{ width: 100 }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={0}
                mb={2}
                pl={1}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  gap={2}
                  pl={1}
                >
                  <Box mt={-1}>
                    <Box display={"flex"} alignItems="center" gap={1}>
                      <CustomSearchField
                        value={searchInput}
                        onChange={handleSearchInput}
                        placeholder="Search by Email"
                        InputProps={{
                          endAdornment: searchInput.trim() !== "" &&
                            isTyping && (
                              <InputAdornment position="end">
                                <CircularProgress size={20} />
                              </InputAdornment>
                            ),
                        }}
                      />

                      {
                        <Send
                          onClick={() => {
                            setSearchTerm(searchInput);
                            setPage(1);
                          }}
                          style={{
                            cursor: "pointer",
                            color: "#004FA7",
                            height: "36px",
                            width: "36px",
                          }}
                        />
                      }
                    </Box>
                  </Box>
                  <Box ml={0}>
                    {/* <FormControl size="small">
                    <TextField
                      label="Customer ID"
                      value={(customerIdFilter || "").toUpperCase()}
                      onChange={(e) => {
                        const value = e.target.value;

                        setCustomerIdFilter(
                          value ? value.toUpperCase() : undefined
                        );
                        setPage(1);
                      }}
                      size="small"
                      placeholder="Search by Customer ID"
                    />
                  </FormControl> */}
                    {/* <FormControl size="small" sx={{ width: 140 }}>
                      <TextField
                        label="Customer ID"
                        value={customerIdInput.toUpperCase()}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCustomerIdInput(value);

                          if (value.trim() === "") {
                            setCustomerIdFilter(undefined);
                            debouncedCustomerId.cancel(); // cancel pending debounce
                          } else {
                            debouncedCustomerId(value);
                            setIsCustomerIDTyping(true);
                          }
                        }}
                        size="small"
                        placeholder="Customer ID"
                        InputProps={{
                          endAdornment: customerIdInput.trim() !== "" &&
                            isCustomerIDTyping && (
                              <InputAdornment position="end">
                                <CircularProgress size={20} />
                              </InputAdornment>
                            ),
                        }}
                      />
                    </FormControl> */}

                   <FormControl size="small" sx={{ width: 140 }}>
                                     <TextField
                                       label="Customer ID"
                                       value={customerIdInput.toUpperCase()}
                                       onChange={(e) => {
                                         const value = e.target.value;
                                         setCustomerIdInput(value);
                   
                                         if (value.trim() === "") {
                                           setCustomerIdFilter(undefined);
                                           debouncedCustomerId.cancel(); // cancel pending debounce
                                         } else {
                                           debouncedCustomerId(value);
                                           setIsCustomerIDTyping(true);
                                         }
                                       }}
                                       size="small"
                                       placeholder="Customer ID"
                                       InputProps={{
                                         endAdornment: customerIdInput.trim() !== "" &&
                                           isCustomerIDTyping && (
                                             <InputAdornment position="end">
                                               <CircularProgress size={20} />
                                             </InputAdornment>
                                           ),
                                       }}
                                     />
                                   </FormControl>
                  </Box>
                  <FormControl size="small" sx={{ width: 150 }}>
                    <TextField
                      label="Full Name"
                      value={fullNameInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFullNameInput(value);

                        if (value.trim() === "") {
                          setFullNameFilter(undefined);
                          debouncedFullName.cancel();
                        } else {
                          debouncedFullName(value);
                          setIsFullNameTyping(true);
                        }
                      }}
                      size="small"
                      placeholder="Full Name"
                      InputProps={{
                        endAdornment: fullNameInput.trim() !== "" &&
                          isFullNameTyping && (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ),
                      }}
                    />
                  </FormControl>
                  <FormControl size="small" sx={{ width: 200, ml: 2 }}>
                    <TextField
                      label="Phone Number"
                      value={phoneNumberInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPhoneNumberInput(value);

                        if (value.trim() === "") {
                          setPhoneNumberFilter(undefined);
                          debouncedPhoneNumber.cancel();
                        } else {
                          debouncedPhoneNumber(value);
                          setIsPhoneNumberTyping(true);
                        }
                      }}
                      size="small"
                      placeholder="Phone Number"
                      InputProps={{
                        endAdornment: phoneNumberInput.trim() !== "" &&
                          isPhoneNumberTyping && (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          ),
                      }}
                    />
                  </FormControl>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <FormControl size="small" sx={{ width: 190 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          enableAccessibleFieldDOMStructure={false}
                          label="Created At"
                          value={dateInput}
                          onChange={(newValue) => {
                            if (!newValue) {
                              setDateInput(null);
                              setDateFilter(undefined);
                            } else {
                              setDateInput(newValue);
                              setDateFilter(
                                dayjs(newValue).format("YYYY-MM-DD")
                              );
                            }
                            setPage(1);
                          }}
                          slots={{
                            textField: (textFieldProps) => {
                              // filter out unwanted internal props
                              const {
                                sectionListRef,
                                areAllSectionsEmpty,
                                ...rest
                              } = textFieldProps;

                              return (
                                <TextField
                                  {...rest}
                                  size="small"
                                  placeholder="Select Date"
                                  InputProps={{
                                    ...rest.InputProps,
                                    endAdornment: dateInput ? (
                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          setDateInput(null);
                                          setDateFilter(undefined);
                                          setPage(1);
                                        }}
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    ) : (
                                      rest.InputProps?.endAdornment
                                    ),
                                  }}
                                />
                              );
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl size="small" sx={{ width: 190 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          enableAccessibleFieldDOMStructure={false}
                          label="Last Order Date"
                          value={lastDateInput}
                          onChange={(newValue) => {
                            if (!newValue) {
                              setLastDateInput(null);
                              setLastDateFilter(undefined);
                            } else {
                              setLastDateInput(newValue);
                              setLastDateFilter(
                                dayjs(newValue).format("YYYY-MM-DD")
                              );
                            }
                            setPage(1);
                          }}
                          slots={{
                            textField: (textFieldProps) => {
                              // filter out unwanted internal props
                              const {
                                sectionListRef,
                                areAllSectionsEmpty,
                                ...rest
                              } = textFieldProps;

                              return (
                                <TextField
                                  {...rest}
                                  size="small"
                                  placeholder="Select Date"
                                  InputProps={{
                                    ...rest.InputProps,
                                    endAdornment: lastDateInput ? (
                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          setLastDateInput(null);
                                          setLastDateFilter(undefined);
                                          setPage(1);
                                        }}
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    ) : (
                                      rest.InputProps?.endAdornment
                                    ),
                                  }}
                                />
                              );
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={40}
              >
                <Box>
                  {/* <FormControl size="small" sx={{ ml: 2 }}>
                    <TextField
                      label="Full Name"
                      value={fullNameFilter || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFullNameFilter(value ? value : undefined);
                        setPage(1);
                      }}
                      size="small"
                      placeholder="Search by Full Name"
                    />
                  </FormControl>
                  <FormControl size="small" sx={{ width: 200, ml: 2 }}>
                    <TextField
                      label="Phone Number"
                      value={phoneNumberFilter || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPhoneNumberFilter(value ? value : undefined);
                        setPage(1);
                      }}
                      size="small"
                      placeholder="Phone Number"
                    />
                  </FormControl> */}
                </Box>
              </Box>
            </Box>
          </Box>

          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <ResponsiveDashboard
              rowData={rowData}
              userCol={userCol}
              onRowClicked={onRowClicked}
              height={465}
              // getRowStyle={getRowStyle}
              getRowStyle={getRowStyle(highlightedId)}
              selectedCustId={selectedUser?.customer_id}
              enablePagination
              currentPage={page}
              totalPages={data?.total_pages || 1}
              onPageChange={(newPage: any) => setPage(newPage)}
              pagination={false}
              currentMenu="profiles"
              paginationPageSize={pageSize}
            />
          )}
        </Box>
      )}

      {menuConfig[activeMenu] && (
        <Box flex={1} p={1}>
          {menuConfig[activeMenu]?.component
            ? menuConfig[activeMenu].component
            : null}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
