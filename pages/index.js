import React, { useMemo } from "react";
import BarGraph from "../components/BarGraph";
import LetterFrequency from "@visx/mock-data/lib/mocks/letterFrequency";
import { ParentSize } from "@visx/responsive";
import style from "../styles/Home.module.css";
import { scaleBand, scaleLinear } from "@visx/scale";
import * as d3 from "d3";

const index = () => {
  const data = LetterFrequency.slice(5);

  const buildXScale = (xMax) => {
    return d3
      .scaleBand()
      .range([0, xMax])
      .domain(data.map((el) => el.letter))
      .padding(0.3);
  };

  const buildYScale = (yMax) => {
    return scaleLinear()
      .range([yMax, 0])
      .domain([0, Math.max(...data.map((el) => Number(el.frequency) * 100))]);
  };

  const axisLeft = {
    leftScale: (yScale) => yScale.nice(),
    leftNumTicks: 10,
    leftTop: 0,
    leftTickLabelProps: (yScale) => {
      return {
        fill: "#f3f3f3",
        fontSize: 10,
        textAnchor: "end",
        x: -12,
        y: yScale + 3,
      };
    },
  };

  const axisBottom = {
    bottomNumTicks: data.length,
    bottomTickLabelProps: {
      fill: "yellow",
      fontSize: 11,
      textAnchor: "middle",
    },
  };

  const xItem = (el) => el.letter;
  const yItem = (el) => Number(el.frequency) * 100;
  const colors = {
    backgroundColor: d3.color("steelblue"),
    barColor: "white",
  };

  return (
    <div className={style.chart}>
      <ParentSize>
        {({ width }) => (
          <BarGraph
            barData={data}
            axisLeft={axisLeft}
            axisBottom={axisBottom}
            width={width}
            height={700}
            buildXScale={buildXScale}
            buildYScale={buildYScale}
            xItem={xItem}
            yItem={yItem}
            colors={colors}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default index;
