import useFetch from "@/hooks/useFetch";
import { RootState } from "@/store/store";
import {
  Button,
  Flex,
  Text,
  TextInput,
  Title,
  Box,
  Container,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Herobanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const isSmallerThanTable = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { url } = useSelector((state: RootState) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  const searchQueryHandler = (e: FormEvent<HTMLFormElement>) => {
    if (query.length > 0) {
      router.push(`/search/${query}`);
    }
    e.preventDefault();
  };

  return (
    <Container>
      {!loading && (
        <LazyLoadImage
          src={background}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 0,
            top: 0,
            bottom: 0,
            left: 0,
            opacity: 0.5,
            overflow: "hidden",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
      <Box>
        <Flex
          direction={"column"}
          style={{
            zIndex: 4,
            height: "80vh",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            style={{
              position: "relative",
            }}
          >
            <Title size={isSmallerThanTable ? 50 : 80} color="white">
              Welcome
            </Title>
            <Text size={isSmallerThanTable ? 15 : 25}>
              Millions of movies, TV shows and people to discover. Explore now.
            </Text>
          </Box>
          <form
            onSubmit={searchQueryHandler}
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TextInput
              type="text"
              size={"xl"}
              placeholder={"Search for a movie or TV show..."}
              w={"100%"}
              onChange={(e) => setQuery(e.target.value)}
              styles={{
                input: {
                  background: "white",
                  color: "#000",
                  border: "none",
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                  borderTopRightRadius: "unset",
                  borderBottomRightRadius: "unset",

                  "&::placeholder": {
                    color: "dark",
                    fontWeight: isSmallerThanTable ? 400 : 500,
                  },
                },
              }}
            />
            <Button
              type="submit"
              sx={{
                border: "none",
                background: "linear-gradient(to left top, #f7ff00, #db36a4)",
                borderTopLeftRadius: "unset",
                borderBottomLeftRadius: "unset",
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
              color="dark"
              variant="outline"
              size="xl"
            >
              Search
            </Button>
          </form>
        </Flex>
      </Box>
      <div
        style={{
          width: "100%",
          height: "250px",
          background:
            "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)",
          position: "absolute",
          zIndex: 0,
          bottom: 5,
          left: 0,
        }}
      ></div>
    </Container>
  );
};

export default Herobanner;
