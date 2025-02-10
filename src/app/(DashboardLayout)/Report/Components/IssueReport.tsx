'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import Link from 'next/link';


const IssueReport = () => {

        const invoices = [
    { id: 'INV-001', date: '2024-02-03', company: 'ABC Ltd.', amount: '$500' },
    { id: 'INV-002', date: '2024-02-02', company: 'XYZ Pvt. Ltd.', amount: '$1200' },
    { id: 'INV-003', date: '2024-02-01', company: 'Tech Corp.', amount: '$850' },
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
                    <Button variant="text" color="primary" component={Link} href={`/purchaseDetail`}>
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

export default IssueReport;
