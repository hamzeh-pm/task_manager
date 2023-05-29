import { useCallback, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function useRequestResource({ endpoint }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });

  const [resource, setResource] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const getResourceList = useCallback(() => {
    axios
      .get(`/api/${endpoint}`)
      .then((resp) => setResourceList({ results: resp.data }))
      .catch((err) => {
        enqueueSnackbar(err, "error");
      });
  }, [endpoint, enqueueSnackbar]);

  const getResource = useCallback(
    (id) => {
      axios
        .get(`/api/${endpoint}/${id}/`)
        .then((resp) => {
          setResource(resp.data);
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, enqueueSnackbar]
  );

  const addResource = useCallback(
    (values, successCallback) => {
      axios
        .post(`/api/${endpoint}`, values)
        .then(() => {
          enqueueSnackbar("Added Successfully", "success");
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, enqueueSnackbar]
  );

  const updateResource = useCallback(
    (id, values, successCallback) => {
      axios
        .put(`/api/${endpoint}/${id}/`, values)
        .then(() => {
          enqueueSnackbar("Updated Successfully", "success");
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, enqueueSnackbar]
  );

  const deleteResource = useCallback(
    (id, successCallback) => {
      axios
        .delete(`/api/${endpoint}/${id}/`)
        .then(() => {
          const newResourceList = {
            results: resourceList.results.filter((item) => item.id !== id),
          };
          setResourceList(newResourceList);
          enqueueSnackbar("Delete Successfully", "success");
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, "error");
        });
    },
    [endpoint, resourceList, enqueueSnackbar]
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
