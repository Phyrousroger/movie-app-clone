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
import React, { useEffect, useState } from "react";
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

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const { classes } = useStyles();

  const onTabChange = (data: any) => {
    setEndpoint(data === "Movies" ? "movie" : "tv");
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
          <Text fw={500} size={20}>
            What is popular
          </Text>
          <SegmentedControl
            radius="xl"
            size="md"
            data={["Movies", "TV Show"]}
            classNames={classes}
            onChange={onTabChange}
          />
        </Flex>
      </Container>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </Box>
  );
};

export default Popular;
