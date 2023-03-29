import React from "react";
import Zoomable from "./chart/ZoomChart";
import data from "./data.json";

const CorpKeyword = () => {
  return (
    <div>
      기업키워드
      <Zoomable data={data} />
    </div>
  );
};

export default CorpKeyword;
