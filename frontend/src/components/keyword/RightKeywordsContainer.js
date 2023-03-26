import { Box } from "@chakra-ui/react";

import Keyword from "./Keyword";

const RightKeywordsContainer = ({ keywords }) => {
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
          <Box display={"flex"} key={index} justifyContent={"end"}>
            <Box width={"70%"} id={`right-word-${index}`}>
              <Keyword keyword={word} id={index + 5} LR={"right"} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RightKeywordsContainer;
