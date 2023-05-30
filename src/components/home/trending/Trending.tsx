import useFetch from "@/hooks/useFetch";
import {
  Text,
  Container,
  Box,
  Flex,
  SegmentedControl,
  createStyles,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import Carousel from "../../carousel/Carousal";

const useStyles = createStyles((theme) => ({
  root: {
    width: "200px",
    backgroundColor: "white",
    color: "#000",
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  indicator: {
    backgroundImage: "linear-gradient(to left top, #f7ff00, #db36a4)",
  },

  control: {
    border: "0 !important",
  },

  label: {
    color: "#000",
    ":hover": {
      color: "#000",
    },
  },
}));

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);
  const { classes } = useStyles();

  const onTabChange = (data: any) => {
    setEndpoint(data === "Day" ? "day" : "week");
    console.log(data);
  };

  return (
    <Box
      bg={"#04152d"}
      h={"100%"}
      style={{
        position: "relative",
      }}
    >
      <Container mt={50} size={"lg"}>
        <Flex justify={"space-between"}>
          <Text fw={500} size={30}>
            Trending
          </Text>
          <SegmentedControl
            radius="xl"
            size="md"
            data={["Day", "Week"]}
            classNames={classes}
            onChange={onTabChange}
          />
        </Flex>
        <Carousel data={data?.results} loading={loading} endpoint={""} />
      </Container>
    </Box>
  );
};

export default Trending;
