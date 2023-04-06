import Describe from "./Describe";

import { Box } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/hooks";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const DescribeContainer = () => {
  const keywordDiscribe = [
    "사회, 본인, 그리고 본인과 동일시하는 사람들의 안전, 조화, 안정을 중요시하는 가치",
    "사회적 기대와 규범을 위반하고 타인들에게 해를 끼칠 수 있는 행위, 성향, 및 충동의 자제를 중요시 여기는 가치",
    "전통문화 또는 종교가 제시하는 관습 및 아이디어의 수락, 공경, 그리고 이행을 중시하는 가치",
    "가까운 사람들의 행복 보존과 향상을 중요시하는 가치",
    "인류의 행복과 자연과의 조화에 대한 바른 이해, 인식, 포용, 보호를 중요하게 보는 가치",
    "자립적 사고와 행위를 중요시 여기는 가치",
    // 현재 재미 => 도전
    "흥분, 신기함, 도전을 중요하게 보는 가치",
    // 현재 쾌락 => 재미
    "자신을 위한 즐거움과 감각적 만족을 중요하게 보는 가치",
    "사회기준에 따라 드러나는 유능함과 개인적 성공을 중요시하는 가치",
    "사회적 지위와 위신, 통제력, 또는 사람과 자원에 미치는 지배력을 중시하는 가치",
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
            title={wordList[clickedKeyword - 1].keywordName}
            content={keywordDiscribe[clickedKeyword - 1]}
          />
        )
      ) : (
        <Describe title={"안내"} content={"키워드 선택이 완료되었습니다"} />
      )}
    </Box>
  );
};

export default DescribeContainer;
