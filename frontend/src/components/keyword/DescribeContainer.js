import { useLayoutEffect, useEffect, useRef } from "react";

import Describe from "./Describe";

import { Box, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const DescribeContainer = () => {
  const guide = useRef();
  const clickedRank = useAppSelector((state) => state.keyword.clickedRank);
  const clickedKeyword = useAppSelector(
    (state) => state.keyword.clickedKeyword
  );
  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );

  useEffect(() => {
    gsap.from(guide.current, { duration: 0.5, y: "100%", ease: "sine.out" });
  }, [selectedKeyword, clickedKeyword, clickedRank]);

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
            <Box height={"fit-content"} overflow={"hidden"} fontSize={"1.5rem"}>
              <Text ref={guide}>
                {`${clickedRank + 1} 순위에 담을 키워드를 선택해 주세요`}
              </Text>
            </Box>
          ) : (
            <Box height={"fit-content"} overflow={"hidden"} fontSize={"1.5rem"}>
              <Box ref={guide}>
                <Text>키워드를 클릭하면</Text>
                <Text>해당 키워드의 설명을 볼 수 있습니다</Text>
              </Box>
            </Box>
          )
        ) : (
          <Describe />
        )
      ) : (
        <Box>
          <Text ref={guide}>키워드 선택 완료</Text>
        </Box>
      )}
    </Box>
  );
};

export default DescribeContainer;
