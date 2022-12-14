import React from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Line, LinePath } from "@visx/shape";
import { extent, bisector } from "d3-array";
import { LinearGradient } from "@visx/gradient";
import { GridRows, GridColumns } from "@visx/grid";
import { localPoint } from "@visx/event";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { GlyphCircle } from "@visx/glyph";
import { data } from "../utils/data";

function LineChart() {
  const height = 700;
  const width = 900;

  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const margin = { top: 40, right: 40, bottom: 40, left: 40 };

  const data1 = data.filter(function (el) {
    return el.type === "RENEWABLE";
  });

  const data2 = data.filter(function (el) {
    return el.type === "TOTAL";
  });

  const series = [data1, data2];

  const colors = ["#43b284", "#fab255"];

  const getRD = (d) => d.amount;
  const getDate = (d) => d.year;

  const formatDate = (year) => year.toString();

  const timeScale = scaleLinear({
    range: [0, width],
    domain: extent(data, getDate),
    nice: true,
  });

  const rdScale = scaleLinear({
    range: [height, 0],
    domain: extent(data, getRD),
    nice: true,
  });

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "white",
  };

  const bisectDate = bisector((d) => d.year).left;

  const getD = (year) => {
    const output = data.filter(function (el) {
      return el.year === year;
    });
    return output;
  };

  const handleTooltip = (event) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = timeScale.invert(x - margin.left); // get Date from the scale

    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;

    if (d1 && getDate(d1)) {
      d =
        x0.valueOf() - getDate(d0).valueOf() >
        getDate(d1).valueOf() - x0.valueOf()
          ? d1
          : d0;
    }
    showTooltip({
      tooltipData: getD(d.year),
      tooltipLeft: x,
      tooltipTop: rdScale(getRD(d)),
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={"#718096"}
          rx={14}
        />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={rdScale}
            width={width}
            height={height - margin.top}
            stroke="#EDF2F7"
            strokeOpacity={0.2}
          />
          <GridColumns
            scale={timeScale}
            width={width}
            height={height}
            stroke="#EDF2F7"
            strokeOpacity={0.2}
          />
          <LinearGradient
            id="area-gradient"
            from={"#43b284"}
            to={"#43b284"}
            toOpacity={0.1}
          />
          <AxisLeft
            tickTextFill={"#EDF2F7"}
            stroke={"#EDF2F7"}
            tickStroke={"#EDF2F7"}
            scale={rdScale}
            tickLabelProps={() => ({
              fill: "#EDF2F7",
              fontSize: 11,
              textAnchor: "end",
            })}
          />
          <text
            x="-125"
            y="20"
            transform="rotate(-90)"
            fontSize={12}
            fill="#EDF2F7"
          >
            R&D Spend, RDDUSD
          </text>
          <AxisBottom
            scale={timeScale}
            stroke={"#EDF2F7"}
            tickFormat={formatDate}
            tickStroke={"#EDF2F7"}
            tickTextFill={"#EDF2F7"}
            top={height}
            tickLabelProps={() => ({
              fill: "#EDF2F7",
              fontSize: 11,
              textAnchor: "middle",
            })}
          />
          {series.map((sData, i) => (
            <LinePath
              key={i}
              stroke={colors[i]}
              strokeWidth={3}
              data={sData}
              x={(d) => timeScale(getDate(d)) ?? 0}
              y={(d) => rdScale(getRD(d)) ?? 0}
            />
          ))}
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft - margin.left, y: 0 }}
                to={{ x: tooltipLeft - margin.left, y: height }}
                stroke={"#EDF2F7"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="4,2"
              />
            </g>
          )}
          {tooltipData &&
            tooltipData.map((d, i) => (
              <g key={i}>
                <GlyphCircle
                  left={tooltipLeft - margin.left}
                  top={rdScale(d.amount) + 2}
                  size={110}
                  fill={colors[i]}
                  stroke={"white"}
                  strokeWidth={2}
                />
              </g>
            ))}
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            onTouchStart={handleTooltip}
            fill={"transparent"}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>
      </svg>
      {/* render a tooltip */}
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <p>{`Total Spend: $${getRD(tooltipData[1])}`}</p>
          <p>{`Renewable Spend: $${getRD(tooltipData[0])}`}</p>
          <p>{`Year: ${getDate(tooltipData[1])}`}</p>
        </TooltipWithBounds>
      ) : null}
    </div>
  );
}

export default LineChart;
