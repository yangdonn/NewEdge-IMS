"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import InventorySummary from "../components/dashboard/InventorySummary";
import DashboardCard from "../components/shared/DashboardCard";
import Buttons from "../components/inventoryelement/buttons";

const Inventory = () => {
  return (
    <PageContainer title="Inventory" description="this is inventory">
      {/* Wrap the multiple children inside a Box */}
      <Box>
        <Grid container spacing={3}>
          {/* Inventory Summary */}
          <Grid item xs={12}>
            <InventorySummary />
          </Grid>

          {/* Dashboard Card containing the Table */}
          <Grid item xs={12}>
            <DashboardCard>
              <>
                <Buttons />
              </>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Inventory;
