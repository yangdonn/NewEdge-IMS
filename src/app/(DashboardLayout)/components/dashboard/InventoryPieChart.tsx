import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CardContent, Box } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

// Register required components for a Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryPieChart = () => {
  const data = {
    labels: ['In stock', 'Out of stock'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#2563eb', '#c084fc'], // Keep the original colors
        borderColor: '#fff', // White border for better separation
        borderWidth: 2,
        hoverOffset: 8, // Slight hover effect
      },
    ],
  };

  const handleLegendClick = (e: any) => {
    e.stopPropagation(); // Custom legend behavior
  };

  return (
    <DashboardCard title="Inventory Overview">
      <CardContent sx={{ display: 'flex', justifyContent: 'center', height: 332, p: 1 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Pie data={data} onClick={handleLegendClick} />
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default InventoryPieChart;
