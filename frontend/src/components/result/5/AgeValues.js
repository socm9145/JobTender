import * as d3 from "d3";
import GroupedBarChart from "./GroupedBarChart";
const AgeValues = () => {
  const ages = [
    "<10",
    "10-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "≥80",
  ];

  const stateages = [
    { state: "AL", age: "<10", population: 598478 },
    { state: "AL", age: "10-19", population: 638789 },
    { state: "AL", age: "20-29", population: 661666 },
    { state: "AL", age: "30-39", population: 603013 },
    { state: "AL", age: "40-49", population: 625599 },
    { state: "AL", age: "50-59", population: 673864 },
    { state: "AL", age: "60-69", population: 548376 },
    { state: "AL", age: "70-79", population: 316598 },
    { state: "AL", age: "≥80", population: 174781 },
  ];

  const chartProps = {
    data: stateages,
    x: (d) => d.state,
    y: (d) => d.population / 1e6,
    z: (d) => d.age,
    xDomain: d3
      .groupSort(
        stateages,
        (D) => d3.sum(D, (d) => -d.population),
        (d) => d.state
      )
      .slice(0, 6),
    yLabel: "↑ Population (millions)",
    zDomain: ages,
    colors: d3.schemeSpectral[ages.length],
    width: 640,
    height: 500,
  };
  return (
    <div>
      <div>
        <h1>Grouped Bar Chart - Population by Age</h1>
        {/* <GroupedBarChart {...chartProps} /> */}
      </div>
    </div>
  );
};

export default AgeValues;
