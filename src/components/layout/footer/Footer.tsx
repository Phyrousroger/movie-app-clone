import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  createStyles,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";


const Footer = () => {
  
  const isSmallerThanTable = useMediaQuery("(max-width:768px)");
  const useStyle = createStyles({
    nav: {
      textDecoration: "none",
      fontWeight: 500,
      color: "white",
      transition: "0.5s",
      fontSize:isSmallerThanTable?"16px":"20px",
      "&:hover": {
        color: "purple",
      },
    },
    logo: {
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#04152d",
      borderRadius: "50%",
      transition: "all ease 0.3s",
      "&:hover": {
        boxShadow: "0 0 0.625em #da2f68",
        color: "#da2f68",
      },
    },
  });
  const { classes } = useStyle();
  return (
    <Center
      style={{
        // height: "50vh",
        background: "#020c1b",
        position:"relative"
      }}
    >
      <Container
        size={"lg"}
        my={30}
        style={{
          textAlign: "center",
        }}
      >
        <Flex direction={"column"} gap={30}>
          <Flex justify={"center"} gap={20} align={"center"} h={"100%"}>
            <Link href={""} className={classes.nav} >
              Terms Of Use
            </Link>
            <Link href={""} className={classes.nav}>
              Privacy-Policy
            </Link>
            <Link href={""} className={classes.nav}>
              About
            </Link>
            <Link href={""} className={classes.nav}>
              Blog
            </Link>
            <Link href={""} className={classes.nav}>
              FAQ
            </Link>
          </Flex>
          <Text fw={"bold"} opacity={0.5}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
            iusto esse tempora nam blanditiis assumenda asperiores facere, odit,
            saepe minima labore sequi illo, reprehenderit repellendus ipsam
            quasi. Doloremque, voluptate possimus.
          </Text>
          <Flex justify={"center"} gap={20}>
            <div className={classes.logo}>
              <FaFacebookF />
            </div>
            <div className={classes.logo}>
              <FaInstagram />
            </div>
            <div className={classes.logo}>
              <FaTwitter />
            </div>
            <div className={classes.logo}>
              <BsLinkedin />
            </div>
          </Flex>
        </Flex>
      </Container>
    </Center>
  );
};

export default Footer;
