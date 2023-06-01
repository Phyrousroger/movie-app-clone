import useFetch from "@/hooks/useFetch";
import { RootState } from "@/store/store";
import {
  Box,
  Card,
  Container,
  Divider,
  Flex,
  Skeleton,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import Posterfallback from "../../../../public/assets/no-poster.png";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";
import Generes from "@/components/generes/Generes";
import Circular from "@/components/circularprogress/Circular";
import PlayBtn from "../PlayBtn";

const useStyle = createStyles({
  sketon: {
    ":after": {
      background: "#0a2955",
    },
  },
});
const Detailbanner = ({ video, crew }: any) => {
  const { classes } = useStyle();
  const router = useRouter();
  const { mediaType, id } = router.query || {};
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state: RootState) => state.home);
  const isSmallerThanTable = useMediaQuery("(max-width:640px)");
  const _genres = data?.genres?.map((gen: any) => gen.id);
  const director = crew?.filter((f: any) => f.job === "Director");
  const writer = crew?.filter(
    (w: any) =>
      w.job === "Screenplay" || w.job === "Story" || w.job === "Writer"
  );
  console.log(director);

  const toHoursAndMinutes = (totalMinutes: any) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  console.log(url.backdrop);

  return (
    <Container size={"lg"} mt={20}>
      {!loading ? (
        <>
          {!!data && (
            <>
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
              <Box
                mt={40}
                style={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Flex
                  style={{
                    flexFlow: "row wrap",
                  }}
                  w={"100%"}
                  gap={20}
                  justify={"start"}
                >
                  <Box w={isSmallerThanTable ? "100%" : "30%"}>
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
                        style={{
                          width: 300,
                          margin: "auto",
                          height: "500px",
                        }}
                      >
                        <Image alt={""} fill={true} src={Posterfallback} />
                      </Card>
                    )}
                  </Box>
                  <Box w={isSmallerThanTable ? "100%" : "65%"}>
                    <Flex direction={"column"}>
                      <Title size={35} color="white">
                        {data.name || data.title}(
                        {dayjs(data?.release_date).format("YYYY")})
                      </Title>
                      <Text fw={700} size={16} color="white" opacity={0.7}>
                        {data?.tagline}
                      </Text>
                      <Flex justify={"start"} mt={20}>
                        <Generes data={_genres} />
                      </Flex>
                      <Flex gap={30} mt={20}>
                        <div
                          style={{
                            width: "70px",
                            height: "70px",
                            background: "white",
                            borderRadius: "50%",
                            padding: "3px",
                          }}
                        >
                          <Circular rating={data?.vote_average?.toFixed(1)} />
                        </div>

                        <PlayBtn video={video} />
                      </Flex>
                      <Box
                        mt={20}
                        style={{
                          color: "white",
                          marginBottom: 20,
                        }}
                      >
                        <Title mb={10} size={20}>
                          Overview
                        </Title>
                        <Text size={18} fw={500} color="white">
                          {data.overview}
                        </Text>
                      </Box>
                      <Box mb={20}>
                        <Flex gap={20} mt={10}>
                          {data.status && (
                            <Flex
                              gap={10}
                              style={{
                                flexFlow: "row wrap",
                              }}
                            >
                              <Text size={16} fw={700} color="white">
                                Status:
                              </Text>
                              <span
                                style={{
                                  opacity: 0.8,
                                  fontWeight: 500,
                                }}
                              >
                                {data.status}
                              </span>
                            </Flex>
                          )}
                          {data.release_date && (
                            <Flex
                              gap={10}
                              style={{
                                flexFlow: "row wrap",
                              }}
                            >
                              <Text size={16} fw={700} color="white">
                                release date:{" "}
                              </Text>
                              <span
                                style={{
                                  opacity: 0.8,
                                  fontWeight: 500,
                                }}
                              >
                                {dayjs(data.release_date).format("MMM D,YYYY")}
                              </span>
                            </Flex>
                          )}
                          {data.runtime && (
                            <Flex
                              gap={10}
                              style={{
                                flexFlow: "row wrap",
                              }}
                            >
                              <Text size={16} fw={700} color="white">
                                Runtime:{" "}
                              </Text>
                              <span
                                style={{
                                  opacity: 0.8,
                                  fontWeight: 500,
                                }}
                              >
                                {toHoursAndMinutes(data.runtime)}
                              </span>
                            </Flex>
                          )}
                        </Flex>
                        <Divider />
                        {director?.length > 0 && (
                          <>
                            <Flex gap={10} mt={10}>
                              <Text size={16} fw={700} color="white">
                                Director:{" "}
                              </Text>
                              {director.map((d: any, i: any) => (
                                <span
                                  style={{
                                    opacity: 0.8,
                                    fontWeight: 500,
                                  }}
                                  key={i}
                                >
                                  {d.name}
                                  {director.length - 1 !== i && ","}
                                </span>
                              ))}
                            </Flex>
                            <Divider />
                          </>
                        )}
                        {writer?.length > 0 && (
                          <>
                            <Flex gap={10} mt={10}>
                              <Text size={16} fw={700} color="white">
                                Writer:
                              </Text>
                              {writer.map((d: any, i: any) => (
                                <span
                                  key={i}
                                  style={{
                                    opacity: 0.8,
                                    fontWeight: 500,
                                  }}
                                >
                                  {d.name}
                                  {writer.length - 1 !== i && ","}
                                </span>
                              ))}
                            </Flex>
                            <Divider />
                          </>
                        )}
                        {data?.created_by?.length > 0 && (
                          <>
                            <Flex gap={10} mt={10}>
                              <Text size={16} fw={700} color="white">
                                Creator:
                              </Text>
                              {data?.created_by?.map((d: any, i: any) => (
                                <span
                                  key={i}
                                  style={{
                                    opacity: 0.8,
                                    fontWeight: 500,
                                  }}
                                >
                                  &nbsp;&nbsp;&nbsp;
                                  {d.name}
                                  {data?.created_by?.length - 1 !== i && ","}
                                </span>
                              ))}
                            </Flex>
                            <Divider />
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          <Container
            mt={40}
            size={"lg"}
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Flex
              style={{
                flexFlow: "row wrap",
              }}
              w={"100%"}
              gap={20}
              justify={"start"}
            >
              <Box w={isSmallerThanTable ? "100%" : "30%"}>
                <Skeleton
                  className={classes.sketon}
                  width={"100%"}
                  height={500}
                />
              </Box>
              <Box w={isSmallerThanTable ? "100%" : "65%"}>
                <Skeleton
                  height={30}
                  className={classes.sketon}
                  width="70%"
                  radius="xl"
                />
                <Skeleton
                  height={30}
                  mt={6}
                  className={classes.sketon}
                  radius="xl"
                />
                <Flex gap={20} mt={20}>
                  <Skeleton
                    height={20}
                    width={"10%"}
                    mt={6}
                    className={classes.sketon}
                    radius="xl"
                  />
                  <Skeleton
                    height={20}
                    width={"10%"}
                    mt={6}
                    className={classes.sketon}
                    radius="xl"
                  />
                </Flex>
                <Box mt={30}>
                  <Skeleton
                    height={30}
                    width={"30%"}
                    mb={10}
                    className={classes.sketon}
                    radius="xl"
                  />
                  <Skeleton
                    height={100}
                    className={classes.sketon}
                    radius="lg"
                  />
                </Box>
                <Box mt={30}>
                  <Skeleton
                    height={30}
                    width={"50%"}
                    mb={10}
                    className={classes.sketon}
                    radius="xl"
                  />
                </Box>
              </Box>
            </Flex>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Detailbanner;
