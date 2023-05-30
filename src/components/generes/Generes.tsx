import { RootState } from "@/store/store";
import { Badge, Flex } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

interface GeneresProps {
  data: {
    map(arg0: (g: string) => React.JSX.Element | null): React.ReactNode;
    name: string;
  };
}

const Generes: React.FC<GeneresProps> = ({ data }) => {
  const { genres } = useSelector((state: RootState) => state.home);

  return (
    <Flex
      gap={3}
      style={{
        flexFlow: "wrap",
        justifyContent: "end",
      }}
    >
      {data?.map((g) => {
        if (!genres[g]?.name) return null;
        return (
          <div key={g}>
            <Badge color="pink" radius="sm" variant="filled">
              {genres[g]?.name}
            </Badge>
          </div>
        );
      })}
    </Flex>
  );
};

export default Generes;
