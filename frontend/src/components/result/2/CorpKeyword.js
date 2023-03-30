import React from "react";
import ZoomChart from "./ZoomChart";
import data from "./zoomData.json";

const CorpKeyword = () => {
  return (
    <div>
      <ZoomChart data={data} />
    </div>
  );
};

export default CorpKeyword;
