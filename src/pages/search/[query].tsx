import Layout from "@/components/layout/Layout";
import Moviecard from "@/components/movieCard/Moviecard";
import { fetchDataFromApi } from "@/utils/api";
import { Box, Container, Flex, Grid, Loader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Query = () => {
  const [data, setData] = useState<any>(null);
  const [pagenum, setPagenum] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { query } = router.query;

  const fetchInitialData = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?`, { query, page: pagenum }).then((res) => {
      // setData(res);
      setData(res);
      console.log(res);
      setPagenum((prev) => prev + 1);
      setLoading(false);
    });
  }, [pagenum, query]);
  const fetchNextPageData = useCallback(() => {
    fetchDataFromApi(`/search/multi?`, { query, page: pagenum }).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res?.results],
        });
      } else {
        setData(res);
      }
      setPagenum((prev: number) => prev + 1);
    });
  }, [data, pagenum, query]);
  // useEffect(() => {
  //   fetchInitialData();
  //   fetchNextPageData();
  // }, [fetchInitialData, fetchNextPageData, query]);

  useEffect(() => {
    fetchInitialData();
    fetchNextPageData();
  }, [fetchInitialData, fetchNextPageData]);
  return (
    <Layout>
      <Container size="lg" mt={20}>
        {/* {!loading && ( */}
        {/* <Container size="lg"> */}
        {data?.results?.length > 0 ? (
          <>
            <Text size={20} fw={700}>
              Search {data?.total_results > 1 ? "results" : "result"} of =
              {query}
            </Text>
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pagenum <= data?.total_pages}
              loader={
                <Flex w={"100%"} justify={"center"}>
                  <Loader color="#0e7eed" />
                </Flex>
              }
            >
              <Flex
                my={20}
                w={"100%"}
                gap={20}
                style={{
                  flexFlow: "row wrap",
                  justifyContent: "center",
                }}
              >
                {data?.results?.map((item: any, index: any) => {
                  if (item.media_type === "person") return;
                  return (
                    <Box w={"18%"} key={item.id}>
                      <Moviecard key={index} data={item} fromSearch={true} />
                    </Box>
                  );
                })}
              </Flex>
            </InfiniteScroll>
          </>
        ) : (
          <Box h={"100vh"}>
            <Text size={20} fw={700}>
              Result Not Found
            </Text>
          </Box>
        )}
        {/* </Container> */}
        {/* )} */}
      </Container>
    </Layout>
  );
};

export default Query;
