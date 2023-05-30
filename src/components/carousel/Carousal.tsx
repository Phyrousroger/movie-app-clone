import { RootState } from "@/store/store";
import { Carousel } from "@mantine/carousel";
import { Box, Card, Skeleton, Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
import PosterFallback from "../../../public/assets/no-poster.png";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { CircularProgressbar } from "react-circular-progressbar";
import Generes from "../generes/Generes";
import { useRouter } from "next/router";
import Circular from "../circularprogress/Circular";

interface carouselprops {
  data: dataProps;
  loading: any;
  endpoint: string;
}

interface dataProps {
  map(arg0: (item: dataProps) => React.JSX.Element): React.ReactNode;
  name: string;
  adult: boolean;
  id: number;
  genre_ids: [];
  vote_average: number;
  backdrop_path: string;
  media_type: string;
  title: string;
  release_date: string;
  popularity: number;
  poster_path: string;
}
[];

const Carousal: React.FC<carouselprops> = ({ data, loading, endpoint }) => {
  const { url } = useSelector((state: RootState) => state.home);
  const isSmallerThanTable = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  return (
    <Box py={30}>
      {!loading ? (
        <Carousel
          nextControlIcon={
            <BsFillArrowRightCircleFill size={30} color="#000" />
          }
          previousControlIcon={
            <BsFillArrowLeftCircleFill size={30} color="#000" />
          }
          slidesToScroll={5}
          slideSize={isSmallerThanTable ? "40%" : "20%"}
          slideGap="md"
          style={{
            gap: rem(20),
          }}
          loop
          align="start"
        >
          {data?.map((item: dataProps) => {
            const postUrl = item.poster_path
              ? url.poster + item.poster_path
              : PosterFallback;
            const rating: number = parseFloat(item.vote_average.toFixed(1));
            const handleSlideClick = (item: dataProps) => {
              const { media_type, id } = item;
              const point = media_type || endpoint;
              const path = `/${point}/${id}`;
              console.log(path);
              router.push(path);
            };
            return (
              <div
                key={item.id}
                style={{
                  paddingLeft: rem(20),
                }}
              >
                <Card
                  p={0}
                  w={200}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={postUrl}
                    alt=""
                    style={{
                      borderRadius: "10px",
                    }}
                    onClick={() => handleSlideClick(item)}
                    width={200}
                    height={300}
                  />
                  <Box
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "3px",
                    }}
                  >
                    <Generes data={item.genre_ids.slice(0, 2)} />
                  </Box>
                </Card>
                <div
                  style={{
                    position: "relative",
                    width: "40px",
                    top: "-20px",
                    left: "10px",
                    height: "40px",
                    background: "white",
                    borderRadius: "50%",
                    flexShrink: 0,
                    padding: "2px",
                  }}
                >
                  <Circular rating={rating} />
                </div>
                <Text fw={700} size={18}>
                  {item.title?.substring(0, 20) || item.name?.substring(0, 20)}
                  ...
                </Text>
                <Text>{dayjs(item.release_date).format("D-MM-YYYY")}</Text>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <Carousel
          nextControlIcon={
            <BsFillArrowRightCircleFill size={30} color="#000" />
          }
          previousControlIcon={
            <BsFillArrowLeftCircleFill size={30} color="#000" />
          }
          slidesToScroll={5}
          slideSize={isSmallerThanTable ? "40%" : "20%"}
          slideGap="md"
          loop
          align="start"
          draggable={false}
        >
          <Carousel.Slide>
            <Skeleton h={300} w={200} color="red" />
          </Carousel.Slide>
          <Carousel.Slide>
            <Skeleton h={300} w={200} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Skeleton h={300} w={200} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Skeleton h={300} w={200} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Skeleton h={300} w={200} />
          </Carousel.Slide>
        </Carousel>
      )}
    </Box>
  );
};

export default Carousal;
