import { Box, Text } from '@chakra-ui/react'

import AgeValues from "../../components/result/AgeValues5";
import CorpKeyword from "../../components/result/CorpKeyword2";
import GraphValues from "../../components/result/GraphValues4";
import IdealTalent from "../../components/result/IdealTalent3";
import RecommendedCorp from "../../components/result/RecommendedCorp1";

const ResultPageResultData = (props) => {
    return (
        <Box marginBottom={"20%"}>
          <Text fontFamily={"taebaek"} fontWeight={"bold"} marginBottom={"3%"}>‣ {props.title}</Text>
          <Box
            display={"flex"}
            width={"100%"}
            justifyContent={"center"}
          >
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
}

export default ResultPageResultData;