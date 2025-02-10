import React from "react";
import { Typography } from "@mui/material";
import DashboardCard from "../../components/shared/DashboardCard";
import FilterBar from "./Filter"; // Import FilterBar

const InventoryReport: React.FC = () => {
  return (
    <DashboardCard>
      <>
        <Typography variant="h5" fontWeight="bold">Inventory Report</Typography>
        <FilterBar /> {/* No need for state, as navigation is handled inside FilterBar */}
      </>
    </DashboardCard>
  );
};

export default InventoryReport;
