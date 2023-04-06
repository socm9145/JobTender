import { Box, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import RecommendedCorp from "../../components/result/1/RecommendedCorp";
import CorpKeyword from "../../components/result/2/CorpKeyword";
import IdealTalent from "../../components/result/3/IdealTalent";
import GraphValues from "../../components/result/4/GraphValues";
import AgeValues from "../../components/result/5/AgeValues";

const ResultPageResultData = ({ componentName }) => {
  const chart4 = useAppSelector((state) => state.result.chart4);
  {
    /* <Text
        fontFamily={"taebaek"}
        fontSize={"2vw"}
        fontWeight={"bold"}
        marginBottom={"3%"}
      >
        ‣ {props.title}
      </Text> */
  }
  return (
    <Box
      // width={"100%"}
      // height={"100%"}
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
    >
      {(() => {
        switch (componentName) {
          case "RecommendedCorp":
            return <RecommendedCorp />;
          case "CorpKeyword":
            return <CorpKeyword />;
          case "IdealTalent":
            return <IdealTalent />;
          case "GraphValues":
            return <GraphValues />;
          case "AgeValues":
            return <AgeValues />;
          default:
            return null;
        }
      })()}
    </Box>
  );
};

export default ResultPageResultData;
