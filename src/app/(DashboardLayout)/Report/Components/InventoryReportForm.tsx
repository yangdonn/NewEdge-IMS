import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InventoryReportForm = ({
  filters,
}: {
  filters: { item: string; startDate: string; endDate: string; filter: string };
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const companyInfoRef = useRef<HTMLDivElement>(null); // Ref for company info
  const reportContentRef = useRef<HTMLDivElement>(null); // Ref for report content

  // Function to format date as DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // British style (DD/MM/YYYY)
  };

  const handleDownload = async () => {
    setOpenDialog(false);
    if (!companyInfoRef.current || !reportContentRef.current) return;

    // Capture company info
    const companyInfoCanvas = await html2canvas(companyInfoRef.current, {
      scale: 2,
    });
    const companyInfoImgData = companyInfoCanvas.toDataURL("image/png");

    // Capture report content
    const reportContentCanvas = await html2canvas(reportContentRef.current, {
      scale: 2,
    });
    const reportContentImgData = reportContentCanvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Add company info to PDF
    pdf.addImage(
      companyInfoImgData,
      "PNG",
      0,
      0,
      210,
      (companyInfoCanvas.height * 210) / companyInfoCanvas.width
    );

    // Add report content to PDF, positioning it after company info
    const reportContentYPosition =
      (companyInfoCanvas.height * 210) / companyInfoCanvas.width; // Adjust as needed based on company info height
    pdf.addImage(
      reportContentImgData,
      "PNG",
      0,
      reportContentYPosition,
      210,
      (reportContentCanvas.height * 210) / reportContentCanvas.width
    );

    pdf.save("inventory_report.pdf");
  };

  const handlePrint = () => {
    if (!reportRef.current) return;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Inventory Report</title></head><body>"
      );
      printWindow.document.write(reportRef.current.outerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <div ref={reportRef}>
        {/* Company Information */}
        <div ref={companyInfoRef}>
          <Typography variant="h6" fontWeight="bold">
            New Edge Technologies Pvt. Ltd.
          </Typography>
          <Typography variant="body2">
            2nd Floor, City Mall, Chubachu.
          </Typography>
          <Typography variant="body2">P.O. Box-1616</Typography>
          <Typography variant="body2">TPN No: NAC0078</Typography>
          <Typography variant="body2">
            Contact: +975-02-336792/337189/337190, +975-174117539/17611511
          </Typography>
        </div>

        {/* Filter Information */}
        <div ref={reportContentRef}>
          <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
            {filters.item || "Item Not Selected"}
          </Typography>
          <Typography variant="body2">
            {formatDate(filters.startDate)} to{" "}
            {filters.endDate
              ? formatDate(filters.endDate)
              : "Date Not Selected"}
          </Typography>
          <Typography variant="body2">
            {filters.filter
              ? `${
                  filters.filter.charAt(0).toUpperCase() +
                  filters.filter.slice(1)
                } Summary`
              : "Summary Not Selected"}
          </Typography>

          {/* Paper Layout for Report Content */}
          <Paper sx={{ marginTop: 3, padding: 2 }}>
            {/* Table Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Particulars
              </Typography>
              <Typography variant="body2" fontWeight="bold" align="center">
                Inwards Quantity
              </Typography>
              <Typography variant="body2" fontWeight="bold" align="center">
                Inwards Value
              </Typography>
              <Typography variant="body2" fontWeight="bold" align="center">
                Outwards Quantity
              </Typography>
              <Typography variant="body2" fontWeight="bold" align="center">
                Outwards Value
              </Typography>
              <Typography variant="body2" fontWeight="bold" align="center">
                Closing Balance Quantity
              </Typography>
              <Typography variant="body2" fontWeight="bold" align="center">
                Closing Balance Value
              </Typography>
            </Box>

            {/* Data Rows */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
              }}
            >
              <Typography variant="body2">Opening Balance</Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                3 Pcs
              </Typography>
              <Typography variant="body2" align="center">
                82,137.00
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                marginTop: 1,
              }}
            >
              <Typography variant="body2">January</Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                3 Pcs
              </Typography>
              <Typography variant="body2" align="center">
                82,137.00
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                marginTop: 1,
              }}
            >
              <Typography variant="body2">Grand Total</Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                -
              </Typography>
              <Typography variant="body2" align="center">
                3 Pcs
              </Typography>
              <Typography variant="body2" align="center">
                82,137.00
              </Typography>
            </Box>
          </Paper>
        </div>
      </div>

      {/* Download and Print Buttons */}
      <Box sx={{ marginTop: 3, display: "flex", gap: 2, ml: 112 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{ fontSize: 12 }}
        >
          Download
        </Button>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      {/* Download Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Download</DialogTitle>
        <DialogContent>
          <Typography>Download report as PDF?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenDialog(false)}
          >
            No
          </Button>
          <Button variant="outlined" onClick={handleDownload}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryReportForm;
