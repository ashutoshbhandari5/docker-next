import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";

const BarGraph = ({
  barData,
  axisLeft,
  axisBottom,
  width,
  height,
  buildXScale,
  buildYScale,
  xItem,
  yItem,
  colors,
}) => {
  const verticalMargin = 120;
  const marginLeft = 30;
  const { leftScale, leftNumTicks, leftTop, leftTickLabelProps } = axisLeft;
  const { bottomNumTicks, bottomTickLabelProps } = axisBottom;

  const xMax = width - marginLeft;
  const yMax = height - verticalMargin;

  const xScale = buildXScale(xMax);
  const yScale = buildYScale(yMax);

  return (
    <svg width={width} height={height}>
      <rect
        width={width}
        height={height}
        fill={colors.backgroundColor}
        rx={14}
      />
      <Group top={verticalMargin / 2} left={marginLeft}>
        {barData.map((el, i) => {
          const item = xItem(el);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(yItem(el));
          const barX = xScale(item);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={i}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={colors.barColor}
            />
          );
        })}
        <AxisBottom
          numTicks={bottomNumTicks}
          top={yMax}
          scale={xScale}
          tickLabelProps={() => bottomTickLabelProps}
        />
        <AxisLeft
          scale={leftScale(yScale)}
          numTicks={leftNumTicks}
          top={leftTop}
          tickLabelProps={(e) => leftTickLabelProps(yScale(e))}
        />
      </Group>
    </svg>
  );
};

export default BarGraph;
