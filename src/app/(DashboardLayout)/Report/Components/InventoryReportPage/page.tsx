"use client";
import React from "react";
import { Typography, Box } from "@mui/material";
import InventoryReportForm from "@/app/(DashboardLayout)/Report/Components/InventoryReportForm";

const InventoryReportFormPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Inventory Report Form
      </Typography>
      <InventoryReportForm/>
    </Box>
  );
};

export default InventoryReportFormPage;
