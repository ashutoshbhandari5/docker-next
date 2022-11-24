import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import * as d3 from "d3";
import { scaleBand, scaleLinear } from "@visx/scale";

const BarGraph = ({ data, width, height }) => {
  const barData = data.slice(5);
  const verticalMargin = 120;

  const xMax = width;
  const yMax = height - verticalMargin;

  const xScale = d3
    .scaleBand()
    .range([0, xMax])
    .domain(barData.map((el) => el.letter))
    .padding(0.4);

  const yScale = scaleLinear()
    .range([yMax, 0])
    .domain([0, Math.max(...barData.map((el) => Number(el.frequency) * 100))]);

  return (
    <svg width={width} height={height}>
      <rect
        width={width}
        height={height}
        fill={d3.color("steelblue")}
        rx={14}
      />
      <Group top={verticalMargin / 2}>
        {barData.map((el, i) => {
          const letter = el.letter;
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(Number(el.frequency) * 100);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={i}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={d3.color("#f7fbff")}
            />
          );
        })}
      </Group>
    </svg>
  );
};

export default BarGraph;
