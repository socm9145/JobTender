import WordList from "../../components/survey/WordList";

import { Box, Text } from "@chakra-ui/react";
import WordAnima from "../../components/survey/WordAnima";
import WordAnima2 from "../../components/survey/WordAnima2";
import WordAnima3 from "../../components/survey/WordAnima3";
import WordSlider from "../../components/survey/WordSlider";
import WordSlider2 from "../../components/survey/WordSlider2";
import WordSlide from "../../components/survey/WordSlide";

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
        {/* <WordAnima2 /> */}
        {/* <WordAnima3 /> */}
        {/* <WordSlider /> */}
        {/* <WordSlider2 /> */}
        <WordSlide />
      </Box>
    </div>
  );
};

export default Survey;
