import WordList from "../../components/survey/WordList";

import { Box, Text } from "@chakra-ui/react";
import WordAnima from "../../components/survey/WordAnima";
import WordSlider from "../../components/survey/WordSlider";

const Survey = () => {
  return (
    <div>
      <Box
        // display={"flex"}
        // flexDirection={"column"}
        // justifyContent={"center"}
        // alignItems={"center"}
        height={"100vh"}
        width={"100vw"}
      >
        {/* <WordList /> */}
        {/* <WordAnima /> */}
        <WordSlider />
      </Box>
    </div>
  );
};

export default Survey;
