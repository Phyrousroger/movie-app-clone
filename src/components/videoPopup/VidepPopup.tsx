import { Flex, createStyles, Card, Button, CloseButton } from "@mantine/core";
import React from "react";
import ReactPlayer from "react-player";

const VidepPopup = ({ show, setShow, videoId, setVideoId }: any) => {
  const useStyle = createStyles({
    flexLayer: {
      position: "fixed",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    opacityLayer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(3.5px)",
      WebkitBackdropFilter: "blur(3.5px)",
      opacity: show ? 1 : 0,
      transition: "opacity 400ms",
    },
  });
  const { classes } = useStyle();
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
    console.log(videoId);
  };
  return (
    <>
      {show && (
        <Flex className={classes.flexLayer}>
          <div className={classes.opacityLayer}></div>
          <Flex direction={"column"} align={"end"}>
            <CloseButton
              size={30}
              aria-label="Close modal"
              onClick={hidePopup}
            />
            <Card p={0}>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
            </Card>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default VidepPopup;
