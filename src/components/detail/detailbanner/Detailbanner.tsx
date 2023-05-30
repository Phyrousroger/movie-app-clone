import useFetch from "@/hooks/useFetch";
import { RootState } from "@/store/store";
import { Box, Card, Container, Flex, Grid, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import Posterfallback from "../../../../public/assets/no-poster.png";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";
import Generes from "@/components/generes/Generes";
import { CircularProgressbar } from "react-circular-progressbar";
import Circular from "@/components/circularprogress/Circular";
import PlayBtn from "../PlayBtn";

const Detailbanner = ({ video, crew }: any) => {
  const router = useRouter();
  const { mediaType, id } = router.query || {};
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state: RootState) => state.home);
  const isSmallerThanTable = useMediaQuery("(max-width:640px)");
  const _genres = data?.genres?.map((gen: any) => gen.id);

  const toHoursAndMinutes = (totalMinutes: any) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  console.log(url.backdrop);

  return (
    <Box h={"100vh"}>
      {!loading ? (
        <>
          {!!data && (
            <Container size={"lg"}>
              <LazyLoadImage
                src={url.backdrop + data?.backdrop_path}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  zIndex: 0,
                  top: 0,
                  bottom: 0,
                  left: 0,
                  opacity: 0.2,
                  overflow: "hidden",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              <Container
                mt={40}
                size={"lg"}
                style={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Grid align="center" justify="center" gutter={"xl"}>
                  <Grid.Col span={isSmallerThanTable ? 12 : 4}>
                    {data?.poster_path ? (
                      <Card
                        style={{
                          width: "100%",
                          height: "500px",
                        }}
                      >
                        <Image
                          alt={""}
                          fill={true}
                          src={url.backdrop + data?.poster_path}
                        />
                      </Card>
                    ) : (
                      <Card
                        // p={0}
                        style={{
                          width: "300px",
                          height: "500px",
                        }}
                      >
                        <Image src={Posterfallback} alt={""} fill={true} />
                      </Card>
                    )}
                  </Grid.Col>
                  <Grid.Col span={isSmallerThanTable ? 12 : 8}>
                    <Flex direction={"column"} gap={10}>
                      <Title size={40}>
                        {data.name || data.title}(
                        {dayjs(data?.release_date).format("YYYY")})
                      </Title>
                      <Text fw={500} size={16} opacity={0.7}>
                        {data?.tagline}
                      </Text>
                      <Flex justify={"start"}>
                        <Generes data={_genres} />
                      </Flex>
                      <Flex gap={30}>
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            background: "white",
                            borderRadius: "50%",
                            padding: "3px",
                          }}
                        >
                          <Circular rating={data?.vote_average?.toFixed(1)} />
                        </div>
                        <Flex align={"center"} gap={15}>
                          <PlayBtn />
                          <Text size={20}>Watch Trailer</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Container>
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
            </Container>
          )}
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Detailbanner;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { mediaType, id } = context.query;

//   const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}`);
//   const data = await res.json();
//   console.log(data);
//   return {
//     props: {
//       data,
//     },
//   };
// };
