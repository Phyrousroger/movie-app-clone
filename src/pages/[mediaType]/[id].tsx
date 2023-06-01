import Cast from "@/components/detail/cast/Cast";
import Detailbanner from "@/components/detail/detailbanner/Detailbanner";
import Recommendtation from "@/components/detail/similar/Recommendtation";
import Similar from "@/components/detail/similar/Similar";
import Videosection from "@/components/detail/videosection/videosection";
import Layout from "@/components/layout/Layout";
import useFetch from "@/hooks/useFetch";
import { getApiConfiguration } from "@/store/reducers/homeSlice";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const Moviedetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mediaType, id } = router.query;
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsloading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  console.log(credits?.cast);
  console.log(data);
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
  }, [dispatch]);
  useEffect(() => {
    fetchapiconfig();
  }, [fetchapiconfig]);

  return (
    <Layout>
      <Detailbanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsloading} />
      <Videosection data={data} loading={loading} />
      <Similar mediatype={mediaType} id={id} />
      <Recommendtation mediatype={mediaType} id={id} />
      <div
        style={{
          width: "100%",
          height: "250px",
          background:
            "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)",
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          left: 0,
        }}
      ></div>
    </Layout>
  );
};

export default Moviedetail;
