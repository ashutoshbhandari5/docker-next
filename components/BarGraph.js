import React from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import * as d3 from "d3";

const BarGraph = ({ data, width, height }) => {
  const barData = data.slice(0, 5);
  console.log(barData);
  const yMargin = 140;

  const xMax = width;
  const yMax = height - yMargin;

  const xScale = d3
    .scaleBand()
    .domain(barData.map((el) => el.letters))
    .range([0, xMax])
    .padding(0.3);

  const yScale = d3
    .scaleLinear()
    .range([yMax, 0])
    .domain([0, d3.max([...barData.map((el) => Number(el.frequency) * 100)])]);

  return (
    <svg height={height} width={width}>
      <Group top={yMargin / 2}>
        {barData.map((el, i) => {
          const letter = el.letter;
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(Number(el.frequency) * 100);
          console.log(yScale(Number(el.frequency) * 100));
          const barX = xScale(letter);
          const barY = barHeight;
          return (
            <Bar key={i}>
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={"rgba(23, 233, 217, .5)"}
            </Bar>
          );
        })}
      </Group>
    </svg>
  );
};

export default BarGraph;
