'use client';

import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead, // Added TableHead import
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';

const InvoiceTable = ({
  voucherNo = 'N/A',
  date = 'N/A',
  paymentTerms = 'N/A',
  referenceNo = 'N/A',
  dispatchedThrough = 'N/A',
  destination = 'N/A',
  receivedBy = 'N/A',
  description = 'N/A',
  dueOn = 'N/A',
  quantity = 0,
  rate = 0,
  amount = 0,
}) => {
  const invoiceRef = useRef(null);

  // Event handler for generating the PDF
  const handleDownload = async () => {
    const element = invoiceRef.current;
    if (element) {
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('invoice.pdf');
    }
  };

  const handlePrint = () => {
    window.print();
  }

  return (
    <div ref={invoiceRef} style={{ padding: '20px', backgroundColor: '#fff' }}>
      {/* Invoice Header */}
      <TableContainer ref={invoiceRef} component={Paper} sx={{ border: '1px solid black', p: 3 }}>
        {/* Header Row */}
        <Table sx={{ border: '1px solid black' }}>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                <Typography variant="h6">Invoice To</Typography>
                <Typography><b>New Edge Technologies Pvt. Ltd</b></Typography>
                <Typography>2nd Floor, City Mall, Chubachu</Typography>
                <Typography>P.O. Box-1616</Typography>
                <Typography>TPN NO: NAC0078</Typography>
                <Typography>Contact: +975-02-336782/337189/337190,+975-17417539/17611511</Typography>
              </TableCell>
              <TableCell colSpan={2} sx={{ border: '1px solid black' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Voucher No</TableCell>
                      <TableCell sx={{ border: '1px solid black' }}>{voucherNo}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Dated</TableCell>
                      <TableCell sx={{ border: '1px solid black' }}>{date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Mode/Terms of Payment</TableCell>
                      <TableCell sx={{ border: '1px solid black' }}>{paymentTerms}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Reference No & Date</TableCell>
                      <TableCell sx={{ border: '1px solid black' }}>{referenceNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Dispatched through</TableCell>
                      <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>{dispatchedThrough}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Destination</TableCell>
                      <TableCell sx={{ border: '1px solid black' }}>{destination}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Received By</TableCell>
                      <TableCell colSpan={3} sx={{ border: '1px solid black' }}>{receivedBy}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>

            {/* Terms of Delivery */}
            <TableRow>
              <TableCell colSpan={4} sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                <Typography variant="h6">Terms of Delivery</Typography>
                <Typography><b>E-Delivery of Licenses</b></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Supplier Information Section */}
        <Table sx={{ mt: 2, border: '1px solid black' }}>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                <Typography variant="h6">Supplier (Bill From)</Typography>
                <Typography><b>Redington Distribution PTE Limited</b></Typography>
                <Typography><b>60 Robinson Road,</b></Typography>
                <Typography><b>Singapore 068892</b></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Description Table */}
        <Table sx={{ mt: 2, border: '1px solid black' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Sl No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Description of Goods</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Due On</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Rate</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Per</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: '1px solid black' }}>1</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>{description}</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>{dueOn}</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>{quantity} Nos.</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>{rate}</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Nos</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>{amount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Amount Chargeable */}
        <Table sx={{ mt: 2, border: '1px solid black' }}>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 'bold', border: '1px solid black' }}>
                <Typography variant="h6">Amount Chargeable (in words)</Typography>
                <Typography>Ngultrum {amount.toLocaleString()} Only</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Buttons Section */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 2,
        }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1366D9', color: 'white', marginRight: 2 }}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1366D9', color: 'white', marginRight: 2 }}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Box>
      </TableContainer>
    </div>
  );
};

export default InvoiceTable;
