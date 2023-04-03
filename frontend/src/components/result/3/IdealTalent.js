import { useRef } from "react";
import BarChart from "./BarChart";
import data from "./barData.json";

import { Box } from "@chakra-ui/react";
const IdealTalent = () => {
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
        padding={"4%"}
        boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.3)"}
      >
        <BarChart chartContainer={chartContainer} data={data} />
      </Box>
    </Box>
  );
};

export default IdealTalent;
