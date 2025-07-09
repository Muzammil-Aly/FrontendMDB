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

const Profile = () => {
  const userCol = useUsersColumn(users);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [storeFilter, setStoreFilter] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, refetch, isFetching } = useGetProfilesQuery(
    { page, page_size: pageSize, email: searchTerm, store: storeFilter },
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
      };
    });
  }, [data]);

  const exportToPDF = () => {
    const doc = new jsPDF("l", "pt", "a4");

    const appliedStore = storeFilter ? storeFilter : "All Stores";
    const title = `${pageSize} User Profile from ${appliedStore}`;

    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;

    doc.setFontSize(14);
    doc.text(title, x, 30); // ✅ Use the centered x here

    const tableData = rowData.map((row: any) => [
      row.name,
      row.email,
      row.phone_number,
      row.organization,
      row.order_history,
      row.status,
      row.country,
      row.city,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [
        [
          "Name",
          "Email",
          "Phone",
          "Org",
          "Orders",
          "Status",
          "Country",
          "City",
        ],
      ],
      body: tableData,
      styles: {
        fontSize: 9,
        cellPadding: { top: 4, right: 4, bottom: 4, left: 4 },
        overflow: "linebreak",
        valign: "middle",
      },
      headStyles: {
        fillColor: [0, 79, 167],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 180 },
        2: { cellWidth: 90 },
        3: { cellWidth: 100 },
        4: { cellWidth: 80, halign: "center" },
        5: { cellWidth: 80 },
        6: { cellWidth: 80 },
        7: { cellWidth: 80 },
      },
      margin: { left: 40, right: 40 },
      tableWidth: "auto",
      theme: "striped",
    });

    doc.save("UserProfiles.pdf");
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
              onClick={exportToPDF}
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
