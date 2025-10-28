"use client";
import { useState, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AgGridTable from "@/components/ag-grid";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Box, Paper } from "@mui/material";
import Touchups from "./Touchups";
import TouchupsPens from "./TouchupsPens";
import { inventory_columns } from "@/constants/Grid-Table/ColDefs";
import useInventoryColumn from "@/hooks/Ag-Grid/useInventoryColumn";
import Loader from "@/components/Common/Loader";
import { useGetInventoryQuery } from "@/redux/services/profileApi";
import { getRowStyle } from "@/utils/gridStyles";
import SearchInput from "@/components/Common/CustomSearch/SearchInput";
import DropdownSearchInput from "@/components/Common/CustomSearch/DropdownSearchInput";
import CustomSelect from "@/components/Common/CustomTabs/CustomSelect";
import { useGetLocationCodesQuery } from "@/redux/services/InventoryApi";
import debounce from "lodash.debounce";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Inventory = () => {
  const tiCol = useInventoryColumn(inventory_columns);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [locationCodeInput, setLocationCodeInput] = useState("");
  const [locationCodeFilter, setLocationCodeFilter] = useState<
    string | undefined
  >(undefined);
  const [itemNoInput, setItemNoInput] = useState("");
  const [ItemNoFilter, setItemNoFilter] = useState<string | undefined>(
    undefined
  );
  const [descriptionInput, setDescriptionInput] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState<
    string | undefined
  >(undefined);
  const [descriptionTyping, setDescriptionTyping] = useState(false);

  const [selectedInventoryItem, setSelectedInventoryItem] = useState<
    any | null
  >(null);
  const [selectedTouchup, setSelectedTouchup] = useState<any | null>(null);
  const [isItemNoInputTyping, setItemNoInputTyping] = useState(false);
  const [islocationCodeInputTyping, setLocationCodeInputTyping] =
    useState(false);
  const { data, isLoading, isFetching } = useGetInventoryQuery({
    page,
    page_size: pageSize,
    location_code: locationCodeFilter || undefined,
    item_no: ItemNoFilter || undefined,
    description: descriptionFilter,
  });

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

  const onRowClicked = (params: any) => {
    setHighlightedId(params.data["Item No_"]);
    setSelectedInventoryItem(params.data);
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
  const baseLayout = [
    {
      i: "inventory",
      x: 0,
      y: 0,
      w: 12,
      h: 15,
      minW: 6,
      minH: 10,
    },
    {
      i: "touchups",
      x: 0,
      y: 20,
      w: 12,
      h: 17,
      minH: 8,
    },
    {
      i: "touchups_pens",
      x: 0,
      y: 35,
      w: 12,
      h: 17,
      minH: 8,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        // ml: 5,
        // mr: 5,
        mb: 2,
        mt: 2,
      }}
    >
      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          // justifyContent="space-between"
          gap={2}
          mb={2}
          mt={2}
          ml={10}
        >
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
        <Box>
          <CustomSelect
            label="Page Size"
            value={pageSize}
            options={[10, 50, 100]}
            onChange={(val) => setPageSize(val)}
          />
        </Box>
      </Box>
      {/* Responsive Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: baseLayout, md: baseLayout, sm: baseLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 4 }}
        rowHeight={30}
        isDraggable
        isResizable
        draggableHandle=".drag-handle"
        draggableCancel=".no-drag"
        resizeHandles={["se", "e", "s"]}
      >
        {/* Inventory Table */}
        <Paper
          key="inventory"
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            overflow: "hidden",
            ml: 5,
          }}
        >
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <AgGridTable
              rowData={rowData}
              columnDefs={tiCol}
              onRowClicked={onRowClicked}
              getRowStyle={getRowStyle(highlightedId)}
              enablePagination
              currentPage={page}
              totalPages={data?.total_pages || 1}
              onPageChange={setPage}
              pagination
              paginationPageSize={pageSize}
            />
          )}
        </Paper>

        {/* Touchups */}
        <Paper
          key="touchups"
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            overflow: "hidden",
            ml: 5,
          }}
        >
          <Touchups />
        </Paper>

        {/* Touchups Pens */}
        <Paper
          key="touchups_pens"
          sx={{
            p: 2,
            borderRadius: 3,
            height: "100%",
            overflow: "hidden",
            ml: 5,
          }}
        >
          <TouchupsPens />
        </Paper>
      </ResponsiveGridLayout>
    </Box>
  );
};

export default Inventory;
