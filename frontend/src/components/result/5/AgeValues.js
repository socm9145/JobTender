import React, { useState } from "react";
import axios from "axios";
import * as math from "mathjs";

import GroupedBarChart from "./GroupedBarChart";
import dataSets from "./barData.json";

import { localServer } from "../../../api/http";

const api = localServer();

const AgeValues = () => {
  // 차트데이터
  const dummyData = [
    { letter: "남", frequency: 0 },
    { letter: "여", frequency: 0 },
    { letter: "나", frequency: 0 },
  ];
  const [chartData, setChartData] = useState(dummyData);
  const [upDownCheckF, setUpDownCheckF] = useState("");
  const [upDownCheckM, setUpDownCheckM] = useState("");
  const [resultF, setResultF] = useState(0);
  const [resultM, setResultM] = useState(0);

  const [maleMean, setMaleMean] = useState(0);
  const [maleStd, setMaleStd] = useState(0);
  const [femaleMean, setFemaleMean] = useState(0);
  const [femaleStd, setFemaleStd] = useState(0);
  const [myAverage, setMyAverage] = useState(5);

  const changeData = (index) => {
    // 남자 데이터 받아오기
    api
      .get(`/result/static?keywordId=${index}&gender=M`)
      .then(function (response) {
        // console.log(response.data);
        // console.log(response.data.mean);
        setMaleMean(response.data.mean);
        setMaleStd(response.data.std);
      });
    // 여자 데이터 받아오기.
    api
      .get(`/result/static?keywordId=${index}&gender=F`)
      .then(function (response) {
        // console.log(response.data);
        // console.log(response.data.mean);
        setFemaleMean(response.data.mean);
        setFemaleStd(response.data.std);
      });

    // 내 값 받아오기
    api
      .get(
        // `/result/survey/average?resultId=${리절트아이디}&keyworldId=${index}`
        `/result/survey/average?resultId=1&keyworldId=${index}`
      )
      .then(function (response) {
        setMyAverage(parseInt(response.data.average));
      });

    const newData = [
      { letter: "남", frequency: maleMean },
      { letter: "여", frequency: femaleMean },
      { letter: "나", frequency: myAverage },
    ];

    setChartData(newData);
  };

  const standardF = (i, std, mean, score) => {
    const z_score = (score - mean) / std;

    // 정규분포에서 유저 스코어의 위치 계산
    const cdf_value = (1 + math.erf(z_score / Math.sqrt(2))) / 2;

    // 퍼센타일 계산
    const percentile = cdf_value * 100;
    // 상위 50퍼 안이면 상위로 표시. 아니면 하위로 표시
    if (percentile >= 50) {
      // const result = 100 - percentile;
      setResultF((100 - percentile).toFixed(2));
      setUpDownCheckF("여성 데이터 기준 상위");
    } else {
      setResultF(percentile.toFixed(2));
      setUpDownCheckF("여성 데이터 기준 하위");
    }
  };
  const standardM = (i, std, mean, score) => {
    const z_score = (score - mean) / std;
    console.log(std, mean, score);
    // 정규분포에서 유저 스코어의 위치 계산
    const cdf_value = (1 + math.erf(z_score / Math.sqrt(2))) / 2;

    // 퍼센타일 계산
    const percentile = cdf_value * 100;
    // 상위 50퍼 안이면 상위로 표시. 아니면 하위로 표시
    if (percentile >= 50) {
      // const result = 100 - percentile;
      setResultM((100 - percentile).toFixed(2));
      setUpDownCheckM("남성 데이터 기준 상위");
    } else {
      setResultM(percentile.toFixed(2));
      setUpDownCheckM("남성 데이터 기준 하위");
    }
  };

  console.log(upDownCheckF);
  console.log(upDownCheckM);
  console.log(resultM);
  console.log(resultF);

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
                standardF(i, femaleStd, femaleMean, myAverage);
                standardM(i, maleStd, maleMean, myAverage);
              }}
            >
              {i + 1}번
            </button>
          </div>
        ))}
        <p>
          {upDownCheckF}
          {resultF} % 입니다.
          {upDownCheckM}
          {resultM} % 입니다.
        </p>
      </div>
    </div>
  );
};

export default AgeValues;
