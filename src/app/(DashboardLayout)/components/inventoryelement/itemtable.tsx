"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Card, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface Column {
  id: keyof Data;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "item_id", label: "Item ID", minWidth: 170 },
  { id: "item_name", label: "Item Name", minWidth: 170 },
  { id: "sub_category", label: "Sub Category", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 170 },
  { id: "module_no", label: "Module No.", minWidth: 170 },
  { id: "serial_no", label: "S/N", minWidth: 170 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "center",
    format: (value: number) => `$${value.toFixed(2)}`,
  },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "uom", label: "UOM", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170, align: "center" },
  { id: "supplier", label: "Supplier's Name", minWidth: 170 },
  { id: "purchase_date", label: "Purchase Date", minWidth: 170 },
  { id: "availability", label: "Availability", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

interface Data {
  item_id: string;
  item_name: string;
  sub_category: string;
  category: string;
  module_no: string;
  serial_no: string;
  price: number;
  description: string;
  uom: string;
  quantity: number;
  supplier: string;
  purchase_date: string;
  availability: string;
  action: string;
}

function createData(
  item_id: string,
  item_name: string,
  sub_category: string,
  category: string,
  module_no: string,
  serial_no: string,
  price: number,
  description: string,
  uom: string,
  quantity: number,
  supplier: string,
  purchase_date: string,
  availability: string,
  action: string
): Data {
  return {
    item_id,
    item_name,
    sub_category,
    category,
    module_no,
    serial_no,
    price,
    description,
    uom,
    quantity,
    supplier,
    purchase_date,
    availability,
    action,
  };
}

const initialRows = [
  createData("001", "Dell XPS 13", "SubCat 1", "Laptop", "MN001", "SN001", 99.99, "Item 1 Description", "Piece", 100, "Supplier 1", "2022-01-01", "In Stock", "Edit"),
  createData("002", "MacBook Pro 16", "SubCat 2", "Router", "MN002", "SN002", 199.99, "Item 2 Description", "Box", 50, "Supplier 2", "2023-02-01", "Out of Stock", "Edit"),
  createData("003", "Lenovo ThinkPad X1", "SubCat 3", "Router", "MN003", "SN003", 299.99, "Item 3 Description", "Bag", 150, "Supplier 3", "2024-03-01", "In Stock", "Edit"),
  createData("004", "Asus ZenBook 14", "SubCat 1", "Router", "MN004", "SN004", 89.99, "Item 4 Description", "Piece", 200, "Supplier 4", "2023-04-01", "In Stock", "Edit"),
  createData("005", "Acer Swift 3", "SubCat 2", "Laptop", "MN005", "SN005", 159.99, "Item 5 Description", "Box", 75, "Supplier 5", "2023-05-01", "Out of Stock", "Edit"),
  createData("006", "Razer Blade 15", "SubCat 3", "Router", "MN006", "SN006", 199.99, "Item 6 Description", "Bag", 300, "Supplier 6", "2024-06-01", "In Stock", "Edit"),
  createData("007", "Razer Blade 15", "SubCat 1", "Laptop", "MN007", "SN007", 129.99, "Item 7 Description", "Piece", 80, "Supplier 7", "2023-07-01", "In Stock", "Edit"),
  createData("008", "Razer Blade 15", "SubCat 2", "Laptop", "MN008", "SN008", 109.99, "Item 8 Description", "Box", 65, "Supplier 8", "2024-08-01", "Out of Stock", "Edit"),
  createData("009", "Razer Blade 15", "SubCat 3", "Switch", "MN009", "SN009", 249.99, "Item 9 Description", "Bag", 120, "Supplier 9", "2023-09-01", "In Stock", "Edit"),
  createData("010", "Item 10", "SubCat 1", "Switch", "MN010", "SN010", 89.99, "Item 10 Description", "Piece", 150, "Supplier 10", "2024-10-01", "Out of Stock", "Edit"),
  createData("011", "Item 10", "SubCat 2", "Laptop", "MN011", "SN011", 179.99, "Item 11 Description", "Box", 60, "Supplier 11", "2023-11-01", "In Stock", "Edit"),
  createData("012", "Item 10", "SubCat 3", "Switch", "MN012", "SN012", 139.99, "Item 12 Description", "Bag", 110, "Supplier 12", "2024-12-01", "Out of Stock", "Edit"),
  createData("013", "Item 10", "SubCat 1", "Switch", "MN013", "SN013", 99.99, "Item 13 Description", "Piece", 190, "Supplier 13", "2023-01-01", "In Stock", "Edit"),
  createData("014", "Item 10", "SubCat 2", "Switch", "MN014", "SN014", 219.99, "Item 14 Description", "Box", 85, "Supplier 14", "2024-02-01", "Out of Stock", "Edit"),
  createData("015", "Item 15", "SubCat 3", "Access Point", "MN015", "SN015", 149.99, "Item 15 Description", "Bag", 140, "Supplier 15", "2023-03-01", "In Stock", "Edit"),
  createData("016", "Item 16", "SubCat 1", "Access Point", "MN016", "SN016", 199.99, "Item 16 Description", "Piece", 50, "Supplier 16", "2024-04-01", "In Stock", "Edit"),
  createData("017", "Item 17", "SubCat 2", "Access Point", "MN017", "SN017", 259.99, "Item 17 Description", "Box", 95, "Supplier 17", "2023-05-01", "Out of Stock", "Edit"),
];

export default function InventoryTable({
  availability,
  filterByCategory,
  searchQuery,
}: {
  availability: string;
  filterByCategory: string;
  searchQuery: string;
}) {
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingRow, setEditingRow] = React.useState<Data | null>(null);
  const [editedData, setEditedData] = React.useState<Data | null>(null);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (row: Data) => {
    setEditingRow(row);
    setEditedData(row);
    setOpenDialog(true); // Open the dialog on Edit click
  };

  const handleSave = () => {
    if (editedData) {
      // Update the rows state with the edited data
      const updatedRows = rows.map((row) =>
        row.item_id === editedData.item_id ? editedData : row
      );
      setRows(updatedRows); // Update the rows state with the new data
      setOpenDialog(false); // Close the dialog after saving
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [event.target.name]: event.target.value,
      });
    }
  };

  // Apply filters
  const filteredRows = rows.filter((row) => {
    const availabilityMatch = availability
      ? row.availability === availability
      : true;
    const categoryMatch = filterByCategory
      ? row.category.toLowerCase().trim() ===
        filterByCategory.toLowerCase().trim()
      : true;
    const searchMatch =
      searchQuery === "" ||
      row.item_id.includes(searchQuery) ||
      row.module_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.sub_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.item_name.toLowerCase().includes(searchQuery.toLowerCase());

    return availabilityMatch && categoryMatch && searchMatch;
  });

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 400, overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.item_id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "availability") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <span
                            style={{
                              color: value === "In Stock" ? "green" : "red",
                            }}
                          >
                            {value}
                          </span>
                        </TableCell>
                      );
                    }
                    if (column.id === "action") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <a
                            href="#"
                            style={{
                              textDecoration: "none",
                              color: "#1976d2",
                            }}
                            onClick={() => handleEditClick(row)}
                          >
                            Edit
                          </a>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editable Form */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          {columns
            .filter((col) => col.id !== "action")
            .map((column) => {
              const fieldName = column.id;
              return (
                <TextField
                  key={fieldName}
                  label={column.label}
                  name={fieldName}
                  value={editedData ? editedData[fieldName as keyof Data] : ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              );
            })}
        </DialogContent>
        <DialogActions sx={{ mr: 4, mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            sx={{ backgroundColor: "#D9D9D9", color: "black" }}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <TablePagination
        rowsPerPageOptions={[7]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
