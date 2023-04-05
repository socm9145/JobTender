import { Box, Text } from "@chakra-ui/react";

import RecommendedCorp from "../../components/result/1/RecommendedCorp";
import CorpKeyword from "../../components/result/2/CorpKeyword";
import IdealTalent from "../../components/result/3/IdealTalent";
import GraphValues from "../../components/result/4/GraphValues";
import AgeValues from "../../components/result/5/AgeValues";

const ResultPageResultData = (props) => {
  return (
    <Box marginBottom={"20%"} width={"100%"}>
      <Text fontFamily={"taebaek"} fontWeight={"bold"} marginBottom={"3%"}>
        ‣ {props.title}
      </Text>
      <Box display={"flex"} width={"100%"} justifyContent={"center"}>
        {/* <Box width={"100em"} height={"100em"}> */}
        {(() => {
          switch (props.componentName) {
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
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default ResultPageResultData;
