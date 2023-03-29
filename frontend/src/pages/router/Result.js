import { Box, Text } from "@chakra-ui/react";

import AgeValues from "../../components/result/AgeValues";
import CorpKeyword from "../../components/result/CorpKeyword";
import GraphValues from "../../components/result/GraphValues";
import IdealTalent from "../../components/result/IdealTalent";
import RecommendedCorp from "../../components/result/RecommendedCorp";

const Result = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      paddingX={"15%"}
      marginTop={"48px"}
    >
      {/*    이름 */}
      <Box>
        <Text>유정훈 님의 결과입니다.</Text>
      </Box>
      {/* 결과 */}
      <Box
        height={"85%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        {/* 키워드 */}

        {/* 기업 추천 1,2,3위 */}
        <Box>
          <RecommendedCorp />
        </Box>
        {/* 기업 키워드 */}
        <Box>
          <CorpKeyword />
        </Box>
        {/* 관련 인재상 키워드 */}
        <Box>
          <IdealTalent />
        </Box>

        {/* 설문 */}
        {/* 가치관 별 막대 그래프 */}
        <Box>
          <GraphValues />
        </Box>
        {/* 나이대 별 가치관 */}
        <Box>
          <AgeValues />
        </Box>
      </Box>
    </Box>
  );
};

export default Result;
