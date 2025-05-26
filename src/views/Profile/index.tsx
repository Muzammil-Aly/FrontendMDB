"use client";
import AgGridTable from "@/components/ag-grid";
import { users } from "@/constants/Grid-Table/ColDefs";
import { usersRow } from "@/constants/Grid-Table/RowData";
import useUsersColumn from "@/hooks/Ag-Grid/useUsersColumn";
import { Box, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import UserDetailsModal from "./UserDetailsModal";
import CustomSearchField from "@/components/Common/CustomSearch";
import dayjs, { Dayjs } from "dayjs";
import { Search } from "@mui/icons-material";
import SelectDatePicker from "@/components/Common/DatePicker/DatePicker";
import debounce from "lodash.debounce";

const Profile = () => {
  const userCol = useUsersColumn(users);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const onRowClicked = (params: any) => {
    setSelectedUser(params.data);
    setModalOpen(true);
    console.log("data", params);
  };
  const handleDate = (date: string | null) => {
    console.log("Selected Date:", date);
  };
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        console.log("debounced search", value);
      }, 3000),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };
  return (
    <>
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
          <Typography variant="h1" p={2} color="#0D0D12">
            User Profile
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={3}>
            <Box mt={-1}>
              <CustomSearchField
                endIcon={<Search />}
                placeholder="Search by name, email"
                onChange={onChange}
              />
            </Box>
            <SelectDatePicker onDateChange={handleDate} label="Start date" />
            <SelectDatePicker onDateChange={handleDate} label="End date" />
          </Box>
        </Box>
        <AgGridTable
          rowData={usersRow}
          columnDefs={userCol}
          onRowClicked={onRowClicked}
          height={450}
          enablePagination
        />
        <UserDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          userData={selectedUser}
        />
      </Box>
    </>
  );
};

export default Profile;
