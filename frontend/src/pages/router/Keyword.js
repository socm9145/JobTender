import { useEffect, useLayoutEffect, useRef } from "react";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import DescribeContainer from "../../components/keyword/DescribeContainer";
import KeywordRankContainer from "../../components/keyword/KeywordRankContainer";

import { postKeyword, postKeywordPython } from "../../api/keywordAxios";
import { keyword } from "../../api/mypageAxios";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { setWordList, setResultId } from "../../redux/keyword/keywordSlice";
import { setKeywordSurveyResult } from "../../redux/result/resultSlice";
import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const Keyword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const leftKeywords = useRef(null);
  const describe = useRef(null);
  const rightKeywords = useRef(null);
  const rankContainer = useRef(null);
  const submitButtonBox = useRef(null);

  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );
  const userid = useAppSelector((state) => state.user.userId);

  // 유저가 키워드를 선택하고 제출을 하면 시작하는 함수
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
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const wordList = useAppSelector((state) => state.keyword.wordList);
  const keywordName = [];
  const keywordId = [];

  wordList.map((data) => {
    keywordName.push(data.keywordName);
    keywordId.push(data.keywordId);
  });

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.to(submitButtonBox.current, {
      duration: 0,
      x: "100%",
    }).from(
      rankContainer.current,
      {
        duration: 1,
        opacity: 0,
        y: "100%",
        ease: "sine.out",
      },
      1.7
    );

    async function getKeyword() {
      await keyword(
        (data) => {
          console.log(data);
          dispatch(setWordList(data.data));
        },
        (error) => {
          console.log(error);
        }
      );
    }
    getKeyword();
  }, []);

  useEffect(() => {
    if (!selectedKeyword.includes(null)) {
      gsap.to(submitButtonBox.current, {
        duration: 1,
        opacity: 1,
        x: "0",
        ease: "sine.out",
      });
    } else {
      gsap.to(submitButtonBox.current, {
        duration: 1,
        opacity: 1,
        x: "100%",
        ease: "sine.out",
      });
    }
  }, [selectedKeyword]);

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"end"}
      backgroundImage={"https://picsum.photos/1600/800"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"88vh"}
      >
        <Box width={"100vw"} height={"100%"} paddingY={"1rem"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100vw"}
            height={"100%"}
            overflow={"hidden"}
          >
            <Box ref={leftKeywords} width={"25vw"}>
              <LeftKeywordsContainer
                keywordName={keywordName.slice(0, 5)}
                keywordId={keywordId.slice(0, 5)}
              />
            </Box>

            <Box
              ref={describe}
              width={"40vw"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <DescribeContainer />
            </Box>

            <Box ref={rightKeywords} width={"25vw"}>
              <RightKeywordsContainer
                keywordName={keywordName.slice(5, 11)}
                keywordId={keywordId.slice(5, 11)}
              />
            </Box>
          </Box>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
          width={"100vw"}
          height={"30%"}
        >
          <Box
            ref={rankContainer}
            width={"60%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <KeywordRankContainer />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            width={"20%"}
            height={"100%"}
          >
            <Box
              ref={submitButtonBox}
              className={"hoverable"}
              height={"40%"}
              width={"60%"}
              marginLeft={"40%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={"white"}
            >
              <Text
                className={"hoverable"}
                fontSize={"2em"}
                onClick={sendKeyword}
              >
                제출
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Keyword;
