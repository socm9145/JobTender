import React from "react";
import BarChart from "./chart/BarChart";

const GraphValues = () => {
  const data = [
    { name: "A", value: 0.08167 },
    { name: "B", value: 0.01492 },
    { name: "C", value: 0.02782 },
    // ... (기타 데이터 포인트)
  ];
  return (
    <div>
      <BarChart data={data} />
    </div>
  );
};

export default GraphValues;
