import { Grid, Typography, Divider, Box } from "@mui/material";
import { IconBox, IconCategory, IconCheck, IconX, IconUsers } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";

const inventoryData = [
  { label: "Number of Items", value: 868, icon: <IconBox size={24} color="#FF9800" />, bgColor: "#FFF3E0" },
  { label: "Number of Categories", value: 200, icon: <IconCategory size={24} color="#9C27B0" />, bgColor: "#F3E5F5" },
  { label: "Items in Stock", value: 200, icon: <IconCheck size={24} color="#4CAF50" />, bgColor: "#E8F5E9" },
  { label: "Items out of Stock", value: 200, icon: <IconX size={24} color="#F44336" />, bgColor: "#FFEBEE" },
  { label: "Number of Suppliers", value: 31, icon: <IconUsers size={24} color="#03A9F4" />, bgColor: "#E3F2FD" },
];

const InventorySummary = () => {
  return (
    <DashboardCard
      title="Inventory Summary"
    >
      <Grid container alignItems="center" justifyContent="space-evenly">
          {inventoryData.map((item, index) => (
            <Grid
              item
              xs={12}
              sm
              key={index}
              sx={{
                mt: -2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box textAlign="center">
                {/* Icon Circular Background */}
                <Box
                  sx={{
                    display: "inline-flex",
                    backgroundColor: item.bgColor,
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={500} mt={0.1}>
                  {item.value}
                </Typography>
                <Box>
                  <Typography variant="caption" fontWeight={500} color="textPrimary">
                    {item.label}
                  </Typography>
                </Box>
              </Box>
              {/* Vertical Divider */}
              {index < inventoryData.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: 80,
                    ml: 8,
                    borderWidth: "1px",
                    borderColor: "#E0E0E0",
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
    </DashboardCard>
  );
};

export default InventorySummary;
