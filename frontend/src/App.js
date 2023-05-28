import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import Categories from "./pages/Categories";
import CategoryDetail from "./pages/Categories/CategoryDetail";

function App() {
  return (
    <div>
      <CssBaseline />
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
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
