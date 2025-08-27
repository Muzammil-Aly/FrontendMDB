"use client";
import {
  users,

} from "@/constants/Grid-Table/ColDefs";

import useUsersColumn from "@/hooks/Ag-Grid/useUsersColumn";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Autocomplete,
  ListSubheader,
} from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Phone, Send } from "@mui/icons-material";
import debounce from "lodash.debounce";
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";

import Orders from "./Orders";
import SupportTickets from "./SupportTickets";

import ResponsiveDashboard from "./TabsContent/ResponsiveDashboard";
import MarketingEvents from "./MarketingEvents";
import DetailedInfo from "./DetailedInfo";
interface SegmentOption {
  id: string;
  name: string;
}
const Profile = () => {
  const userCol = useUsersColumn(users);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const [activeMenu, setActiveMenu] = useState("Customer Profiles");
  const menuItems = [
    "Customer Profiles",
    "Orders",
    "Support Tickets",
    "Marketing Events",
    "Profile Information",
  ];

  const [sourceFilter, setSourceFilter] = useState<string | undefined>(
    undefined
  );
  const [customerIdFilter, setCustomerIdFilter] = useState<string | undefined>(
    undefined
  );


  const { data, isLoading, refetch, isFetching } = useGetProfilesQuery(
    {
      page,
      page_size: pageSize,
      email: searchTerm || undefined,
      source: sourceFilter || undefined,
      customer_id: customerIdFilter || undefined,
    },
    { skip: false }
  );

  const rowData = useMemo(() => {
    const results = data?.data || [];

    return results.map((item: any) => {

      return {
        email: item.email,
        Phone: item.phone || "",
        full_name: item.full_name || "",
        source: item.source || "",
        customer_id: item.customer_id || "",
        join_type: item.join_type || "",
        key: item.key || "",
      };
    });
  }, [data]);


const onRowClicked = (params: any) => {
  if (selectedUser?.customer_id === params.data.customer_id) {
    // same row clicked again → clear & close
    setSelectedUser(null);
  } else {
    // new row → set and open
    setSelectedUser(params.data);
  }
};
const getRowStyle = (params: any) => {
  if (selectedUser?.customer_id === params.data.customer_id) {
   return {
  backgroundColor: "#E0E0E0", // MUI primary.main (blue 700)
   color: "#fff !important",      //           // white text for contrast
  fontWeight: 600,            // makes it stand out a bit more
};
  }
  return {};
};




  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
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
    }
  };

  const menuConfig: Record<string, {  component?: React.ReactNode;
  }> = {
    Orders: {
      
             component: <Orders />,

            
    },
 
    "Support Tickets": {
     
     
       component: <  SupportTickets />,

    },

    "Marketing Events": {
     
       component: <  MarketingEvents />,


    },
    "Profile Information": {
     
       component: <  DetailedInfo/>,


    },

  };
  


const sourceOptions = ["All", "Klaviyo", "Shopify", "Wismo"];

  return (
    <Box display="flex" >
      <Box
        sx={{
          width: 200,
          height: 800,
          borderRight: "1px solid #ddd",
          bgcolor: "#f9f9f9",
          p: 2,
        }}
      >
        <Typography variant="h1" p={2} color="#0D0D12" fontWeight={700}>
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
              fontWeight: activeMenu === item ? "bold" : "normal",
              bgcolor: activeMenu === item ? "#e0e0e0" : "transparent",
              borderRadius: "10px",
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {activeMenu === "Customer Profiles" && (
        <Box flex={1} p={2}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={3}
          >
            <Typography variant="h1" p={2} color="#0D0D12" fontWeight={700}>
              Profile
            </Typography>

            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Box mt={-1}>
                <Box display={"flex"} alignItems="center" gap={1}>
                  <CustomSearchField
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search by Email"
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

              <FormControl size="small">
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
              </FormControl>

            
<FormControl size="small" sx={{ minWidth: 200, ml: 2 }}>
  <Autocomplete
    size="small"
    options={sourceOptions}
    value={sourceFilter ?? "All"}
    onChange={(e, newValue) => {
      setSourceFilter(!newValue || newValue === "All" ? undefined : newValue);

      setPage(1);
    }}
    renderInput={(params) => (
      <TextField {...params} label="Source" placeholder="Search by Source" />
    )}
  />
</FormControl>

              <FormControl size="small">
                <InputLabel>Page Size</InputLabel>
                <Select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  label="Page Size"
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>

             

             
            </Box>
          </Box>

          {isLoading || isFetching ? (
            <Loader />
          ) : (

            <ResponsiveDashboard
  rowData={rowData}
  userCol={userCol}
  onRowClicked={onRowClicked}
    getRowStyle={getRowStyle} 
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
