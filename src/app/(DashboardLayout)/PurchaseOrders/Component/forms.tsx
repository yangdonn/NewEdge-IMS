
"use client";
import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    InputLabel,
    FormControl,
    CircularProgress,
    Alert,
    CardContent,
    Typography,
} from "@mui/material";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";
import DashboardCard from "../../components/shared/DashboardCard";

interface FormData {
    invoiceTo: string;
    voucherNo: string;
    date: string;
    referenceNo: string;
    consignee: string;
    paymentMode: string;
    supplier: string;
    dispatchedThrough: string;
    termsofDelivery: string;
    destination: string;
    description: string;
    receivedBy: string;
    Date: string;
    quantity: string;
    rate: string;
}

const PurchaseOrderForm = () => {
    const [formData, setFormData] = useState<FormData>({
        invoiceTo: "",
        voucherNo: "",
        date: "",
        referenceNo: "",
        consignee: "",
        paymentMode: "",
        supplier: "",
        dispatchedThrough: "",
        termsofDelivery: "",
        destination: "",
        description: "",
        receivedBy: "",
        Date: "",
        quantity: "",
        rate: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        if (name) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        for (const key in formData) {
            if (!formData[key as keyof FormData]) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            setError("All fields are required!");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.post("http://localhost:3000/purchaseOrders", formData);
            setSuccess("Purchase Orders saved successfully!");
        } catch (err) {
            console.error("Error saving Purchase Orders:", err);
            setError("There was an error saving the Purchase Orders.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardCard>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Purchase Orders
                </Typography>

                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}

                {/* Invoice Details */}
                <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
                    Purchase Details
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Invoice to"
                            name="invoiceTo"
                            multiline rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Date"
                            name="date"
                            type="date"
                            InputLabelProps={{ shrink: true, sx: { color: 'black' } }}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Voucher No"
                            name="voucherNo"
                            multiline rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Reference No"
                            name="referenceNo"
                            variant="outlined"
                            InputLabelProps={{ sx: { color: 'black' } }}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Consignee (Ship to)"
                            name="consignee"
                            multiline rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel id="paymentMode-label" sx={{ color: 'black' }} >Payment Mode</InputLabel>
                            <Select
                                labelId="paymentMode-label"
                                name="paymentMode"
                                value={formData.paymentMode}
                                onChange={handleSelectChange}
                                label="Payment Mode"
                            >
                                <MenuItem value="Cash">Cash</MenuItem>
                                <MenuItem value="Credit">Credit</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Supplier (Bill from)"
                            name="supplier"
                            multiline rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Dispatched Through"
                            name="dispatchedThrough"
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Terms of Delivery"
                            name="termsofDelivery"
                            multiline rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                            label="Destination"
                            name="destination"
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                </Grid>

                <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
                    Item Details
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Description of Goods"
                            name="description"
                            multiline rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Received by"
                            name="receivedBy"
                            multiline
                            rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth label="Date"
                            name="Date"
                            type="date"
                            InputLabelProps={{ shrink: true, sx: { color: 'black' } }}
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth label="Quantity"
                            name="quantity"
                            type="number"
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth label="Rate"
                            name="rate"
                            type="number"
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: 'black' } }} />
                    </Grid>
                </Grid>

                {/* Buttons */}
                <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        sx={{
                            mr: 2,
                            color: "white",
                            backgroundColor: "gray",
                            "&:hover": { backgroundColor: "darkgray" }, // Add hover effect
                        }}
                    >
                        Discard
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Save"}
                    </Button>
                </Box>

            </CardContent>
        </DashboardCard>
    );
};

export default PurchaseOrderForm;