import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Box, Container, Flex } from "@mantine/core";

const Layout = ({ children }: any) => {
  return (
    <Flex
      direction={"column"}
      justify={"space-between"}
      h={"100%"}

      bg={"#04152d"}
    >
      <Header />
      <Box>{children}</Box>

      <Footer />
    </Flex>
  );
};

export default Layout;
