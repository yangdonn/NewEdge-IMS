import React from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
    // Select for week/month choice
    const [timePeriod, setTimePeriod] = React.useState('monthly');
    const handleTimePeriodChange = (event: any) => {
        setTimePeriod(event.target.value);
    };

    // Chart options
    const optionsColumnChart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 250, // Reduced size for smaller card
        },
        colors: ['#75abfa', '#51cd5d'], // Updated colors
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '60%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: 'top',
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: timePeriod === 'monthly' 
                ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'], // Dynamic x-axis based on time period
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };

    // Chart series (dummy data for now)
    const seriesColumnChart: any = [
        {
            name: 'Sales',
            data: timePeriod === 'monthly' 
                ? [355, 390, 300, 350, 390, 180, 355, 390, 290, 320, 350, 400] // Monthly data
                : [80, 120, 100, 110, 80, 120, 100, 110], // Weekly data
        },
        {
            name: 'Purchase',
            data: timePeriod === 'monthly' 
                ? [280, 250, 325, 215, 250, 310, 280, 250, 230, 270, 300, 350] // Monthly data
                : [70, 100, 90, 80, 80, 120, 100, 110], // Weekly data
        },
    ];

    return (
        <DashboardCard 
            title="Sales Overview" 
            action={
                <Select
                    labelId="time-period-dd"
                    id="time-period-dd"
                    value={timePeriod}
                    size="small"
                    onChange={handleTimePeriodChange}
                >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
            }
        >
            <Chart
                options={optionsColumnChart}
                series={seriesColumnChart}
                type="bar"
                height={300} // Reduced card height
                width="100%"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
