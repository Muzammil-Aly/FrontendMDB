"use client";
import AgGridTable from "@/components/ag-grid";
import { users } from "@/constants/Grid-Table/ColDefs";
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
import UserDetailsModal from "./UserDetailsModal";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Send } from "@mui/icons-material";
import debounce from "lodash.debounce";
import { formatDate } from "@/utils/FormatDate";
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetSegmentsQuery } from "@/redux/services/profileApi";
import { exportProfilesToPDF } from "@/utils/exportPDF";
interface SegmentOption {
  id: string;
  name: string;
}
const Profile = () => {
  const userCol = useUsersColumn(users);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [storeFilter, setStoreFilter] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState(10);
  const [segmentFilter, setSegmentFilter] = useState<string | undefined>(
    undefined
  );

  const [segmentSearch, setSegmentSearch] = useState("");

  const { data, isLoading, refetch, isFetching } = useGetProfilesQuery(
    {
      page,
      page_size: pageSize,
      email: searchTerm,
      store: storeFilter,
      segments: segmentFilter,
    },
    { skip: false }
  );

  const rowData = useMemo(() => {
    const results = data?.data || [];

    return results.map((item: any) => {
      const location = item.attributes.location || {};

      return {
        id: item.id,
        name: `${item.attributes.first_name} ${item.attributes.last_name}`,
        email: item.attributes.email,
        phone_number: item.attributes.phone_number,
        organization: item.attributes.organization,
        order_history:
          item.attributes.predictive_analytics?.historic_number_of_orders ?? 0,
        status:
          item.attributes.subscriptions?.email?.marketing?.consent ?? "unknown",
        least_active: formatDate(item.attributes.last_event_date),
        country: location.country || "N/A",
        city: location.city || "N/A",
        postal: location.zip || "N/A",
        address: location.address1 || "N/A",
        subscriptions: item.attributes.subscriptions ?? {},
        predictive_analytics: item.attributes.predictive_analytics ?? {},
        store: item.store ?? "N/A",
        segments: (item.segments || []).join(", ") || "N/A",
      };
    });
  }, [data]);
  const { data: segmentsData } = useGetSegmentsQuery({
    page: 1,
    page_size: 100,
  });

  const segmentOptions = useMemo(() => {
    const seen = new Set();
    return (segmentsData?.data || [])
      .filter((seg: any) => {
        if (seen.has(seg.name)) return false;
        seen.add(seg.name);
        return true;
      })
      .map((seg: any) => ({
        id: seg.id,
        name: seg.name,
      }));
  }, [segmentsData]);

  const exportToPDF = () => {
    // exportProfilesToPDF(rowData, pageSize, storeFilter, segmentSearch);
  };

  const onRowClicked = (params: any) => {
    setSelectedUser(params.data);
    setModalOpen(true);
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

  return (
    <Box
      m={4}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pr={3}
      >
        <Typography variant="h1" p={2} color="#0D0D12" fontWeight={700}>
          User Profile
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
            <Select
              value={storeFilter || ""}
              onChange={(e: any) => {
                setStoreFilter(e.target.value);
                setPage(1);
              }}
              displayEmpty
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Stores</MenuItem>
              <MenuItem value="namesake">Namesake</MenuItem>
              <MenuItem value="babyletto">Babyletto</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            freeSolo
            options={segmentOptions as SegmentOption[]}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            inputValue={segmentSearch}
            onInputChange={(event, newInputValue) => {
              setSegmentSearch(newInputValue);
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "object" && newValue !== null) {
                setSegmentFilter(newValue.id);
                setSegmentSearch(newValue.name);
              } else {
                setSegmentFilter(undefined);
              }
              setPage(1);
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by Segment"
                placeholder="Type segment name..."
                size="small"
              />
            )}
            sx={{ minWidth: 200 }}
          />

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

          <FormControl size="small">
            <button
              onClick={() =>
                exportProfilesToPDF(
                  rowData,
                  pageSize,
                  storeFilter,
                  segmentSearch
                )
              }
              style={{
                padding: "6px 12px",
                backgroundColor: "#004FA7",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Export PDF
            </button>
          </FormControl>

          {/* <FormControl size="small">
            <InputLabel>Segmentation</InputLabel>
            <Select
              // value={pageSize}
              // onChange={(e) => {
              //   setPageSize(Number(e.target.value));
              //   // setPage(1);
              // }}
              label="Select segmentation"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={"Segmentation1"}>Segmentation1</MenuItem>
              <MenuItem value={"Segmentation2"}>Segmentation2</MenuItem>
              <MenuItem value={"Segmentation3"}>Segmentation3</MenuItem>
            </Select>
          </FormControl> */}
        </Box>
      </Box>

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={userCol}
          onRowClicked={onRowClicked}
          height={450}
          enablePagination
          currentPage={page}
          totalPages={data?.total_pages || 1}
          onPageChange={(newPage: any) => setPage(newPage)}
          pagination={false}
        />
      )}

      <UserDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        userData={selectedUser}
      />
    </Box>
  );
};

export default Profile;
