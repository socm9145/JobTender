import { Box } from "@chakra-ui/react";

import LeftKeyword from "./LeftKeyword";

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
          <Box width={"70%"} key={index} id={`left-word-${index}`}>
            <LeftKeyword keyword={word} id={index} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftKeywordsContainer;
