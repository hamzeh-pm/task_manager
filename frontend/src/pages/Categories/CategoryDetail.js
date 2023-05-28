import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNagi } from "react-router-dom";
export default function CategoryDetail() {
  const [initialValues, setInitialValues] = useState({ name: "", color: "" });
  return (
    <Paper
      sx={{
        borderRadius: "2px",
        boxShadows: (theme) => theme.shadows(5),
        padding: (theme) => theme.spacing(2, 4, 3),
      }}
    >
      <Typography variant="h6" mb={4}>
        Create Category
      </Typography>
      <Formik>
        {(formik) => {
          return (
            <from>
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
                      sx={{ mt: 2 }}
                    >
                      Back
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </from>
          );
        }}
      </Formik>
    </Paper>
  );
}
