import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { priorityOptionsData } from "../../data/priorityOptionsData";
import ColorBox from "../../components/colorBox";
import useRequestResource from "../../hooks/useRequestResource";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function Filters({ handleFilter, query }) {
  const [initialValue, setInitialValue] = useState({
    category: "ALL",
    priority: "ALL",
    completed: "ALL",
  });
  const { resourceList, getResourceList } = useRequestResource({
    endpoint: "/tasks/category/",
  });

  useEffect(() => {
    getResourceList();

    if (query)
      setInitialValue({
        completed: query.completed ? query.completed : "ALL",
        priority: query.priority ? query.priority : "ALL",
        category: query.category ? query.category : "ALL",
      });
  }, [getResourceList, query]);

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize
      onSubmit={handleFilter}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  {...formik.getFieldProps("category")}
                  label="category"
                >
                  <MenuItem key="pending" value="ALL">
                    All
                  </MenuItem>
                  {resourceList.results.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  {...formik.getFieldProps("priority")}
                  label="Priority"
                >
                  <MenuItem key="pending" value="ALL">
                    All
                  </MenuItem>
                  {priorityOptionsData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <ColorBox color={option.color} />
                        <Box sx={{ ml: 1 }}>{option.label}</Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="completed-label">Status</InputLabel>
                <Select
                  labelId="completed-label"
                  id="completed"
                  {...formik.getFieldProps("completed")}
                  label="completed"
                >
                  <MenuItem key="pending" value="ALL">
                    All
                  </MenuItem>
                  <MenuItem key="pending" value="False">
                    Pending
                  </MenuItem>
                  <MenuItem key="completed" value="True">
                    Completed
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  margin: (theme) => theme.spacing(1),
                  marginTop: (theme) => theme.spacing(3),
                }}
              >
                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  color="primary"
                >
                  Filter
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
