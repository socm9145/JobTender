import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import { setChart2 } from "../../../redux/result/resultSlice";
import ZoomChart from "./ZoomChart";
// import data from "./zoomData.json";

import { Box } from "@chakra-ui/react";
const CorpKeyword = () => {
  const dispatch = useAppDispatch();

  const chart2 = useAppSelector((state) => state.result.chart2);
  const chart2_1 = useAppSelector((state) => state.result.chart2_1);
  const chart2_2 = useAppSelector((state) => state.result.chart2_2);
  const chart2_3 = useAppSelector((state) => state.result.chart2_3);
  useEffect(() => {
    const data = {
      name: "chart2",
      children: [chart2_1, chart2_2, chart2_3],
    };
    dispatch(setChart2(data));
  }, []);

  if (Object.keys(chart2).length !== 0) {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
      >
        {/* 차트 설명 */}
        <Box
          display={"flex"}
          width={"100%"}
          height={"100%"}
          padding={"5%"}
          className={"hoverable"}
        >
          <ZoomChart data={chart2} />
        </Box>
      </Box>
    );
  } else {
    <></>;
  }
};

export default CorpKeyword;
