import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import Categories from "./pages/Categories";
import CategoryDetail from "./pages/Categories/CategoryDetail";
import { SnackbarProvider } from "notistack";
import LoadingOverlayResource from "./components/loadingOverlayResource";
import SignUp from "./pages/Auth/signUp";
import SignIn from "./pages/Auth/signIn";
import AuthContextProvider from "./contexts/authContextProvider";
import RequireAuth from "./components/requireAuth";
import RequireNotAuth from "./components/requireNotAuth";
import BaseLayout from "./components/BaseLayout";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/Tasks/taskDetail";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <div>
      <CssBaseline />
      <LoadingOverlayResource>
        <AuthContextProvider>
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
                  <Route element={<RequireAuth />}>
                    <Route element={<BaseLayout />}>
                      <Route path="/categories" element={<Categories />} />
                      <Route
                        path="/categories/create"
                        element={<CategoryDetail />}
                      />
                      <Route
                        path="/categories/edit/:categoryId"
                        element={<CategoryDetail />}
                      />
                      <Route path="/tasks/" element={<Tasks />} />
                      <Route path="/tasks/create" element={<TaskDetail />} />
                      <Route
                        path="/tasks/edit/:taskId"
                        element={<TaskDetail />}
                      />
                      <Route path="/" element={<Dashboard />}></Route>
                    </Route>
                  </Route>
                  <Route element={<RequireNotAuth />}>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                  </Route>
                </Routes>
              </Box>
            </Router>
          </SnackbarProvider>
        </AuthContextProvider>
      </LoadingOverlayResource>
    </div>
  );
}

export default App;
