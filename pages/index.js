import React from "react";
import BarGraph from "../components/BarGraph";
import LetterFrequency from "@visx/mock-data/lib/mocks/letterFrequency";
import { ParentSize } from "@visx/responsive";
import style from "../styles/Home.module.css";

const index = () => {
  return (
    <div className={style.chart}>
      <ParentSize>
        {({ width, height }) => (
          <BarGraph data={LetterFrequency} width={width} height={height} />
        )}
      </ParentSize>
    </div>
  );
};

export default index;
