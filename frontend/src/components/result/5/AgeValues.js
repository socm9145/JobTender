import React, { useRef, useState } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import * as math from "mathjs";

import GroupedBarChart from "./GroupedBarChart";
import dataSets from "./barData.json";

import { localServer } from "../../../api/http";

const api = localServer();

const AgeValues = () => {
  const chartContainer = useRef(null);

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
      setResultF(`상위 ${(100 - percentile).toFixed(2)}`);
      setUpDownCheckF("여성 데이터 기준");
    } else {
      setResultF(`하위 ${percentile.toFixed(2)}`);
      setUpDownCheckF("여성 데이터 기준");
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
      setResultM(`상위 ${(100 - percentile).toFixed(2)}`);
      setUpDownCheckM("남성 데이터 기준");
    } else {
      setResultM(`하위 ${percentile.toFixed(2)}`);
      setUpDownCheckM("남성 데이터 기준");
    }
  };

  console.log(upDownCheckF);
  console.log(upDownCheckM);
  console.log(resultM);
  console.log(resultF);

  return (
    // <Box
    //   position={"relative"}
    //   display={"flex"}
    //   flexDirection={"column"}
    //   alignItems={"center"}
    //   justifyContent={"center"}
    //   width={"100%"}
    // >
    <Box
      zIndex={"1"}
      position={"absolute"}
      top={"10%"}
      right={"1vw"}
      width={"90%"}
      height={"70vh"}
      padding={"2vw 3vw 0 3vw"}
      backgroundColor={"rgba(255,255,255,0.9)"}
      borderRadius={"30px"}
      boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.3)"}
      display="flex"
      flexDirection={"column"}
    >
      <Box display="flex">
        <Box width={"66%"}>
          <GroupedBarChart data={chartData} />
        </Box>
        <Box
          flexGrow={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"1vw 0 1vw 2vw"}
        >
          <Grid
            width={"100%"}
            height={"100%"}
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <Box
                border={"solid 1px black"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                key={i}
                onClick={() => {
                  changeData(i);
                  standardF(i, femaleStd, femaleMean, myAverage);
                  standardM(i, maleStd, maleMean, myAverage);
                }}
              >
                {i + 1}번
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        fontSize={"2vw"}
        fontFamily={"dodum"}
        height={"100%"}
        textAlign={"center"}
      >
        <Text>
          {upDownCheckF}
          <br />
          {resultF} % 입니다.
        </Text>
        <Text>
          {upDownCheckM}
          <br />
          {resultM} % 입니다.
        </Text>
      </Box>
    </Box>
    // </Box>
  );
};

export default AgeValues;
