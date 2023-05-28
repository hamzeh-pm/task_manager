import React, { useEffect } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";

export default function Categories() {
  const { resourceList, getResourceList } = useRequestResource({
    endpoint: "tasks/category/",
  });

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);
  return (
    <div>
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
                <TableCell align="left">{item.color}</TableCell>
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
                    <IconButton size="large">
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
