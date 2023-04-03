import React from "react";

import ZoomChart from "./ZoomChart";
import data from "./zoomData.json";

import { Box } from "@chakra-ui/react";
const CorpKeyword = () => {
  return (
    <Box width={"100%"}>
      <ZoomChart data={data} />
    </Box>
  );
};

export default CorpKeyword;
