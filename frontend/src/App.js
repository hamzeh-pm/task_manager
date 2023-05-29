import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import Categories from "./pages/Categories";
import CategoryDetail from "./pages/Categories/CategoryDetail";
import { SnackbarProvider } from "notistack";
import LoadingOverlayResource from "./components/loadingOverlayResource";

function App() {
  return (
    <div>
      <CssBaseline />
      <LoadingOverlayResource>
        <SnackbarProvider>
          <Router>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.background.default,
                minHeight: "100vh",
                width: "100%",
              }}
            >
              <Routes>
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/create" element={<CategoryDetail />} />
                <Route
                  path="/categories/edit/:categoryId"
                  element={<CategoryDetail />}
                />
              </Routes>
            </Box>
          </Router>
        </SnackbarProvider>
      </LoadingOverlayResource>
    </div>
  );
}

export default App;
