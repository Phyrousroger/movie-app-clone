import VidepPopup from "@/components/videoPopup/VidepPopup";
import { Carousel } from "@mantine/carousel";
import {
  Container,
  Text,
  Title,
  rem,
  Card,
  Skeleton,
  Flex,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const useStyle = createStyles({
  sketon: {
    ":after": {
      background: "#0a2955",
    },
  },
  polygon: {
    strokeDasharray: 240,
    strokeDashoffset: 480,
    stroke: "white",
    transform: "translateY(0)",
    transition: "all 0.7s ease-in-out",
    "&:hover": {
      stroke: "red",
    },
  },
  circle: {
    stroke: "white",
    strokeDasharray: 650,
    strokeDashoffset: 1300,
    transition: "all 0.5s ease-in-out",
  },

  video: {
    cursor: "pointer",
    transition: "all 0.5s  ease-in-out",
    marginLeft: rem(20),
    position: "relative",
    "&:hover": {
      polygon: {
        strokeDashoffset: 0,
        transform: "translateY(0)",
        stroke: "#DA2F68FF",
      },
      circle: {
        stroke: "#DA2F68FF",
        strokeDashoffset: 0,
      },
    },
  },
});
const Videosection = ({ data, loading }: any) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { classes } = useStyle();
  const isSmallerThanTable = useMediaQuery("(max-width: 768px)");

  const slidecount = 5;
  const slide = [];
  for (let i: number = 0; i < slidecount; i++) {
    slide.push(
      <div className={classes.video}>
        <Skeleton width={300} height={200} className={classes.sketon!} />
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="70px"
          height="70px"
          viewBox="0 0 213.7 213.7"
          enableBackground="new 0 0 213.7 213.7"
          xmlSpace="preserve"
          style={{
            position: "absolute",
            zIndex: 20,
            bottom: "60%",
            left: "40%",
            transform: "translateY(80%)",
          }}
        >
          <polygon
            className={classes.polygon}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="73.5,62.5 148.5,105.8 73.5,149.1 "
          ></polygon>
          <circle
            className={classes.circle}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            cx="106.8"
            cy="106.8"
            r="103.3"
          ></circle>
        </svg>
      </div>
    );
  }
  console.log(data);
  return (
    <Container size={"lg"} my={30}>
      <Text mb={20} fw={700} size={20}>
        Official Videos
      </Text>
      {!loading ? (
        <Carousel
          slidesToScroll={5}
          slideSize={isSmallerThanTable ? "40%" : "20%"}
          slideGap="md"
          style={{
            gap: rem(20),
          }}
          withControls={false}
          align="start"
        >
          {data?.results?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setShow(true);
                  setVideoId(item?.key);
                }}
                className={classes.video}
              >
                <LazyLoadImage
                  src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                  alt={""}
                  width={300}
                  height={200}
                  style={{
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                />
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="70px"
                  height="70px"
                  viewBox="0 0 213.7 213.7"
                  enableBackground="new 0 0 213.7 213.7"
                  xmlSpace="preserve"
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    // top:10,
                    left: "40%",
                    transform: "translateY(80%)",
                  }}
                >
                  <polygon
                    className={classes.polygon}
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="73.5,62.5 148.5,105.8 73.5,149.1 "
                  ></polygon>
                  <circle
                    className={classes.circle}
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    cx="106.8"
                    cy="106.8"
                    r="103.3"
                  ></circle>
                </svg>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <Carousel
          slidesToScroll={5}
          slideSize={isSmallerThanTable ? "40%" : "20%"}
          slideGap="md"
          style={{
            gap: rem(20),
          }}
          withControls={false}
          align="start"
        >
          {slide}
        </Carousel>
      )}
      <VidepPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </Container>
  );
};

export default Videosection;
