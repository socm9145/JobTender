import KakaoButton from "../../../components/login/KakaoButton";

import { Box, Text } from "@chakra-ui/react";

const Login = () => {
  return (
    <div>
      <Box display={"flex"} justifyContent={"center"} width={"50vw"}>
        <Box
          display={"flex"}
          color={"white"}
          height={"100vh"}
          alignItems={"center"}
        >
          <Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"4xl"}
              paddingX={"1rem"}
              paddingBottom={"1rem"}
            >
              <Text
                fontWeight={"semibold"}
                width={"90%"}
                borderBottom={"solid 2px white"}
              >
                Login to JobTender
              </Text>
            </Box>
            <Box>
              <KakaoButton buttonWidth={"80%"} />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

// 로그인 아이콘과 글자 사이의 갭 설정

export default Login;
