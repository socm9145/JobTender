import { useEffect, useState } from "react";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import DescribeContainer from "../../components/keyword/DescribeContainer";
import KeywordRankContainer from "../../components/keyword/KeywordRankContainer";

import {
  makeResult,
  postSurvey,
  saveChooseSurvey,
} from "../../api/surveyAxios";

import { postKeyword, postKeywordPython } from "../../api/keywordAxios";
import { chart2, chart3 } from "../../api/resultAxios";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { resolvePath, useNavigate } from "react-router-dom";
import { setResultId } from "../../redux/survey/surveySlice";
import {
  setKeywordSurveyResult,
  setChart2,
  setChart2_1,
  setChart2_2,
  setChart2_3,
  setChart3,
} from "../../redux/result/resultSlice";

import "../../styles/loading/Loading.css";
import { Box, Text } from "@chakra-ui/react";

const LoadingSurvey = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAnalysed, setIsAnalysed] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState("0");
  const [canvasHeight, setCanvasHeight] = useState("0");
  const [chart2Tmp, setChart2Tmp] = useState([]);

  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );
  const selectedScoresRedux = useAppSelector(
    (state) => state.survey.selectedScoresRedux
  );
  const chart4 = useAppSelector((state) => state.result.chart4);
  // const top3CompanyId = useAppSelector((state) => state.result.top3CompanyId);
  // const userid = useAppSelector((state) => state.user.userId);
  const userid = sessionStorage.getItem("userId");

  const makeChart2Data = (childrenList) => {
    const res = {
      name: "chart2",
      children: childrenList,
    };
    return res;
  };

  const selectedScores = useAppSelector(
    (state) => state.survey.selectedScoresRaw
  );
  const surveys = useAppSelector((state) => state.survey.selectedScoresRedux);
  const resultId = useAppSelector((state) => state.survey.resultId);

  function reformSurveyData(resultId) {
    let list = [];
    console.log(222);
    console.log(selectedScores);
    for (let key in selectedScores) {
      console.log(123);
      let data = {
        resultId: resultId,
        surveyId: key,
        score: selectedScores[key],
      };
      console.log(data);
      list.push(data);
    }
    console.log(list);
    return JSON.stringify(list);
  }

  useEffect(() => {
    async function sendSurvey() {
      // 자바 서버에 결과지 고유번호 생성
      await makeResult(
        userid,
        (response) => {
          console.log(response.data.resultId);
          dispatch(setResultId(response.data.resultId));
          saveChooseSurvey(
            reformSurveyData(response.data.resultId),
            (a) => {
              postSurvey(
                response.data.resultId,
                (response) => {
                  dispatch(setKeywordSurveyResult(response.data));
                },
                (error) => {
                  console.log(error);
                }
              );
              console.log(a);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
    sendSurvey();
  }, []);

  useEffect(() => {
    if (chart2Tmp.length === 3) {
      dispatch(setChart2(makeChart2Data(chart2Tmp)));
    }
  }, [chart2Tmp]);

  useEffect(() => {
    if (surveys.length !== 0) {
      saveChooseSurvey(
        surveys,
        (a) => {
          postSurvey(
            resultId,
            (response) => {
              dispatch(setKeywordSurveyResult(response.data));
            },
            (error) => {
              console.log(error);
            }
          );
          console.log(a);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [surveys]);

  return (
    <Box
      position={"relative"}
      id={"canvas-container"}
      width="100vw"
      height="100vh"
      overflow={"hidden"}
    >
      {/* <canvas width={canvasWidth} height={canvasHeight} id="fishtank" /> */}
      <Box
        // 분석 상태에 따라서 커서 크기 조절
        className={isAnalysed ? "hoverable" : "none"}
        position={"absolute"}
        bottom={"0"}
        right={"0"}
        width={"20rem"}
        height={"7rem"}
        backgroundColor={"rgba(0,0,0,0.8)"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => {
          //분석 상태에 따라서 navigate 활성/비활성
          if (isAnalysed) {
            navigate("/result");
          } else {
            return;
          }
        }}
      >
        {/* 분석 상태에 따라서 커서 문구 수정 */}
        {isAnalysed ? (
          <Text
            className={isAnalysed ? "hoverable" : "none"}
            fontSize={"3rem"}
            fontFamily={"dodum"}
            color={"white"}
          >
            결과 보기
          </Text>
        ) : (
          <Text fontSize={"3rem"} fontFamily={"dodum"} color={"white"}>
            - 분석 중 -
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default LoadingSurvey;
