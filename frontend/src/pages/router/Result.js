import { Box, Text, Button } from "@chakra-ui/react";

import AgeValues from "../../components/result/AgeValues5";
import CorpKeyword from "../../components/result/CorpKeyword2";
import GraphValues from "../../components/result/GraphValues4";
import IdealTalent from "../../components/result/IdealTalent3";
import RecommendedCorp from "../../components/result/RecommendedCorp1";

import jsPDF from "jspdf";

const Result = () => {
  const saveButton = () => {
    const doc = new jsPDF();
    console.log("여기 왔니?")
    doc.fromHTML(document.getElementsByClassName("resultPageContain"), 40, 20, {
      'width': 700
    });
    doc.save("정훈님의 결과.pdf")
  }
  return (
    <Box
      className={"resultPageContain"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      paddingX={"26%"}
      marginTop={"10%"}
    >
      {/*    이름 */}
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Text fontFamily={"jungnaL"} fontSize={"2.5em"}>유정훈 님의 결과입니다.</Text>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-end"}>
          <Button onClick={saveButton}>PDF로 저장하기</Button>
        </Box>
      </Box>
      {/* 결과 */}
      <Box
        height={"85%"}
        display={"flex"}
        flexDirection={"column"}
        // justifyContent={"space-between"}
      >
        {/* 키워드 */}

        {/* 기업 추천 1,2,3위 */}
        <Box marginBottom={"5%"}>
          <Text fontFamily={"taebaek"} fontWeight={"bold"} marginBottom={"3%"}>가치관에 따른 추천 기업 Top3</Text>
          <Box
            display={"flex"}
            width={"100%"}
            justifyContent={"center"}
            // flexDirection={"column"}
          >
            {/* <RecommendedCorp /> */}
            <GraphValues />
          </Box>
        </Box>
        {/* 기업 키워드 */}
        <Box marginBottom={"5%"}>
          <Text fontFamily={"taebaek"} fontWeight={"bold"} marginBottom={"3%"}>추천 된 기업의 주요 가치관</Text>
          <Box>
            {/* <CorpKeyword /> */}
            <GraphValues />
          </Box>
        </Box>
        <Box marginBottom={"5%"}>
          {/* 관련 인재상 키워드 */}
          <Text fontFamily={"taebaek"} fontWeight={"bold"} marginBottom={"3%"}>관련 인재상 키워드</Text>
          <Box>
            {/* <IdealTalent /> */}
            <GraphValues />
          </Box>
        </Box>
        {/* 설문 */}
        {/* 가치관 별 막대 그래프 */}
        <Box marginBottom={"5%"}>
        <Text fontFamily={"taebaek"} fontWeight={"bold"} marginBottom={"3%"}>가치관 별 막대 그래프</Text>
          <Box>
            <GraphValues />
          </Box>
        </Box>
        {/* 나이대 별 가치관 */}
        <Box marginBottom={"5%"}>
          <Text fontFamily={"taebaek"} fontWeight={"bold"} marginBottom={"3%"}>나이대 별 가치관</Text>
          <Box>
            {/* <AgeValues /> */}
            <GraphValues />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Result;
