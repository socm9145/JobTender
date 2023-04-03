import { Box, Text } from "@chakra-ui/react";

import RecommendedCorp from "../../components/result/1/RecommendedCorp";
import CorpKeyword from "../../components/result/2/CorpKeyword";
import IdealTalent from "../../components/result/3/IdealTalent";
import GraphValues from "../../components/result/4/GraphValues";
import AgeValues from "../../components/result/5/AgeValues";

const ResultPageResultData = ({ componentName }) => {
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
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
    >
      {(() => {
        switch (componentName) {
          case "AgeValues":
            return <AgeValues />;
          case "CorpKeyword":
            return <CorpKeyword />;
          case "GraphValues":
            return <GraphValues />;
          case "IdealTalent":
            return <IdealTalent />;
          case "RecommendedCorp":
            return <RecommendedCorp />;
          default:
            return null;
        }
      })()}
    </Box>
  );
};

export default ResultPageResultData;
