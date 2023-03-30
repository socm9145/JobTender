import React from "react";
import BarChart4b from "./BarChart4b";
import data from "./barChart4bData.json";

const GraphValues = () => {
  return (
    <div>
      기업 키워드
      <BarChart4b data={data} />
    </div>
  );
};

export default GraphValues;
