import { Box, Text, Button } from "@chakra-ui/react";

const WelcomeMessage = () => {
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      px={"30%"}
      top={"50%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text
        color={"white"}
        width={"450px"}
        fontSize={"4xl"}
        textAlign={"center"}
      >
        당신의 가치관과 맞는 회사 찾아보세요
      </Text>
    </Box>
  );
};

export default WelcomeMessage;
