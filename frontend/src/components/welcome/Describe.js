import { Box, Text } from "@chakra-ui/react";

const Describe = ({ title, fontsize }) => {
  return (
    <Box
      className={"section"}
      position={"relative"}
      height={"100vh"}
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

      <Text
        className={"txt"}
        color={"white"}
        textShadow={"1px 1px 3px black"}
        zIndex={"1"}
        fontSize={fontsize}
        fontWeight={"400"}
      >
        {title}
      </Text>
    </Box>
  );
};

export default Describe;
