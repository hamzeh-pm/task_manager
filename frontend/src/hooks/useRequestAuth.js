import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { AuthContext } from "../contexts/authContextProvider";

export default function useRequestAuth() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  const register = useCallback(
    ({ username, email, password }, successCallback) => {
      setLoading(true);
      axios
        .post("/api/users/auth/users/", {
          username: username,
          email: email,
          password: password,
        })
        .then(() => {
          enqueueSnackbar("sign up is successful, you can now login");
          setLoading(false);
          if (successCallback) successCallback();
        })
        .catch((err) => {
          setError(err.message);
          enqueueSnackbar(err.message, "error");
        });
    },
    [enqueueSnackbar, setLoading]
  );

  const login = useCallback(
    ({ username, password }, successCallback) => {
      setLoading(true);
      axios
        .post("/api/users/auth/token/login/", {
          username: username,
          password: password,
        })
        .then((resp) => {
          enqueueSnackbar("login success");
          const { auth_token } = resp.data;
          localStorage.setItem("auth_token", auth_token);
          setLoading(false);
          setIsAuthenticated(true);
          if (successCallback) successCallback();
        })
        .catch((err) => {
          setError(err.message);
          enqueueSnackbar(err.message, "error");
        });
    },
    [enqueueSnackbar, setLoading, setIsAuthenticated]
  );

  return { register, login, loading, error };
}
