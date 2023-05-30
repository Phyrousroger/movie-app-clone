import Detailbanner from "@/components/detail/detailbanner/Detailbanner";
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
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
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
  }, [dispatch]) as () => void;

  useEffect(() => {
    fetchapiconfig();
  }, [fetchapiconfig]);

  return (
    <Layout>
      <Detailbanner />
    </Layout>
  );
};

export default Moviedetail;
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   return { props: { params } };
// };
