import { Box, Text } from "@chakra-ui/react";
import { useLayoutEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Describe = () => {
  const keywordDiscribe = [
    "안정",
    "질서",
    "관습",
    "공헌",
    "박애",
    "자율",
    "도전",
    "재미",
    "성취",
    "권력",
  ];

  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const clickedKeyword = useAppSelector(
    (state) => state.keyword.clickedKeyword
  );
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  const selectedDescribe = () => {
    if (selectedKeyword.includes(null)) {
      if (clickedKeyword === null) {
        if (clickedRank !== null) {
          return "순위에 담을 키워드를 선택해 주세요";
        } else {
          return "키워드를 클릭하면 해당 키워드의 설명을 볼 수 있습니다.";
        }
      } else {
        return keywordDiscribe[clickedKeyword];
      }
    } else {
      return "키워드 선택 완료";
    }
  };

  return <Box> {selectedDescribe()}</Box>;
};

export default Describe;
