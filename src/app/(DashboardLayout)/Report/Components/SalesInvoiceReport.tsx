'use client';

import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import Link from 'next/link';

  const SalesInvoiceReport: React.FC = () => {
    // Mock data for invoices
    const invoices = [
      { id: 'NET/INV/2024/97', date: '9/12/24', company: 'GovTech', amount: '10,200,306' },
    ];
  
    return (
    <DashboardCard>
      <Box>
        <Typography variant="h6" gutterBottom>
          Invoices
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Bill to (Company)</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.company}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="primary"
                      component={Link}
                      href={'/invoiceDetail'}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardCard>
  );
};

export default SalesInvoiceReport;