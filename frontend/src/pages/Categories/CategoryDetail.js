import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";
import ColorPicker from "../../components/colorPicker";

const validationSchema = yup.object({
  name: yup.string().required("Name is required").max(100, "max is 100"),
  color: yup.string().required("Color is required"),
});

export default function CategoryDetail() {
  const [initialValues, setInitialValues] = useState({ name: "", color: "" });
  const { addResource, resource, getResource, updateResource } =
    useRequestResource({
      endpoint: "tasks/category/",
    });
  const { categoryId } = useParams();

  const handleSubmit = (values) => {
    const formattedValues = {
      name: values.name,
      color: values.color.substring(1),
    };
    if (categoryId) {
      updateResource(categoryId, formattedValues, () => {
        navigate("/categories");
      });
    } else {
      addResource(formattedValues, () => {
        navigate("/categories");
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      getResource(categoryId);
    }
  }, [categoryId, getResource]);

  useEffect(() => {
    if (resource) {
      setInitialValues({ name: resource.name, color: `#${resource.color}` });
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
        {categoryId ? "Edit Category" : "Create Category"}
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
      >
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
                  <ColorPicker
                    id="color"
                    value={formik.values.color}
                    onChange={(color) =>
                      formik.setFieldValue("color", color.hex)
                    }
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
