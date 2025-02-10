// import { useState } from "react";
// import { Calendar } from "lucide-react";
// import Link from "next/link";
// import {
//   Select,
//   MenuItem,
//   InputAdornment,
//   TextField,
//   Button,
//   Box,
//   Popover,
// } from "@mui/material";
// import CustomCalendar from '@/app/(DashboardLayout)/components/report/CustomCalender';

// interface FilterBarProps {}

// const FilterBar: React.FC<FilterBarProps> = () => {
//   const [selectedItem, setSelectedItem] = useState("");
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [selectedFilter, setSelectedFilter] = useState("");
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   // Handle Calendar Popover
//   const handleDatePickerClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
  
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="space-between"
//       sx={{ padding: 2, backgroundColor: "background.paper", borderRadius: 2 }}
//     >
//       {/* Select Item Dropdown */}
//       <Select
//         value={selectedItem}
//         onChange={(e) => setSelectedItem(e.target.value as string)}
//         displayEmpty
//         sx={{ minWidth: '150px', flexGrow: 1, marginRight: '8px' }}
//       >
//         <MenuItem value="">Select Item</MenuItem>
//         <MenuItem value="item1">Item 1</MenuItem>
//         <MenuItem value="item2">Item 2</MenuItem>
//       </Select>

//       {/* Date Picker */}
//       <TextField
//         type="text"
//         value={startDate ? startDate.toDateString() : ""}
//         onClick={handleDatePickerClick}
//         placeholder="Select Date"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Calendar size={18} />
//             </InputAdornment>
//           ),
//           readOnly: true,
//         }}
//         sx={{ minWidth: '200px', flexGrow: 1, marginRight: '8px', cursor: "pointer" }}
//       />

//       {/* Popover for Calendar */}
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       >
//         <CustomCalendar
//           startDate={startDate}
//           endDate={endDate}
//           setStartDate={setStartDate}
//           setEndDate={setEndDate}
//         />
//       </Popover>

//       {/* Filter by Category Dropdown */}
//       <Select
//         value={selectedFilter}
//         onChange={(e) => setSelectedFilter(e.target.value as string)}
//         displayEmpty
//         sx={{ minWidth: '150px', flexGrow: 1, marginRight: '8px' }}
//       >
//         <MenuItem value="">Filter by category</MenuItem>
//         <MenuItem value="weekly">Weekly</MenuItem>
//         <MenuItem value="monthly">Monthly</MenuItem>
//         <MenuItem value="yearly">Yearly</MenuItem>
//       </Select>

//       {/* Apply Button with Link to Inventory Report Page */}
//       <Link href="Report/Components/InventoryReportPage" passHref>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           sx={{ minWidth: '100px', ml: 3, fontSize: 20 }}
//         >
//           Apply
//         </Button>
//       </Link>
//     </Box>
//   );
// };

// export default FilterBar;

"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  MenuItem,
  InputAdornment,
  TextField,
  Button,
  Box,
  Popover,
} from "@mui/material";
import CustomCalendar from "@/app/(DashboardLayout)/components/report/CustomCalender";

const FilterBar = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleDatePickerClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    if (!selectedItem || !startDate || !endDate || !selectedFilter) {
      alert("Please select all filters before applying.");
      return;
    }

    const query = new URLSearchParams({
      item: selectedItem,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      filter: selectedFilter,
    }).toString();

    router.push(`/Report/Components/InventoryReportPage?${query}`);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ padding: 2, backgroundColor: "background.paper", borderRadius: 2 }}
    >
      {/* Select Item Dropdown */}
      <Select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        displayEmpty
        sx={{ minWidth: "150px", flexGrow: 1, marginRight: "8px" }}
      >
        <MenuItem value="">Select Item</MenuItem>
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Monitor">Monitor</MenuItem>
        <MenuItem value="Printer">Printer</MenuItem>
      </Select>

      {/* Date Picker */}
      <TextField
        type="text"
        value={startDate ? startDate.toDateString() : ""}
        onClick={handleDatePickerClick}
        placeholder="Select Date"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Calendar size={18} />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        sx={{ minWidth: "200px", flexGrow: 1, marginRight: "8px", cursor: "pointer" }}
      />

      {/* Popover for Calendar */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <CustomCalendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Popover>

      {/* Filter by Category Dropdown */}
      <Select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        displayEmpty
        sx={{ minWidth: "150px", flexGrow: 1, marginRight: "8px" }}
      >
        <MenuItem value="">Filter by category</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="yearly">Yearly</MenuItem>
      </Select>

      {/* Apply Button */}
      <Button variant="contained" color="primary" sx={{ minWidth: "100px", ml: 3, fontSize: 16 }} onClick={handleApply}>
        Apply
      </Button>
    </Box>
  );
};

export default FilterBar;

