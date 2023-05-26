import React from "react";
import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const result = [
  {
    id: 1,
    name: "Work",
    color: "cccccc",
  },
  {
    id: 2,
    name: "Shopping List",
    color: "eeeeee",
  },
];

export default function Categories() {
  return (
    <div>
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
            {result.map((item) => (
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
