import { useState, useRef, useEffect } from "react";
import { Button, Tabs, Tab, TextField, MenuItem } from "@mui/material";
import { IconShoppingCart, IconBox, IconReceipt2, IconClipboardList, IconFilter } from "@tabler/icons-react";

const ReportFilters = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null); // Create a ref

  useEffect(() => {
    if (containerRef.current) {
      console.log("Container height:", containerRef.current.offsetHeight);
    }
  }, []); // Log height after render

  return (
    <div ref={containerRef} style={{ padding: "20px", background: "#f8f9fa", borderRadius: "10px" }}>
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="report tabs"
      >
        <Tab icon={<IconShoppingCart />} label="Inventory Report" />
        <Tab icon={<IconBox />} label="Purchase Report" />
        <Tab icon={<IconReceipt2 />} label="Sales Invoice Report" />
        <Tab icon={<IconClipboardList />} label="Issue Report" />
      </Tabs>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <TextField
          select
          label="Select Item"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="item1">Item 1</MenuItem>
          <MenuItem value="item2">Item 2</MenuItem>
        </TextField>

        <TextField
          label="Select Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <TextField
          select
          label="Filter by Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{ startAdornment: <IconFilter size={20} style={{ marginRight: "10px" }} /> }}
        >
          <MenuItem value="category1">Category 1</MenuItem>
          <MenuItem value="category2">Category 2</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" style={{ height: "56px" }}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;
