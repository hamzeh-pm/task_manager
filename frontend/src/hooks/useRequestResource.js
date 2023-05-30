import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { LoadingOverlayResourceContext } from "../components/loadingOverlayResource";
import getCommonOptions from "../helpers/axios/getCommonOptions";

export default function useRequestResource({ endpoint }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });

  const loadingOverlay = useContext(LoadingOverlayResourceContext);
  const { setLoading } = loadingOverlay;

  const [resource, setResource] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const getResourceList = useCallback(() => {
    setLoading(true);
    const options = getCommonOptions();
    axios
      .get(`/api/${endpoint}`, options)
      .then((resp) => {
        setResourceList({ results: resp.data });
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err, "error");
      });
  }, [endpoint, enqueueSnackbar, setLoading]);

  const getResource = useCallback(
    (id) => {
      setLoading(true);
      const options = getCommonOptions();
      axios
        .get(`/api/${endpoint}/${id}/`, options)
        .then((resp) => {
          setResource(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, enqueueSnackbar, setLoading]
  );

  const addResource = useCallback(
    (values, successCallback) => {
      setLoading(true);
      const options = getCommonOptions();
      axios
        .post(`/api/${endpoint}`, values, options)
        .then(() => {
          enqueueSnackbar("Added Successfully", "success");
          setLoading(false);
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, enqueueSnackbar, setLoading]
  );

  const updateResource = useCallback(
    (id, values, successCallback) => {
      setLoading(true);
      const options = getCommonOptions();
      axios
        .put(`/api/${endpoint}/${id}/`, values, options)
        .then(() => {
          enqueueSnackbar("Updated Successfully", "success");
          setLoading(false);
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, enqueueSnackbar, setLoading]
  );

  const deleteResource = useCallback(
    (id, successCallback) => {
      setLoading(true);
      const options = getCommonOptions();
      axios
        .delete(`/api/${endpoint}/${id}/`, options)
        .then(() => {
          const newResourceList = {
            results: resourceList.results.filter((item) => item.id !== id),
          };
          setResourceList(newResourceList);
          enqueueSnackbar("Delete Successfully", "success");
          setLoading(false);
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, resourceList, enqueueSnackbar, setLoading]
  );

  return {
    resourceList,
    getResourceList,
    addResource,
    getResource,
    resource,
    updateResource,
    deleteResource,
  };
}
