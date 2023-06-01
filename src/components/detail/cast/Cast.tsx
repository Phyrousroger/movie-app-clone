import { RootState } from "@/store/store";
import {
  Container,
  Skeleton,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import avator from "../../../../public/assets/avatar.png";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";

const useStyle = createStyles({
  sketon: {
    ":after": {
      background: "#0a2955",
    },
  },
});
const Cast = ({ data, loading }: any) => {
  const { classes } = useStyle();
  const { url } = useSelector((state: RootState) => state.home);
  const isSmallerThanTable = useMediaQuery("(max-width: 768px)");
  console.log(data);
  const slidecount = 5;
  const slide = [];
  for (let i: number = 0; i < slidecount; i++) {
    slide.push(
      <Carousel.Slide>
        <Skeleton width={200} height={250} className={classes.sketon} />
      </Carousel.Slide>
    );
  }

  return (
    <Container
      size={"lg"}
      mt={100}
    >
      <Text mb={20} fw={700} size={20}>Top Cast</Text>
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
          {data?.map((item: any, index: any) => {
            let imgUrl = item.profile_path
              ? url.profile + item.profile_path
              : avator;
            return (
              <Carousel.Slide key={index}>
                <Image
                  src={imgUrl}
                  alt={""}
                  width={200}
                  height={250}
                  style={{
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                />
                <Text my={10} align="center" size={20} fw={700}>
                  {item.name}
                </Text>
                <Text align="center" fw={500} opacity={0.7}>
                  {item.character}
                </Text>
              </Carousel.Slide>
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
    </Container>
  );
};

export default Cast;
