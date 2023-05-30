import Herobanner from "@/components/home/herobanner/Herobanner";
import Layout from "@/components/layout/Layout";
import Popular from "@/components/home/popular/Popular";
import Toprated from "@/components/home/toprated/Toprated";
import Trending from "@/components/home/trending/Trending";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Herobanner />
      <Trending />
      <Popular />
      <Toprated />
    </Layout>
  );
};

export default HomePage;
