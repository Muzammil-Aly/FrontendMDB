"use client";
import AgGridTable from "@/components/ag-grid";
import { inventory_columns } from "@/constants/Grid-Table/ColDefs";
import useInventoryColumn from "@/hooks/Ag-Grid/useInventoryColumn";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import Loader from "@/components/Common/Loader";
import { useGetInventoryQuery } from "@/redux/services/profileApi";
import { getRowStyle } from "@/utils/gridStyles";
import debounce from "lodash.debounce";
import SearchInput from "@/components/Common/CustomSearch/SearchInput";
import CustomSelect from "@/components/Common/CustomTabs/CustomSelect";
import { useGetLocationCodesQuery } from "@/redux/services/InventoryApi";
import DropdownSearchInput from "@/components/Common/CustomSearch/DropdownSearchInput";
import Touchups from "./Touchups";
import TouchupsPens from "./TouchupsPens";
import AllTouchupsPens from "./AllTouchupsPens";
import AllTouchups from "./AllTouchups";
interface Inventory {
  "Location Code": string;
  "Item No_": string;
  Description: string;
  Qty_: number;
  ETA: string | null;
  "Qty_ Available": number;
  "Avail_ Qty_ on Hand": number;
  "Avail_ Qty_ to Commit": number;
  "Qty_ on Blocked Lot_Bin": number;
}

const Inventory = () => {
  const tiCol = useInventoryColumn(inventory_columns);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selectedTIDetail, setSelectedTIDetail] = useState<Inventory | null>(
    null
  );
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [locationCodeInput, setLocationCodeInput] = useState("");
  const [islocationCodeInputTyping, setLocationCodeInputTyping] =
    useState(false);
  const [locationCodeFilter, setLocationCodeFilter] = useState<
    string | undefined
  >(undefined);
  const [itemNoInput, setItemNoInput] = useState("");
  const [isItemNoInputTyping, setItemNoInputTyping] = useState(false);
  const [ItemNoFilter, setItemNoFilter] = useState<string | undefined>(
    undefined
  );

  const [descriptionInput, setDescriptionInput] = useState("");
  const [descriptionTyping, setDescriptionTyping] = useState(false);
  const [descriptionFilter, setDescriptionFilter] = useState<
    string | undefined
  >(undefined);

  // Fetch TI data from API
  const { data, isLoading, isFetching } = useGetInventoryQuery({
    page,
    page_size: pageSize,
    location_code: locationCodeFilter || undefined,
    item_no: ItemNoFilter || undefined,
    description: descriptionFilter,
  });

  // Map API response -> rowData
  const rowData = useMemo(() => {
    const items = data?.data || data || [];
    return Array.isArray(items)
      ? items.map((item: any) => ({
          "Location Code": item["Location Code"],
          "Item No_": item["Item No_"],
          Description: item.Description,
          Qty_: item.Qty_,
          ETA: item.ETA,
          "Qty_ Available": item["Qty_ Available"],
          "Avail_ Qty_ on Hand": item["Avail_ Qty_ on Hand"],
          "Avail_ Qty_ to Commit": item["Avail_ Qty_ to Commit"],
          "Qty_ on Blocked Lot_Bin": item["Qty_ on Blocked Lot_Bin"],
        }))
      : [];
  }, [data]);
  const {
    data: locationCodeSuggestions = [],
    isFetching: isLocationCodeLoading,
  } = useGetLocationCodesQuery(locationCodeInput, {
    skip: locationCodeInput.trim().length < 1,
  });
  // Row click handler
  const onRowClicked = (params: any) => {
    if (selectedTIDetail?.["Item No_"] === params.data["Item No_"]) {
      //   setSelectedTIDetail(null);
      setHighlightedId(null);
    } else {
      //   setSelectedTIDetail(params.data as TI);
      setHighlightedId(params.data["Item No_"]);
      // bubble up to parent if provided
    }
  };
  const debouncedLocationCode = useMemo(
    () =>
      debounce((value: string) => {
        setLocationCodeFilter(value ? value.toUpperCase() : undefined);
        setPage(1);
        setLocationCodeInputTyping(false);
      }, 5000),
    []
  );

  const debouncedItemNo = useMemo(
    () =>
      debounce((value: string) => {
        setItemNoFilter(value);
        setPage(1);
        setItemNoInputTyping(false);
      }, 5000),
    []
  );
  const debouncedDescription = useMemo(
    () =>
      debounce((value: string) => {
        setDescriptionFilter(value);
        setPage(1);
        setDescriptionTyping(false);
      }, 5000),
    []
  );

  // const debouncedCustomerId = debounce((val: string) => {
  //   setDescriptionFilter(val);
  //   setDescriptionTyping(false);
  // }, 500);

  return (
    <>
      {/* <Box
        display="flex"
        flexDirection="column"
        width="100%"
        //   justifyContent="space-between"
        //   alignItems="flex-start"
        className="drag-handle"
        pl={8}
      >
        {" "}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} gap={2} mb={2}>
            <Box>
              <DropdownSearchInput
                label="Location Code"
                value={locationCodeInput}
                // setValue={setDescriptionInput}
                setValue={setLocationCodeInput}
                setFilter={setLocationCodeFilter}
                debouncedFunction={debouncedLocationCode}
                loading={isLocationCodeLoading}
                suggestions={locationCodeSuggestions?.results || []}
                width={150}
              />
            </Box>

            <Box>
              <SearchInput
                label="Item No"
                value={itemNoInput}
                // setValue={setDescriptionInput}
                setValue={(val) => {
                  setItemNoInput(val);
                  setItemNoInputTyping(true);
                }}
                setFilter={setItemNoFilter}
                debouncedFunction={debouncedItemNo}
                loading={isItemNoInputTyping}
                width={150}
              />
            </Box>

            <SearchInput
              label="Description"
              value={descriptionInput}
              // setValue={setDescriptionInput}
              setValue={(val) => {
                setDescriptionInput(val);
                setDescriptionTyping(true);
              }}
              setFilter={setDescriptionFilter}
              debouncedFunction={debouncedDescription}
              loading={descriptionTyping}
              width={150}
            />
          </Box>
          <Box mt={-2}>
            <CustomSelect
              label="Page Size"
              value={pageSize}
              options={[10, 50, 100]}
              onChange={(val) => {
                setPageSize(val);
                setPage(1);
              }}
            />
          </Box>
        </Box>
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <AgGridTable
            rowData={rowData}
            columnDefs={tiCol}
            height={480}
            enablePagination
            onRowClicked={onRowClicked}
            getRowStyle={getRowStyle(highlightedId)}
            currentPage={page}
            totalPages={data?.total_pages || 1}
            onPageChange={(newPage: any) => setPage(newPage)}
            pagination={false}
            currentMenu="profiles"
            paginationPageSize={pageSize}
          />
        )}
        <Box sx={{ margin: 5 }}>
          <AllTouchupsPens />
          <AllTouchups />
          <Box sx={{ marginTop: 5 }}></Box>
        </Box>
      </Box> */}

      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100vh" // full viewport height
        overflow="auto" // enable scroll for entire container
        className="drag-handle"
        pl={8}
      >
        {/* Filters and Page Size */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" gap={2}>
            <DropdownSearchInput
              label="Location Code"
              value={locationCodeInput}
              setValue={setLocationCodeInput}
              setFilter={setLocationCodeFilter}
              debouncedFunction={debouncedLocationCode}
              loading={isLocationCodeLoading}
              suggestions={locationCodeSuggestions?.results || []}
              width={150}
            />
            <SearchInput
              label="Item No"
              value={itemNoInput}
              setValue={(val) => {
                setItemNoInput(val);
                setItemNoInputTyping(true);
              }}
              setFilter={setItemNoFilter}
              debouncedFunction={debouncedItemNo}
              loading={isItemNoInputTyping}
              width={150}
            />
            <SearchInput
              label="Description"
              value={descriptionInput}
              setValue={(val) => {
                setDescriptionInput(val);
                setDescriptionTyping(true);
              }}
              setFilter={setDescriptionFilter}
              debouncedFunction={debouncedDescription}
              loading={descriptionTyping}
              width={150}
            />
          </Box>

          <Box mt={2}>
            <CustomSelect
              label="Page Size"
              value={pageSize}
              options={[10, 50, 100]}
              onChange={(val) => {
                setPageSize(val);
                setPage(1);
              }}
            />
          </Box>
        </Box>
        {/* All tables in one scrollable container */}
        <Box display="flex" flexDirection="column" gap={5}>
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <AgGridTable
              rowData={rowData}
              columnDefs={tiCol}
              height={undefined} // remove fixed height
              enablePagination
              onRowClicked={onRowClicked}
              getRowStyle={getRowStyle(highlightedId)}
              currentPage={page}
              totalPages={data?.total_pages || 1}
              onPageChange={(newPage: any) => setPage(newPage)}
              pagination={false}
              currentMenu="profiles"
              paginationPageSize={pageSize}
            />
          )}

          {/* Render the other tables */}

          <AllTouchups />
          <AllTouchupsPens />
        </Box>
      </Box>
    </>
  );
};

export default Inventory;
