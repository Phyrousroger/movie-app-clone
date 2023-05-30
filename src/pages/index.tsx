import React, { useCallback, useEffect } from "react";
import HomePage from "./home";
import { fetchDataFromApi } from "@/utils/api";
import { getApiConfiguration, getGeneres } from "@/store/reducers/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Index = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state: RootState) => state.home);

  const fetchapiconfig = useCallback((): void => {
    fetchDataFromApi("/configuration", {}).then((res: any) => {
      console.log(res);
      const url: any = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  }, [dispatch]) as () => void;
  const generesCall = useCallback(async (): Promise<void> => {
    let promise: Promise<any>[] = [];
    let endpoint: string[] = ["tv", "movie"];
    let allGeneres: { [key: string]: any } = {};

    endpoint.forEach((url: string) => {
      promise.push(fetchDataFromApi(`/genre/${url}/list`, {}));
    });

    try {
      const data = await Promise.all(promise);
      console.log(data);
      data?.map(({ genres }): void => {
        return genres.map((item: any) => (allGeneres[item.id] = item));
      });
      dispatch(getGeneres(allGeneres));
    } catch (error) {
      console.error("Error fetching genre data:", error);
    }
  }, [dispatch]) as () => Promise<void>;

  useEffect(() => {
    fetchapiconfig();
    generesCall();
  }, [fetchapiconfig, generesCall]);
  return (
    <>
      <HomePage />
    </>
  );
};

export default Index;