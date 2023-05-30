import {
  Box,
  Burger,
  Container,
  Flex,
  Group,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import Logo from "../../../../public/assets/movix-logo.svg";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import { ImCross } from "react-icons/im";

const useStyle = createStyles({
  nav: {
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    "&:hover": {
      color: "purple",
    },
  },
});
const Header = () => {
  const { classes } = useStyle();
  const [query, setQuery] = useState("");
  const [scroll, setScroll] = useState(false);
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const [opened, { toggle }] = useDisclosure(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const label = opened ? "Close navigation" : "Open navigation";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchQueryHandler = (e: FormEvent<HTMLFormElement>) => {
    if (query.length > 0) {
      router.push(`/search/${query}`);
    }
    e.preventDefault();
  };

  const navigationHandler = (type: string) => {
    if (type === "movie") {
      router.push("/explore/movie");
    } else if (type === "tv") {
      router.push("/explore/tv");
    } else {
      router.push("/");
    }
  };

  return (
    <Box
      p={15}
      sx={{
        transition: "all ease 0.5s",
        position: "relative",
        zIndex: 1,
        background: scroll ? "" : "rgba(0, 0, 0, 0.25)",
        transform: scroll ? "translateY(-60px)" : "",
      }}
    >
      <Container size={"lg"}>
        <Flex justify={"space-between"}>
          <Image alt="" src={Logo} onClick={() => navigationHandler("")}
          style={{
            cursor:"pointer"
          }}
          />
          <Flex
            gap={"lg"}
            sx={{
              flexDirection: isSmallerThanTable ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            {isSmallerThanTable ? (
              <>
                <Burger opened={opened} onClick={toggle} aria-label={label} />
              </>
            ) : (
              <>
                {/* <Link href={""} className={classes.nav}> */}
                <Text
                  className={classes.nav}
                  onClick={() => navigationHandler("movie")}
                >
                  Movies
                </Text>
                {/* </Link> */}
                <Text
                  className={classes.nav}
                  onClick={() => navigationHandler("tv")}
                >
                  TV Shows
                </Text>
              </>
            )}
            {isSmallerThanTable ? (
              opened && (
                <motion.div
                  initial={{ y: "-100vh" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "fixed",
                    width: "100%",
                    left: 0,
                    top: 50,
                    zIndex: 100,
                  }}
                >
                  <Group
                    position="center"
                    mt={30}
                    sx={{
                      position: "absolute",
                      padding: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "100%",
                      zIndex: 100,
                      background: "rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <Flex direction={"column"} w={"100%"}>
                      <Link
                        href={""}
                        className={classes.nav}
                        style={{
                          padding: "10px",
                        }}
                      >
                        <Text>Movies</Text>
                      </Link>
                      <Link
                        href={""}
                        className={classes.nav}
                        style={{
                          padding: "10px",
                        }}
                      >
                        <Text>TV Shows</Text>
                      </Link>
                    </Flex>
                  </Group>
                </motion.div>
              )
            ) : (
              <></>
            )}
            <FiSearch
              onClick={() => setShow(!show)}
              style={{
                fontSize: "20px",
              }}
            />
          </Flex>
          {show && (
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                width: "100%",
                left: 0,
                top: 50,
                zIndex: 100,
              }}
            >
              <form onSubmit={searchQueryHandler}>
                <TextInput
                  placeholder="Search movie"
                  onChange={(e) => setQuery(e.target.value)}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    top: 30,
                    zIndex: 100,
                    background: "rgba(0, 0, 0, 0.25)",
                    input: {
                      background: "#fff",
                      padding: "20px",
                      color: "#000",
                      borderRadius: "30px",
                    },
                  }}
                  rightSection={
                    <ImCross
                      onClick={() => setShow(!show)}
                      style={{
                        color: "#000fee",
                      }}
                    />
                  }
                />
              </form>
            </motion.div>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
