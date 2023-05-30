import { fetchDataFromApi } from "@/utils/api";
import  { useEffect, useState } from "react";

const useFetch = (url: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError(null);

    fetchDataFromApi(url, {})
      .then((res) => {
        setLoading(false);
        setData(res);
      })

      .catch((err) => {
        setLoading(false);
        setError("Something went Wrong");
      });
  }, [url]);
  return {data,loading,error};
};

export default useFetch;
