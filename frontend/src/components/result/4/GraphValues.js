import { useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import BarChart4b from "./BarChart4b";
import data from "./barChart4bData.json";

import { Box } from "@chakra-ui/react";
const GraphValues = () => {
  const chartContainer = useRef();

  const chart4 = useAppSelector((state) => state.result.chart4);

  return (
    <Box
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      {/* 차트 설명 */}

      <Box
        ref={chartContainer}
        position={"absolute"}
        top={"10%"}
        left={"1vw"}
        width={"100%"}
        minWidth={"1050px"}
        paddingTop={"3%"}
        paddingBottom={"4%"}
        marginBottom={"3%"}
        backgroundColor={"rgba(255,255,255,0.9)"}
        borderRadius={"30px"}
        boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.3)"}
      >
        <BarChart4b
          chartContainer={chartContainer}
          data={JSON.parse(JSON.stringify(chart4))}
        />
      </Box>
    </Box>
  );
};

export default GraphValues;
