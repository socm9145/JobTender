import { useRef } from "react";
import BarChart from "./BarChart";
import data from "./barData.json";

import { Box } from "@chakra-ui/react";
const IdealTalent = () => {
  const chartContainer = useRef();

  return (
    <Box ref={chartContainer} width={"100%"}>
      <BarChart chartContainer={chartContainer} data={data} />
    </Box>
  );
};

export default IdealTalent;
