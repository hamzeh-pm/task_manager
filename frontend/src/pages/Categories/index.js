import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";
import ColorBox from "../../components/colorBox";

export default function Categories() {
  const { resourceList, getResourceList, deleteResource } = useRequestResource({
    endpoint: "tasks/category/",
  });
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (idToDelete) {
      deleteResource(idToDelete, () => {
        setIdToDelete(null);
      });
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setOpen(true);
    setIdToDelete(id);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);
  return (
    <div>
      <Dialog open={open} onClose={handleDeleteClose}>
        <DialogTitle>Are you sure ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Confirm</Button>
          <Button onClick={handleDeleteClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 4,
          mt: 4,
        }}
      >
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/categories/create"
        >
          Create New Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 360, size: "small" }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Color</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceList.results.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">
                  <ColorBox color={`#${item.color}`} />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link
                      to={`/categories/edit/${item.id}`}
                      key="category-edit"
                    >
                      <IconButton size="large">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      size="large"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
