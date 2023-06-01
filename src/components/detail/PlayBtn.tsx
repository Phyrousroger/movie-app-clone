import { Flex, Text, createStyles, keyframes } from "@mantine/core";
import React, { useState } from "react";
import VidepPopup from "../videoPopup/VidepPopup";

const useStyle = createStyles({
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
  vitext: {
    fontSize: "20px",
    fontWeight: 500,
    color: "white",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      color: "#DA2F68FF",
    },
  },
  video: {
    cursor: "pointer",
    transition: "all 0.5s  ease-in-out",
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

const PlayBtn = ({ video }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<null>(null);
  const { classes } = useStyle();
  return (
    <>
      <Flex
        align={"center"}
        gap={15}
        className={classes.video}
        onClick={() => {
          setShow(true);
          setVideoId(video?.key);
        }}
      >
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
        <Text className={classes.vitext}>Watch Trailer</Text>
      </Flex>
      <VidepPopup show={show} setShow={setShow} videoId={videoId} 
      setVideoId={setVideoId}
      />
    </>
  );
};

export default PlayBtn;
