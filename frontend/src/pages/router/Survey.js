import WordList from "../../components/survey/WordList";

import { Box, Text } from "@chakra-ui/react";

const Survey = () => {
  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <WordList />
      </Box>
    </div>
  );
};

export default Survey;
