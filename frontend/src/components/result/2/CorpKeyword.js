import React from "react";

import ZoomChart from "./ZoomChart";
import data from "./zoomData.json";

import { Box } from "@chakra-ui/react";
const CorpKeyword = () => {
  return (
    <Box
      id={"aa"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100%"}
    >
      {/* 차트 설명 */}
      <Box display={"flex"} width={"100%"} height={"100%"} padding={"5%"}>
        <ZoomChart data={data} />
      </Box>
    </Box>
  );
};

export default CorpKeyword;
