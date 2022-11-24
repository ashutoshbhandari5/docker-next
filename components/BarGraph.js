import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import * as d3 from "d3";
import { scaleBand, scaleLinear } from "@visx/scale";

const BarGraph = ({ data, width, height }) => {
  const barData = data.slice(5);
  const verticalMargin = 120;

  const xMax = width;
  const yMax = height - verticalMargin;

  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .range([0, xMax])
        .domain(barData.map((el) => el.letter))
        .padding(0.4),
    [xMax, barData]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .range([yMax, 0])
        .domain([
          0,
          Math.max(...barData.map((el) => Number(el.frequency) * 100)),
        ]),
    [yMax, barData]
  );

  return (
    <svg width={width} height={height}>
      <rect
        width={width}
        height={height}
        fill={d3.color("steelblue")}
        rx={14}
      />
      <Group top={verticalMargin / 2} left={30}>
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
        <AxisBottom
          numTicks={barData.length}
          top={yMax}
          scale={xScale}
          tickLabelProps={() => ({
            fill: d3.color("#f3f3f3"),
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
        <AxisLeft
          scale={yScale.nice()}
          numTicks={10}
          top={0}
          tickLabelProps={(e) => ({
            fill: d3.color("#f3f3f3"),
            fontSize: 10,
            textAnchor: "end",
            x: -12,
            y: (yScale(e) ?? 0) + 3,
          })}
        />
      </Group>
    </svg>
  );
};

export default BarGraph;
