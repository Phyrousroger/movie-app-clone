import { RootState } from "@/store/store";
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Card,
  Container,
  Skeleton,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
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
import Generes from "../generes/Generes";
import { useRouter } from "next/router";
import Circular from "../circularprogress/Circular";

const useStyle = createStyles({
  sketon: {
    ":after": {
      background: "#0a2955",
    },
  },
});

interface CarouselProps {
  title: string;
  data: any[];
  loading: boolean;
  endpoint: string;
}
const Carousal: React.FC<CarouselProps> = ({ data, loading, endpoint, title }) => {
  const { classes } = useStyle();
  const { url } = useSelector((state: RootState) => state.home);
  const isSmallerThanTable = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const slidecount = 5;
  const slide = [];
  for (let i: number = 0; i < slidecount; i++) {
    slide.push(
      <Carousel.Slide>
        <Skeleton h={300} w={200} className={classes.sketon} />
        <Skeleton mt={20} h={20} w={"90%"} className={classes.sketon} />
        <Skeleton mt={20} h={20} w={"50%"} className={classes.sketon} />
      </Carousel.Slide>
    );
  }

  return (
    <Container my={30} size={"lg"}>
      {title && (
        <Text size={20} fw={700} my={20}>
          {title}
        </Text>
      )}
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
          {data?.map((item: any) => {
            const postUrl = item.poster_path
              ? url.poster + item.poster_path
              : PosterFallback;
            const rating: number = parseFloat(item.vote_average.toFixed(1));
            const handleSlideClick = (item: any) => {
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
                  h={300}
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
                    fill
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
          {slide}
        </Carousel>
      )}
    </Container>
  );
};

export default Carousal;
