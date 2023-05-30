import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import React from "react";

const Query = () => {
  const router = useRouter();
  const { query } = router.query;
  return (
    <Layout>
      <div
        style={{
          height: "400vh",
        }}
      >
        Search query ={query}
      </div>
    </Layout>
  );
};

export default Query;
