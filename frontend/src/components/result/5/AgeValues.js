import React, { useEffect, useRef } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import * as math from "mathjs";

import GroupedBarChart from "./GroupedBarChart";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { localServer } from "../../../api/http";
import {
  setMaleMean,
  setMaleStd,
  setFemaleMean,
  setFemaleStd,
  setMyAverage,
  setResultF,
  setResultM,
  // setUpDownCheckF,
  // setUpDownCheckM,
  setClickedIdx,
} from "../../../redux/result/chart5Slice";
import { gsap } from "gsap";
const api = localServer();

const AgeValues = () => {
  const dispatch = useAppDispatch();
  const valueButton = useRef([]);
  const chartContainer = useRef(null);
  const wordList = useAppSelector((state) => state.result.wordList);
  // const upDownCheckF = useAppSelector((state) => state.chart5.upDownCheckF);
  // const upDownCheckM = useAppSelector((state) => state.chart5.upDownCheckM);
  const resultF = useAppSelector((state) => state.chart5.resultF);
  const resultM = useAppSelector((state) => state.chart5.resultM);
  const maleMean = useAppSelector((state) => state.chart5.maleMean);
  const maleStd = useAppSelector((state) => state.chart5.maleStd);
  const femaleMean = useAppSelector((state) => state.chart5.femaleMean);
  const femaleStd = useAppSelector((state) => state.chart5.femaleStd);
  const myAverage = useAppSelector((state) => state.chart5.myAverage);
  const clickedIdx = useAppSelector((state) => state.chart5.clickedIdx);

  const resultId = useAppSelector((state) => state.survey.resultId);

  const onHandleMouseOver = (e) => {
    console.log(e);
    gsap.to(e.target, {
      duration: 0.2,
      backgroundColor: "#3C4048",
      borderColor: "#3C4048",
      color: "#E8DFCA",
    });
  };
  const onHandleMouseOut = (e) => {
    gsap.to(e.target, {
      duration: 0.2,
      backgroundColor: "#E8DFCA",
      borderColor: "#B2B2B2",
      color: "#3C4048",
    });
  };

  useEffect(() => {
    console.log(valueButton.current[clickedIdx]);
    gsap.to(valueButton.current[clickedIdx], {
      backgroundColor: "#3C4048",
      borderColor: "#3C4048",
      color: "#E8DFCA",
    });
  }, [clickedIdx]);

  const changeData = async (index) => {
    // 남자 데이터 받아오기
    await api
      .get(`/result/static?keywordId=${index}&gender=M`)
      .then(function (response) {
        dispatch(setMaleMean(response.data.mean));
        dispatch(setMaleStd(response.data.std));
      });
    // 여자 데이터 받아오기.
    await api
      .get(`/result/static?keywordId=${index}&gender=F`)
      .then(function (response) {
        dispatch(setFemaleMean(response.data.mean));
        dispatch(setFemaleStd(response.data.std));
      });

    // 내 값 받아오기
    await api
      .get(`/result/survey/average?resultId=${resultId}&keywordId=${index}`)
      .then(function (response) {
        dispatch(setMyAverage(parseInt(response.data.average)));
      });
  };

  // useEffect(() => {
  //   const newData = [
  //     { letter: "남", frequency: maleMean },
  //     { letter: "여", frequency: femaleMean },
  //     { letter: "나", frequency: myAverage },
  //   ];
  //   dispatch(setChartData(newData));
  // }, [maleMean, femaleMean, myAverage]);

  useEffect(() => {
    standardF(femaleStd, femaleMean, myAverage);
    standardM(maleStd, maleMean, myAverage);
  }, [myAverage]);

  const standardF = async (std, mean, score) => {
    const z_score = (score - mean) / std;

    // 정규분포에서 유저 스코어의 위치 계산
    const cdf_value = (1 + math.erf(z_score / Math.sqrt(2))) / 2;

    // 퍼센타일 계산
    const percentile = cdf_value * 100;
    // 상위 50퍼 안이면 상위로 표시. 아니면 하위로 표시
    if (percentile >= 50) {
      dispatch(setResultF(`상위 ${(100 - percentile).toFixed(2)}`));
      // dispatch(setUpDownCheckF("여성 데이터 기준"));
    } else {
      dispatch(setResultF(`하위 ${percentile.toFixed(2)}`));
      // dispatch(setUpDownCheckF("여성 데이터 기준"));
    }
  };
  const standardM = async (std, mean, score) => {
    const z_score = (score - mean) / std;
    // 정규분포에서 유저 스코어의 위치 계산
    const cdf_value = (1 + math.erf(z_score / Math.sqrt(2))) / 2;

    // 퍼센타일 계산
    const percentile = cdf_value * 100;
    // 상위 50퍼 안이면 상위로 표시. 아니면 하위로 표시
    if (percentile >= 50) {
      // const result = 100 - percentile;
      dispatch(setResultM(`상위 ${(100 - percentile).toFixed(2)}`));
      // dispatch(setUpDownCheckM("남성 데이터 기준"));
    } else {
      dispatch(setResultM(`하위 ${percentile.toFixed(2)}`));
      // dispatch(setUpDownCheckM("남성 데이터 기준"));
    }
  };

  return (
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
        <Box ref={chartContainer} width={"66%"}>
          <GroupedBarChart chartContainer={chartContainer} />
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
                ref={(el) => (valueButton.current[i] = el)}
                // 여러개 빠르게 선택하면 버그 걸림
                // 시연용으로 천천히 클릭 요망
                onMouseOver={(e) => {
                  onHandleMouseOver(e);
                }}
                onMouseOut={(e) => {
                  onHandleMouseOut(e);
                }}
                fontSize={"2em"}
                fontFamily={"dodum"}
                fontWeight={"semibold"}
                color={"#3C4048"}
                className={"hoverable"}
                border={"solid 2px #B2B2B2"}
                borderRadius={"20px"}
                backgroundColor={"#E8DFCA"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                key={i}
                onClick={
                  clickedIdx === i
                    ? () => {}
                    : async () => {
                        gsap.to(valueButton.current[clickedIdx], {
                          duration: 0.2,
                          backgroundColor: "#E8DFCA",
                          borderColor: "#B2B2B2",
                          color: "#3C4048",
                        });
                        dispatch(setClickedIdx(i));
                        await changeData(i + 1);
                      }
                }
              >
                {wordList[i].keywordName}
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
      {myAverage !== 0 ? (
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
            여성 데이터 기준
            <br />
            {resultF} % 입니다.
          </Text>
          <Text>
            남성 데이터 기준
            <br />
            {resultM} % 입니다.
          </Text>
        </Box>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          fontSize={"3vw"}
          fontFamily={"dodum"}
          height={"100%"}
          textAlign={"center"}
        >
          <Text>가치관 버튼을 클릭해주세요.</Text>
        </Box>
      )}
    </Box>
  );
};

export default AgeValues;
