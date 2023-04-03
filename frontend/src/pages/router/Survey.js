import { Box, Text } from "@chakra-ui/react";
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
        <WordSlide />
      </Box>
    </div>
  );
};

export default Survey;
