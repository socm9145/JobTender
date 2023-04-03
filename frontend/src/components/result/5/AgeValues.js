import React, { useState } from "react";

import * as math from "mathjs";

import GroupedBarChart from "./GroupedBarChart";
import dataSets from "./barData.json";

const AgeValues = () => {
  const [chartData, setChartData] = useState(dataSets[0]);
  const averageData = dataSets[10];

  const [result, setResult] = useState(0);
  const [upDownCheck, setUpDownCheck] = useState("");
  const changeData = (index) => {
    setChartData(dataSets[index]);
  };

  let a = "adfsdf";
  const phozun = (i) => {
    const mean = averageData[i].mean;
    const std_dev = averageData[i].std_dev;
    const score = averageData[i].score;
    const z_score = (score - mean) / std_dev;

    // 정규분포에서 유저 스코어의 위치 계산
    const cdf_value = (1 + math.erf(z_score / Math.sqrt(2))) / 2;

    // 퍼센타일 계산
    const percentile = cdf_value * 100;
    console.log(percentile);
    // 상위 50퍼 안이면 상위로 표시. 아니면 하위로 표시
    if (percentile >= 50) {
      // const result = 100 - percentile;
      setResult((100 - percentile).toFixed(2));
      setUpDownCheck("상위");
      console.log(`상위 ${result}% 입니다`);
    } else {
      console.log(`하위 ${percentile}% 입니다`);
      setResult(percentile.toFixed(2));
      setUpDownCheck("하위");
    }
  };

  console.log(chartData);
  return (
    <div>
      <GroupedBarChart data={chartData} />
      <div>
        {Array.from({ length: 10 }, (_, i) => (
          <div>
            <button
              key={i}
              onClick={() => {
                changeData(i);
                phozun(i);
              }}
            >
              {i + 1}번
            </button>
          </div>
        ))}
        <p>
          {upDownCheck}
          {result} % 입니다.
        </p>
      </div>
    </div>
  );
};

export default AgeValues;
