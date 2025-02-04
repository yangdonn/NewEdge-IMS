'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import InventorySummary from './components/dashboard/InventorySummary';
import InventoryPieChart from './components/dashboard/InventoryPieChart';
import SalesOverview from './components/dashboard/SalesOverview';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {/* Inventory Summary */}
          <Grid item xs={12}>
            <InventorySummary />
          </Grid>
          {/* Sales & Purchase Chart */}
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          {/* Inventory Pie Chart */}
          <Grid item xs={12} lg={4}>
            <InventoryPieChart />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;


