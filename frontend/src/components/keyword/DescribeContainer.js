import Describe from "./Describe";

import { Box } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/hooks";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const DescribeContainer = () => {
  const keywordDiscribe = [
    "안정 설명",
    "질서 설명",
    "관습 설명",
    "공헌 설명",
    "박애 설명",
    "자율 설명",
    "도전 설명",
    "재미 설명",
    "성취 설명",
    "권력 설명",
  ];
  const wordList = useAppSelector((state) => state.keyword.wordList);
  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const clickedKeyword = useAppSelector(
    (state) => state.keyword.clickedKeyword
  );
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  return (
    <Box
      id={"describe-container"}
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"90%"}
      justifyContent={"center"}
      textAlign={"center"}
    >
      {selectedKeyword.includes(null) ? (
        clickedKeyword === null ? (
          clickedRank !== null ? (
            <Describe
              title={"안내"}
              content={`${clickedRank + 1} 순위에 담을 키워드를 선택해 주세요`}
            />
          ) : (
            <Describe
              title={"안내"}
              content={"키워드를 클릭하면 설명을 볼 수 있습니다"}
            />
          )
        ) : (
          <Describe
            title={wordList[clickedKeyword]}
            content={keywordDiscribe[clickedKeyword]}
          />
        )
      ) : (
        <Describe title={"안내"} content={"키워드 선택이 완료되었습니다"} />
      )}
    </Box>
  );
};

export default DescribeContainer;
