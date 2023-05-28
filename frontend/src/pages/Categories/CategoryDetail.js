import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";

export default function CategoryDetail() {
  const [initialValues, setInitialValues] = useState({ name: "", color: "" });
  const { addResource } = useRequestResource({ endpoint: "tasks/category/" });

  const handleSubmit = (values) => {
    addResource(values, () => {
      navigate("/categories");
    });
  };

  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        borderRadius: "2px",
        boxShadows: (theme) => theme.shadows[5],
        padding: (theme) => theme.spacing(2, 4, 3),
      }}
    >
      <Typography variant="h6" mb={4}>
        Create Category
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="color"
                    label="Color"
                    {...formik.getFieldProps("color")}
                    error={formik.touched.color && Boolean(formik.errors.color)}
                    helperText={formik.touched.color && formik.errors.color}
                  />
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
                      to="/categories"
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
          );
        }}
      </Formik>
    </Paper>
  );
}
