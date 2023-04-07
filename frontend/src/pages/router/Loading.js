import { useEffect, useState } from "react";

import { resolvePath, useNavigate } from "react-router-dom";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import DescribeContainer from "../../components/keyword/DescribeContainer";
import KeywordRankContainer from "../../components/keyword/KeywordRankContainer";
import LoadingAnima from "../../components/loading/LoadingAnima";

import {
  makeResult,
  postSurvey,
  saveChooseSurvey,
} from "../../api/surveyAxios";

import { postKeyword, postKeywordPython } from "../../api/keywordAxios";
import { chart2, chart3 } from "../../api/resultAxios";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setResultId } from "../../redux/keyword/keywordSlice";
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

const Loading = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAnalysed, setIsAnalysed] = useState(false);

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

  useEffect(() => {
    async function sendKeyword() {
      const keywords = {
        keywordId1: selectedKeyword[0],
        keywordId2: selectedKeyword[1],
        keywordId3: selectedKeyword[2],
      };
      await postKeyword(
        userid,
        keywords,
        (data) => {
          dispatch(setResultId(data.data[0].resultId));
          postKeywordPython(
            data.data[0].resultId,
            (response) => {
              dispatch(setKeywordSurveyResult(response.data));
              const top3CompanyId = () => {

                let sorted = Object.entries(response.data.top).sort(
                  (a, b) => b[1] - a[1]
                );
                var topthree = [];

                for (let element of sorted) {
                  topthree.push(element[0]);
                }

                // const tmp = [];
                // for (let key in response.data.top) {
                //   tmp.push(key);
                // }
                return topthree;
              };

              let idx = 1;
              top3CompanyId().forEach(async (companyId) => {
                await chart2(
                  companyId,
                  (response) => {
                    if (idx === 1) {
                      dispatch(setChart2_1(response.data));
                    } else if (idx === 2) {
                      dispatch(setChart2_2(response.data));
                    } else if (idx === 3) {
                      dispatch(setChart2_3(response.data));
                    }
                    idx++;
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });

              chart3(
                keywords,
                (response) => {
                  dispatch(setChart3(response.data));
                },
                (err) => {
                  console.log(err);
                }
              );

              // survey 검사의 경우
              // 4번 차트,5번 차트 데이터가 리덕스에 있을 때
              if (Object.keys(chart4).length !== 0) {
                // selectedScoresRedux
                const makeResultWordSlide = async () => {
                  await makeResult(
                    userid,
                    (response) => {
                      dispatch(setResultId(response.data.resultId));
                      saveChooseSurvey(
                        selectedScoresRedux,
                        (a) => {
                          postSurvey(
                            response.data.resultId,
                            (data) => {
                              dispatch(setKeywordSurveyResult(data.data));
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
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                };
                makeResultWordSlide();
              }

              setIsAnalysed(true);
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
    sendKeyword();
  }, []);

  useEffect(() => {
    if (chart2Tmp.length === 3) {
      dispatch(setChart2(makeChart2Data(chart2Tmp)));
    }
  }, [chart2Tmp]);

  return (
    <Box
      position={"relative"}
      id={"canvas-container"}
      width="100vw"
      height="100vh"
      overflow={"hidden"}
    >
      <LoadingAnima />

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

export default Loading;
