import { RootState } from "@/store/store";
import { Card, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Posterfallback from "../../../public/assets/no-poster.png";
import Circular from "../circularprogress/Circular";
import Generes from "../generes/Generes";
import dayjs from "dayjs";

const Moviecard = ({ data, fromSearch }: any) => {
  const { url } = useSelector((state: RootState) => state.home);
  const router = useRouter();
  console.log(data);
  const PostUrl = data?.poster_path
    ? url.poster + data?.poster_path
    : Posterfallback;

  return (
    <>
      <Card
        w={"100%"}
        style={{
          cursor: "pointer",
        }}
        h={300}
        onClick={() => router.push(`/${data.media_type}/${data.id}`)}
      >
        <Image src={PostUrl} alt="" fill />
        {!fromSearch && (
          <>
            <Circular rating={data?.vote_average.toFixed(1)} />
            <Generes data={data.genre_ids.slice(0, 2)} />
          </>
        )}
      </Card>
      <Text fw={700} size={16}>{data.name || data.title}</Text>
      <Text fw={500} size={14} opacity={0.8}>{dayjs(data.release_date).format("MMM D,YYYY")}</Text>
    </>
  );
};

export default Moviecard;
