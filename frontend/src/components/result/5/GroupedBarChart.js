import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
// import { Legend, Swatches } from "@d3/color-legend";

const GroupedBarChart = (props) => {
  const chartRef = useRef();

  useEffect(() => {
    const {
      data,
      x = (d, i) => i,
      y = (d) => d,
      z = () => 1,
      title,
      marginTop = 30,
      marginRight = 0,
      marginBottom = 30,
      marginLeft = 40,
      width = 640,
      height = 400,
      xDomain,
      xRange = [marginLeft, width - marginRight],
      xPadding = 0.1,
      yType = d3.scaleLinear,
      yDomain,
      yRange = [height - marginBottom, marginTop],
      zDomain,
      zPadding = 0.05,
      yFormat,
      yLabel,
      colors = d3.schemeTableau10,
    } = props;

    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);

    // Compute default domains, and unique the x- and z-domains.
    if (xDomain === undefined) xDomain = X;
    // if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    if (zDomain === undefined) zDomain = Z;
    // xDomain = new d3.InternSet(xDomain);
    // zDomain = new d3.InternSet(zDomain);

    // Omit any data not present in both the x- and z-domain.
    const I = d3
      .range(X.length)
      .filter((i) => xDomain.has(X[i]) && zDomain.has(Z[i]));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
    const xzScale = d3
      .scaleBand(zDomain, [0, xScale.bandwidth()])
      .padding(zPadding);
    const yScale = yType(yDomain, yRange);
    const zScale = d3.scaleOrdinal(zDomain, colors);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat);
      title = (i) => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
    } else {
      const O = d3.map(data, (d) => d);
      const T = title;
      title = (i) => T(O[i], i, data);
    }

    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    svg
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
      .attr("x", (i) => xScale(X[i]) + xzScale(Z[i]))
      .attr("y", (i) => yScale(Y[i]))
      .attr("width", xzScale.bandwidth())
      .attr("height", (i) => yScale(0) - yScale(Y[i]))
      .attr("fill", (i) => zScale(Z[i]));

    if (title) bar.append("title").text(title);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);
  }, [props]);

  return <svg ref={chartRef}></svg>;
};

export default GroupedBarChart;
