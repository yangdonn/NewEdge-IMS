"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogContentText,
  Grid,
  Card,
  ListItem,
  List,
} from "@mui/material";
import InventoryTable from "./itemtable";
import { Add, Delete, Close } from "@mui/icons-material";
import { IconAlertTriangle, IconX } from "@tabler/icons-react";

export default function Buttons() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [availability, setAvailability] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [subcategory, setSubcategory] = React.useState("");
  const [catego, setcatego] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [avail, setAvail] = React.useState("");
  const [openAddCategoryDialog, setOpenAddCategoryDialog] =
    React.useState(false);
  const [openViewCategoryDialog, setOpenViewCategoryDialog] =
    React.useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = React.useState(false);
  const [filterByCategory, setFilterByCategory] = React.useState("");
  const [categories, setCategories] = React.useState([
    { id: 1, name: "Router", items: ["Item 1", "Item 2"] },
    { id: 2, name: "Switch", items: ["Item 3", "Item 4"] },
  ]);
  const [categoryToDelete, setCategoryToDelete] = React.useState<number | null>(
    null
  ); // Track category to delete
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddCategory = (newCategory: string) => {
    const newId = categories.length
      ? Math.max(...categories.map((cat) => cat.id)) + 1
      : 1;
    setCategories([...categories, { id: newId, name: newCategory, items: [] }]);
    setOpenAddCategoryDialog(false);
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete !== null) {
      setCategories(
        categories.filter((category) => category.id !== categoryToDelete)
      );
      setOpenDeleteCategory(false);
    }
  };

  //card view dialog
  const [openViewCategory1, setOpenViewCategory1] = React.useState(false);
  const [items, setItems] = React.useState([
    "Dell XPS 13",
    "MacBook Pro 16",
    "Lenovo ThinkPad X1",
    "Asus ZenBook 14",
    "Acer Swift 3",
    "Razer Blade 15",
  ]);
  const [newItem, setNewItem] = React.useState("");

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleChange =
    (setter: {
      (value: React.SetStateAction<string>): void;
      (value: React.SetStateAction<string>): void;
      (value: React.SetStateAction<string>): void;
      (value: React.SetStateAction<string>): void;
      (arg0: any): any;
    }) =>
    (event: { target: { value: any } }) =>
      setter(event.target.value);

  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Box sx={{ display: "flex", gap: 3, mb: 2, flexWrap: "wrap", mt: 2 }}>
        {/* Search Bar */}
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 435,
            height: 36,
          }}
        >
          <IconButton sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Paper>

        {/* Add Item Button */}
        <Button
          variant="contained"
          size="small"
          sx={{
            padding: "4px 8px",
            height: "36px",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
          onClick={() => setOpen(true)}
        >
          Add Item
        </Button>
        {/* Add Item Dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"New Item"}</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  ItemId:
                </Typography>
                <TextField
                  id="outlined-itemid-input"
                  label="Enter ItemId"
                  type="text"
                  autoComplete="current-password"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Item Name:
                </Typography>
                <TextField
                  id="outlined-name-input"
                  label="Item Name"
                  autoComplete="Item Name"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Sub Category
                </Typography>
                <FormControl sx={{ m: 1, width: "25ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Sub Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subcategory}
                    label="Choose Sub Category"
                    onChange={handleChange(setSubcategory)}
                  >
                    <MenuItem value={10}>Laptop</MenuItem>
                    <MenuItem value={20}>Switch</MenuItem>
                    <MenuItem value={30}>Router</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Category
                </Typography>
                <FormControl sx={{ m: 1, width: "25ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={catego}
                    label="Choose Category"
                    onChange={handleChange(setcatego)}
                  >
                    <MenuItem value={10}>Laptop</MenuItem>
                    <MenuItem value={20}>Switch</MenuItem>
                    <MenuItem value={30}>Router</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Module No:
                </Typography>
                <TextField
                  id="outlined-price-input"
                  label="Module_No"
                  type="Module_No"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Serial No:
                </Typography>
                <TextField
                  id="outlined-price-input"
                  label="Serial_No"
                  type="Serial_No"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Price:
                </Typography>
                <TextField
                  id="outlined-price-input"
                  label="Price"
                  type="Price"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Description:
                </Typography>
                <TextField
                  id="outlined-desription-input"
                  label="Enter Description"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  UOM:
                </Typography>
                <TextField id="outlined-price-input" label="UOM" type="UOM" />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Quantity:
                </Typography>
                <TextField
                  id="outlined-quantity-input"
                  label="Enter Quantity"
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Supplier Name:
                </Typography>
                <TextField
                  id="outlined-name-input"
                  label="Enter Supplier's Name"
                  type="text"
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Unit:
                </Typography>
                <TextField id="outlined-unit-input" label="Enter Unit" />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Typography sx={{ marginRight: 2, width: "100px" }}>
                  Availabity:
                </Typography>
                <FormControl sx={{ m: 1, width: "25ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Choose Availabity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={avail}
                    label="Choose Category"
                    onChange={handleChange(setAvail)}
                  >
                    <MenuItem value={10}>In Stock</MenuItem>
                    <MenuItem value={20}>Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <DialogActions sx={{ my: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setOpen(false)}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#D9D9D9",
                  color: "black",
                  "&:hover": { backgroundColor: "#D9D9D9" },
                }}
                onClick={() => setOpen(false)}
              >
                Discard
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        {/* Category Filter */}
        <FormControl sx={{ width: "100%", maxWidth: 145 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              if (event.target.value === "Add") setOpenAddCategoryDialog(true);
              if (event.target.value === "View") setOpenViewCategoryDialog(true);
            }}
          >
            <MenuItem value="View">View Categories</MenuItem>
            <MenuItem value="Add">Add Category</MenuItem>
          </Select>
        </FormControl>

        {/* View Category Dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={openViewCategoryDialog}
          onClose={() => setOpenViewCategoryDialog(false)}
          maxWidth="lg"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              width: "90%",
              height: "80vh",
              padding: 3,
            },
          }}
        >
          <Grid
            container
            spacing={5}
            justifyContent="center"
            sx={{ padding: 4 }}
          >
            {categories.map((category) => (
              <Grid item xs={12} sm={4} md={4} key={category.id}>
                <Card variant="outlined">
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: 2, paddingLeft: 2, paddingTop: 2 }}
                  >
                    {category.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ marginBottom: 3, paddingLeft: 2 }}
                  >
                    Total Items: {category.items.length}
                  </Typography>
                  <Card
                    sx={{
                      backgroundColor: "#F8F8F8",
                      padding: 2,
                      display: "flex",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={() => setOpenViewCategory1(true)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      onClick={() => setOpenAddCategoryDialog(true)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => {
                        setCategoryToDelete(category.id);
                        setOpenDeleteCategory(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Card>
                </Card>
              </Grid>
            ))}
          </Grid>
          <DialogActions>
          <IconX stroke={2} onClick={() => setOpenViewCategoryDialog(false)} style={{ position: "absolute", top: 8, right: 8, cursor: "pointer", }}/>
          </DialogActions>
        </Dialog>
        {/*View Dialog of individual card */}
        <Dialog
          open={openViewCategory1}
          onClose={() => setOpenViewCategory1(false)}
          aria-labelledby="view-dialog-title"
        >
          <DialogTitle id="view-dialog-title" sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",

            }}>Laptop</DialogTitle>
          <DialogContent>
              <List
                style={{ height: "300px", width: "300px", overflowY: "auto" }}
              >
                {items.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>{item}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Item"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <IconButton
                  color="primary"
                  onClick={handleAddItem}
                  sx={{ ml: 1 }}
                >
                  <Add />
                </IconButton>
              </Box>
          </DialogContent>
          <DialogActions>
          <IconX stroke={2} onClick={() => setOpenViewCategory1(false)} style={{ position: "absolute", top: 8, right: 8, cursor: "pointer", }}/>
          </DialogActions>
        </Dialog>
        {/* Delete Category Dialog */}
        <Dialog
          open={openDeleteCategory}
          onClose={() => setOpenDeleteCategory(false)}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle
            id="delete-dialog-title"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: 1, 
            }}
          >
            <IconAlertTriangle stroke={2}/>
            <span>Confirm Deletion</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this category?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Button
              onClick={() => setOpenDeleteCategory(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCategory}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* Add Category Dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={openAddCategoryDialog}
          onClose={() => setOpenAddCategoryDialog(false)}
        >
          <DialogTitle id="add-category-dialog-title" sx={{ marginLeft: 1 }}>
            New Category
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "40ch" },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              noValidate
              autoComplete="off"
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography
                  sx={{ marginBottom: 1, width: "100%", marginLeft: 1 }}
                >
                  Category Name:
                </Typography>
                <TextField
                  fullWidth
                  label="Add Category"
                  id="fullWidth"
                  onChange={(e) => setCategory(e.target.value)} // Update category input
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mr: 3, mb: 3 }}>
            <Button
              variant="contained"
              aria-required
              onClick={() => handleAddCategory(category)}
            >
              Add
            </Button>
            <Button
              sx={{ backgroundColor: "#D9D9D9", color: "black" }}
              onClick={() => setOpenAddCategoryDialog(false)}
            >
              Discard
            </Button>
          </DialogActions>
        </Dialog>

        {/* Availability Filter */}
        <FormControl sx={{ width: "100%", maxWidth: 175 }} size="small">
          <InputLabel>Availability</InputLabel>
          <Select
            label="Availability"
            value={availability}
            onChange={handleChange(setAvailability)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="In Stock">In Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>

        {/* Category Filter*/}
        <FormControl sx={{ width: "100%", maxWidth: 165 }} size="small">
          <InputLabel>Filter by Category</InputLabel>
          <Select
            label="Filter by Category"
            value={filterByCategory}
            onChange={(e) => setFilterByCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Laptop">Laptop</MenuItem>
            <MenuItem value="Switch">Switch</MenuItem>
            <MenuItem value="Router">Router</MenuItem>
          </Select>
        </FormControl>
        <InventoryTable
          availability={availability}
          filterByCategory={filterByCategory}
          searchQuery={searchQuery}
        />
      </Box>
    </Box>
  );
}
