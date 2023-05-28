import { useCallback, useState } from "react";
import axios from "axios";

export default function useRequestResource({ endpoint }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });

  const getResourceList = useCallback(() => {
    axios
      .get(`/api/${endpoint}`)
      .then((resp) => setResourceList({ results: resp.data }))
      .catch((err) => console.log(err));
  }, [endpoint]);

  return { resourceList, getResourceList };
}
