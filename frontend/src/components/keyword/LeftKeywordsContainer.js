import { Box } from "@chakra-ui/react";

import Keywords from "./Keywords";

const LeftKeywordsContainer = ({ keywords }) => {
  return (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Box
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
      >
        {keywords.map((word, index) => (
          <Box display={"flex"} key={index} justifyContent={"start"}>
            <Box width={"70%"} id={`left-word-${index}`}>
              <Keywords keyword={word} id={index} LR={"left"} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftKeywordsContainer;
