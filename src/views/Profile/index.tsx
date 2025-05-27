"use client";

import AgGridTable from "@/components/ag-grid";
import { users } from "@/constants/Grid-Table/ColDefs";
import useUsersColumn from "@/hooks/Ag-Grid/useUsersColumn";
import { Box, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import UserDetailsModal from "./UserDetailsModal";
import CustomSearchField from "@/components/Common/CustomSearch";
import { Search } from "@mui/icons-material";
import SelectDatePicker from "@/components/Common/DatePicker/DatePicker";
import debounce from "lodash.debounce";
import { formatDate } from "@/utils/FormatDate";
import { useGetProfilesQuery } from "@/redux/services/profileApi";
import Loader from "@/components/Common/Loader";

const Profile = () => {
  const userCol = useUsersColumn(users);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data, isLoading } = useGetProfilesQuery();
  console.log("data=---------", data);
  const rowData = useMemo(() => {
    const results = data?.data?.results || [];

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
        predictive_analytics:item.attributes.predictive_analytics ?? {},
      };
    });
  }, [data]);

  const onRowClicked = (params: any) => {
    setSelectedUser(params.data);
    setModalOpen(true);
  };

  const handleDate = (date: string | null) => {};

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        console.log("Search:", value);
      }, 3000),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
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

      {isLoading ? (
        <Loader />
      ) : (
        <AgGridTable
          rowData={rowData}
          columnDefs={userCol}
          onRowClicked={onRowClicked}
          height={450}
          enablePagination
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
