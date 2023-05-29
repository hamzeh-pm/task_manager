import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import Categories from "./pages/Categories";
import CategoryDetail from "./pages/Categories/CategoryDetail";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div>
      <CssBaseline />
      <SnackbarProvider>
        <Router>
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.background.default,
              minHeight: "100vh",
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
    </div>
  );
}

export default App;
