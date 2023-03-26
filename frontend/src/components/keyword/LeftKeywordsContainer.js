import { Box } from "@chakra-ui/react";

import Keyword from "./Keyword";

const LeftKeywordsContainer = ({ keywords }) => {
  return (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Box
        height={"60%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        {keywords.map((word, index) => (
          <Box display={"flex"} key={index} justifyContent={"start"}>
            <Box width={"70%"} id={`left-word-${index}`}>
              <Keyword keyword={word} id={index} LR={"left"} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftKeywordsContainer;
