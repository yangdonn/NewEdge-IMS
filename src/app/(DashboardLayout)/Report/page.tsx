// 'use client'
// import React, { useState } from "react";
// import { Box, Card, CardContent, Typography } from "@mui/material";
// import { IconArchive, IconTruck, IconFileInvoice, IconFileReport } from "@tabler/icons-react";
// import Link from "next/link";

// const reportData = [
//   { title: "Inventory Report", icon: <IconArchive size={25} color="#FF9800" />, path: "/Report/InventoryReport" },
//   { title: "Purchase Report", icon: <IconTruck size={25} color="#4CAF50" />, path: "/purchase-report" },
//   { title: "Sales Invoice Report", icon: <IconFileInvoice size={25} color="#9C27B0" />, path: "/sales-invoice-report" },
//   { title: "Issue Report", icon: <IconFileReport size={25} color="#03A9F4" />, path: "/issue-report" },
//   { title: "Return Report", icon: <IconFileInvoice size={25} color="#FF5722" />, path: "/return-report" },
// ];

// const ReportCards = () => {
//   // const [selectedCard, setSelectedCard] = useState(null); // State to track the clicked card
//   const [selectedCard, setSelectedCard] = useState<number | null>(null);

//   const handleCardClick = (index: number) => {
//     setSelectedCard(index); // Update the selected card index on click
//   };

//   return (
//     <Box
//       sx={{
//         p: 3.2,
//         overflowX: "auto",
//         display: "flex",
//         gap: 2,
//         "&::-webkit-scrollbar": {
//           height: 8,
//         },
//         "&::-webkit-scrollbar-thumb": {
//           backgroundColor: "#888",
//           borderRadius: 4,
//         },
//         "&::-webkit-scrollbar-thumb:hover": {
//           backgroundColor: "#555",
//         },
//       }}
//     >
//       {reportData.map((report, index) => (
//         <Link key={index} href={report.path} passHref style={{ textDecoration: "none" }}> {/* Remove underline here */}
//           <Card
//             onClick={() => handleCardClick(index)} // Update selected card on click
//             sx={{
//               mt: -3,
//               minWidth: 240,
//               backgroundColor: "#F9F9F9",  // Light background for better contrast
//               border: "1px solid #E0E0E0",  // Border for separation
//               borderRadius: "7px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Increased shadow for contrast
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "63px",
//               cursor: "pointer", // Cursor indicates clickable card
//               transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease", // Smooth transition
//               ...(selectedCard === index && {
//                 borderColor: "transparent", // No visible border change on selection
//                 backgroundColor: "#e8f0fe", // Subtle light blue on active card
//               }),
//               "&:hover": {
//                 transform: "scale(1.05)", // Slight scale-up effect on hover
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Increase shadow on hover
//                 backgroundColor: "#f0f1f3", // Softer background color on hover
//               },
//             }}
//           >
//             <CardContent
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 3,
//                 padding: 3,
//                 height: "100%",
//                 "&:focus": {
//                   outline: "none", // Remove the outline if the card is focused
//                 },
//               }}
//             >
//               <Box display="flex" justifyContent="center">
//                 {report.icon}
//               </Box>
//               <Typography
//                 variant="subtitle1"
//                 fontWeight="bold"
//                 sx={{
//                   color: selectedCard === index ? "blue" : "black", // Change text color when selected
//                   transition: "color 0.3s ease", // Smooth transition for text color change
//                 }}
//               >
//                 {report.title}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Link>
//       ))}
//     </Box>
//   );
// };

// export default ReportCards;

'use client';

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { IconArchive, IconTruck, IconFileInvoice, IconFileReport, IconArrowBack  } from "@tabler/icons-react";
import InventoryReport from "./Components/InventoryReport"; // Example component
import PurchaseReport from "./Components/PurchaseReport";
import SalesInvoiceReport from "./Components/SalesInvoiceReport";
import IssueReport from "./Components/IssueReport";
import ReturnReport from "./Components/ReturnReport";

const reportData = [
  { title: "Inventory Report", icon: <IconArchive size={25} color="#FF9800" />, component: <InventoryReport /> },
  { title: "Purchase Report", icon: <IconTruck size={25} color="#b45af4" />, component: <PurchaseReport /> },
  { title: "Sales Invoice Report", icon: <IconFileInvoice size={25} color="#9C27B0" />, component: <SalesInvoiceReport /> },
  { title: "Issue Report", icon: <IconFileReport  size={25} color="#24b8f1" />, component: <IssueReport /> },
  { title: "Return Report", icon: <IconArrowBack  size={25} color="#9C27B0" />, component: <ReturnReport /> },
];

const ReportCards = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  return (
    <Box sx={{mt:-6, ml: -5, p: 3 }}>
      {/* Report Cards Section */}
      <Box
        sx={{
          p: 3.2,
          overflowX: "auto",
          display: "flex",
          gap: 3,
          mb: 3,  // Add margin below the cards section
          "&::-webkit-scrollbar": {
            height: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        {reportData.map((report, index) => (
          <Box
            key={index}
            onClick={() => handleCardClick(index)} // Update selected card on click
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start", // Align items to the left
              minWidth: 240,
              height: "70px", // Adjusted height for better fit
              backgroundColor: "#F9F9F9", // Light background for better contrast
              border: "1px solid #E0E0E0", // Border for separation
              borderRadius: "7px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Increased shadow for contrast
              cursor: "pointer", // Cursor indicates clickable card
              transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease", // Smooth transition
              ...(selectedCard === index && {
                borderColor: "transparent", // No visible border change on selection
                backgroundColor: "#e8f0fe", // Subtle light blue on active card
              }),
              "&:hover": {
                transform: "scale(1.05)", // Slight scale-up effect on hover
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Increase shadow on hover
                backgroundColor: "#f0f1f3", // Softer background color on hover
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 3.6 }}>
              {report.icon}
            </Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                color: selectedCard === index ? "blue" : "black", // Change text color when selected
                transition: "color 0.3s ease", // Smooth transition for text color change
                textAlign: "left", // Left-align the text
                padding: "4px 0", // Add some padding to space text and icon
              }}
            >
              {report.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Render the selected report component below the cards */}
      {selectedCard !== null && (
        <Box>
          {reportData[selectedCard]?.component}
        </Box>
      )}
    </Box>
  );
};

export default ReportCards;
