import { useRef } from "react";
import BarChart4b from "./BarChart4b";
import data from "./barChart4bData.json";

import { Box } from "@chakra-ui/react";
const GraphValues = () => {
  const chartContainer = useRef();
  return (
    <Box ref={chartContainer} width={"100%"}>
      <BarChart4b chartContainer={chartContainer} data={data} />
    </Box>
  );
};

export default GraphValues;
