import { useRef } from "react";
import BarChart from "./BarChart";
import data from "./barData.json";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import { Box } from "@chakra-ui/react";
const IdealTalent = () => {
  const chartContainer = useRef();
  const chart3 = useAppSelector((state) => state.result.chart3);
  console.log(chart3);
  return (
    <Box
      id={"bbb"}
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      <Box
        ref={chartContainer}
        position={"absolute"}
        bottom={"5%"}
        left={"1vw"}
        width={"100%"}
        height={"70%"}
        minWidth={"1050px"}
        padding={"5%"}
        paddingBottom={"10%"}
        backgroundColor={"rgba(255,255,255,0.9)"}
        borderRadius={"30px"}
        boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.3)"}
      >
        <BarChart chartContainer={chartContainer} data={chart3} />
      </Box>
    </Box>
  );
};

export default IdealTalent;
