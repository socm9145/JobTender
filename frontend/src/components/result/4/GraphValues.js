import React from "react";
import BarChart4b from "./BarChart4b";
import data from "./barChart4bData.json";

const GraphValues = () => {
  return (
    <div>
      <BarChart4b data={data} />
    </div>
  );
};

export default GraphValues;
