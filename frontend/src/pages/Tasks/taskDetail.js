import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import useRequestResource from "../../hooks/useRequestResource";
import * as yup from "yup";
import ColorBox from "../../components/colorBox";
import { Link, useNavigate, useParams } from "react-router-dom";
import { priorityOptionsData } from "../../data/priorityOptionsData";

const validationSchema = yup.object({
  title: yup.string().required("Title is required").max(100, "max is 100"),
});

export default function TaskDetail() {
  const [initialValue, setInitialValue] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    completed: false,
  });
  const { resourceList, getResourceList } = useRequestResource({
    endpoint: "/tasks/category/",
  });

  const { addResource, getResource, resource, updateResource } =
    useRequestResource({
      endpoint: "/tasks/task/",
    });
  const navigate = useNavigate();
  const { taskId } = useParams();

  const handleSubmitForm = (values) => {
    if (!taskId) {
      addResource(values, () => {
        navigate("/tasks");
      });
    } else {
      updateResource(taskId, values, () => {
        navigate("/tasks");
      });
    }
  };

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);

  useEffect(() => {
    if (taskId) {
      getResource(taskId);
    }
  }, [taskId, getResource]);

  useEffect(() => {
    if (resource) {
      setInitialValue({
        title: resource.title,
        description: resource.description,
        category: resource.category,
        priority: resource.priority,
        completed: resource.completed,
      });
    }
  }, [resource]);

  return (
    <Paper
      sx={{
        borderRadius: "2px",
        boxShadows: (theme) => theme.shadows[5],
        padding: (theme) => theme.spacing(2, 4, 3),
      }}
    >
      <Typography variant="h6" mb={4}>
        {taskId ? "Update Task" : "Add New Task"}
      </Typography>
      <Formik
        initialValues={initialValue}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  id="title"
                  {...formik.getFieldProps("title")}
                  helperText={formik.touched.title && formik.errors.title}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  id="description"
                  {...formik.getFieldProps("description")}
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    {...formik.getFieldProps("category")}
                    label="category"
                  >
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
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Completed"
                    {...formik.getFieldProps("completed")}
                    checked={formik.values.completed}
                  />
                </FormGroup>
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
                    component={Link}
                    to="/tasks"
                    size="medium"
                    variant="outlined"
                    sx={{ mr: 2 }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Paper>
  );
}
