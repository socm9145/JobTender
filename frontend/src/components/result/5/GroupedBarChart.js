import React, { useEffect, useRef } from "react";

import { Box } from "@chakra-ui/react";
import * as d3 from "d3";

import { useAppSelector } from "../../../hooks/hooks";

// const GroupedBarChart = ({ data }) => {
const GroupedBarChart = ({ chartContainer }) => {
  const chartRef = useRef(null);
  const maleMean = useAppSelector((state) => state.chart5.maleMean);
  const femaleMean = useAppSelector((state) => state.chart5.femaleMean);
  const myAverage = useAppSelector((state) => state.chart5.myAverage);
  const data = [
    { letter: "남", frequency: maleMean },
    { letter: "여", frequency: femaleMean },
    { letter: "나", frequency: myAverage },
  ];
  useEffect(() => {
    if (chartRef.current) {
      drawBarChart();
    }
  }, [data]);

  const drawBarChart = () => {
    const chartContainerWidth = chartContainer.current
      ? chartContainer.current.offsetWidth
      : 640;
    // 기존 SVG 요소 삭제
    if (chartRef.current.childNodes.length > 0) {
      chartRef.current.removeChild(chartRef.current.childNodes[0]);
    }

    const color = (i) => {
      const d = data[i];
      if (!d) return "gray";
      if (d.letter == "남") return "#3F497F";
      if (d.letter == "여") return "#F7C04A";
      return "#539165"; // "나"에 대한 색상
    };

    const chart = BarChart(data, {
      x: (d) => d.letter,
      y: (d) => d.frequency,
      xDomain: data.map((d) => d.letter),
      yDomain: [0, 9],
      yFormat: "",
      yLabel: "가치관 점수",
      xLabel: "분류",
      // width: 640,
      width: chartContainerWidth,
      height: 500,
      color,
    });
    chartRef.current.appendChild(chart);
    return chart;
  };

  function BarChart(
    data,
    {
      x = (d, i) => i,
      y = (d) => d,
      title,
      marginTop = 20,
      marginRight = 0,
      marginBottom = 30,
      marginLeft = 40,
      width = 640,
      height = 400,
      xDomain,
      xRange = [marginLeft, width - marginRight],
      yType = d3.scaleLinear,
      yDomain,
      yRange = [height - marginBottom, marginTop],
      xPadding = 0.1,
      yFormat,
      yLabel,
      color,
    } = {}
  ) {
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);

    const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = (i) => `${X[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, (d) => d);
      const T = title;
      title = (i) => T(O[i], i, data);
    }

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])

      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel)
      );

    const bar = svg
      .append("g")
      .selectAll("rect")
      .data(I)
      .join("rect")
      .attr("fill", (i) => color(i))
      .attr("x", (i) => xScale(X[i]))
      .attr("y", (i) => yScale(Y[i]))
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      .attr("width", xScale.bandwidth());

    if (title) bar.append("title").text(title);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    return svg.node();
  }

  return <Box width={"100%"} ref={chartRef}></Box>;
};

export default GroupedBarChart;
