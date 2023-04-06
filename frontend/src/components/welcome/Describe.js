import { Box, Text } from "@chakra-ui/react";

const Describe = ({ title, fontsize }) => {
  return (
    <Box
      className={"section"}
      position={"relative"}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        className="bg"
        position={"absolute"}
        top={"0"}
        left={"0"}
        width={"100%"}
        height={"100%"}
        zIndex={"-1"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
      ></Box>
      <Box
        width={"55%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          className={"txt"}
          color={"white"}
          textShadow={"1px 1px 3px black"}
          zIndex={"1"}
          fontSize={fontsize}
          fontWeight={"400"}
        >
          {title[0]}
        </Text>
        <Text
          className={"txt"}
          color={"white"}
          textShadow={"1px 1px 3px black"}
          zIndex={"1"}
          fontSize={fontsize}
          fontWeight={"400"}
        >
          {title[1]}
        </Text>
      </Box>
    </Box>
  );
};

export default Describe;
