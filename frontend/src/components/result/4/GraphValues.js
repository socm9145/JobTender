import { useRef } from "react";
import BarChart4b from "./BarChart4b";
import data from "./barChart4bData.json";

import { Box } from "@chakra-ui/react";
const GraphValues = () => {
  const chartContainer = useRef();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      {/* 차트 설명 */}
      <Box> asdf</Box>
      <Box
        ref={chartContainer}
        width={"100%"}
        minWidth={"1050px"}
        backgroundColor={"white"}
        paddingX={"1%"}
        paddingY={"3%"}
        boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.3)"}
      >
        <BarChart4b chartContainer={chartContainer} data={data} />
      </Box>
    </Box>
  );
};

export default GraphValues;
