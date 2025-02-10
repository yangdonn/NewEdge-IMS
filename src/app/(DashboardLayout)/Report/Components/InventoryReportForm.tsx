"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography, Button, Paper, Dialog, DialogTitle,
  DialogContent, DialogActions
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InventoryReport = () => {
  const searchParams = useSearchParams();
  const reportRef = useRef<HTMLDivElement>(null);
  const companyInfoRef = useRef<HTMLDivElement>(null); // Ref for company info
  const reportContentRef = useRef<HTMLDivElement>(null); // Ref for report content
  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    setItem(searchParams.get("item"));
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const formatDate = (dateString: string | null) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      const day = date.getDate();
      const monthAbbr = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear().toString().slice(-2);
      return `${day}-${monthAbbr}-${year}`;
    };

    setDateRange(startDate && endDate ? `${formatDate(startDate)} to ${formatDate(endDate)}` : null);
    setFilter(searchParams.get("filter"));
  }, [searchParams]);

  const handleDownload = async () => {
    setOpenDialog(false);
    if (!companyInfoRef.current || !reportContentRef.current) return;

    // Capture company info
    const companyInfoCanvas = await html2canvas(companyInfoRef.current, { scale: 2 });
    const companyInfoImgData = companyInfoCanvas.toDataURL("image/png");

    // Capture report content
    const reportContentCanvas = await html2canvas(reportContentRef.current, { scale: 2 });
    const reportContentImgData = reportContentCanvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Add company info to PDF
    pdf.addImage(companyInfoImgData, "PNG", 0, 0, 210, (companyInfoCanvas.height * 210) / companyInfoCanvas.width);

    // Add report content to PDF, positioning it after company info
    const reportContentYPosition = (companyInfoCanvas.height * 210) / companyInfoCanvas.width; // Adjust as needed based on company info height
    pdf.addImage(reportContentImgData, "PNG", 0, reportContentYPosition, 210, (reportContentCanvas.height * 210) / reportContentCanvas.width);

    pdf.save("inventory_report.pdf");
  };


  const handlePrint = () => {
    if (!reportRef.current) return;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Inventory Report</title></head><body>");
      printWindow.document.write(reportRef.current.outerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <div ref={reportRef}>
        <div ref={companyInfoRef}>
          <Typography variant="h6" fontWeight="bold">
            New Edge Technologies Pvt. Ltd.
          </Typography>
          <Typography variant="body2">2nd Floor, City Mall, Chubachu.</Typography>
          <Typography variant="body2">P.O. Box-1616</Typography>
          <Typography variant="body2">TPN No: NAC0078</Typography>
          <Typography variant="body2">
            Contact: +975-02-336792/337189/337190, +975-174117539/17611511
          </Typography>
        </div>

        <div ref={reportContentRef}>
          <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
            {item || "Item Not Selected"}
          </Typography>
          <Typography variant="body2">
            {filter ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} Summary` : "Summary Not Selected"}
          </Typography>
          <Typography variant="body2">
            {dateRange || "Date Not Selected"}
          </Typography>

          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Particulars</TableCell>
                  <TableCell align="center">Inwards Quantity</TableCell>
                  <TableCell align="center">Inwards Value</TableCell>
                  <TableCell align="center">Outwards Quantity</TableCell>
                  <TableCell align="center">Outwards Value</TableCell>
                  <TableCell align="center">Closing Balance Quantity</TableCell>
                  <TableCell align="center">Closing Balance Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Opening Balance</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">3 Pcs</TableCell>
                  <TableCell align="center">82,137.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>January</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">3 Pcs</TableCell>
                  <TableCell align="center">82,137.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Grand Total</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">3 Pcs</TableCell>
                  <TableCell align="center">82,137.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <Box sx={{ marginTop: 3, display: "flex", gap: 2, ml: 118 }}>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Download
        </Button>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Download</DialogTitle>
        <DialogContent>
          <Typography>Download report as PDF?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => setOpenDialog(false)}>No</Button>
          <Button variant="outlined" onClick={handleDownload}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryReport;
