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
    <Box
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
        <Box>
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              // background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              borderRadius: "16px",
              // boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: "2.5rem",
                background: "linear-gradient(90deg, black)",
                WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px",
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "60%",
                  height: "4px",
                  left: "20%",
                  bottom: -8,
                  // background: "linear-gradient(90deg, #004080)",
                  borderRadius: "4px",
                },
              }}
            >
              Inventory
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"} gap={2}>
          <Box>
            {/* <FormControl size="small" sx={{ width: 160 }}>
              <TextField
                label="Location Code"
                value={locationCodeInput.toUpperCase()}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocationCodeInput(value);

                  if (value.trim() === "") {
                    setLocationCodeFilter(undefined);
                    debouncedLocationCode.cancel(); // cancel pending debounce
                  } else {
                    debouncedLocationCode(value);
                    setLocationCodeInputTyping(true);
                  }
                }}
                size="small"
                placeholder="Location Code"
                InputProps={{
                  endAdornment: locationCodeInput.trim() !== "" &&
                    islocationCodeInputTyping && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    ),
                }}
              />
            </FormControl> */}

            <SearchInput
              label="Location Code"
              value={locationCodeInput}
              // setValue={setDescriptionInput}
              setValue={(val) => {
                setLocationCodeInput(val);
                setLocationCodeInputTyping(true);
              }}
              setFilter={setLocationCodeFilter}
              debouncedFunction={debouncedLocationCode}
              loading={islocationCodeInputTyping}
              width={160}
            />
          </Box>

          <Box>
            {/* <FormControl size="small" sx={{ width: 160 }}>
              <TextField
                label="Item No"
                value={itemNoInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setItemNoInput(value);

                  if (value.trim() === "") {
                    setItemNoFilter(undefined);
                    debouncedItemNo.cancel(); // cancel pending debounce
                  } else {
                    debouncedItemNo(value);
                    setItemNoInputTyping(true);
                  }
                }}
                size="small"
                placeholder="Item No"
                InputProps={{
                  endAdornment: itemNoInput.trim() !== "" &&
                    isItemNoInputTyping && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    ),
                }}
              />
            </FormControl> */}
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
            />
          </Box>
          {/* <FormControl size="small" sx={{ width: 160 }}>
            <TextField
              label="Description"
              value={descriptionInput}
              onChange={(e) => {
                const value = e.target.value;
                setDescriptionInput(value);

                if (value.trim() === "") {
                  setDescriptionFilter(undefined);
                  debouncedDescription.cancel(); // cancel pending debounce
                } else {
                  debouncedDescription(value);
                  setDescriptionTyping(true);
                }
              }}
              size="small"
              placeholder="Description"
              InputProps={{
                endAdornment: descriptionInput.trim() !== "" &&
                  descriptionTyping && (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ),
              }}
            />
          </FormControl> */}

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
          />
          <Box>
            <CustomSelect
              label="Page Size"
              value={pageSize}
              options={[10, 50, 100]}
              onChange={(val) => {
                setPageSize(val); // val is already a number
                setPage(1);
              }}
            />
          </Box>
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
    </Box>
  );
};

export default Inventory;
