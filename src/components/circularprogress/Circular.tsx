import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const Circular = ({rating}:any) => {
  // const rating: number = parseFloat(item.vote_average.toFixed(1));
  return (
    <div>
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating?.toString()}
        styles={{
          path: {
            stroke: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
            strokeLinecap: "round",
          },
          text: {
            fontSize: "34px",
            fontWeight: 700,
            fill: "#04152DFF",
            textAnchor: "middle",
            dominantBaseline: "middle",
          },
          trail: {
            stroke: "transparent",
          },
        }}
      />
    </div>
  );
};

export default Circular;
