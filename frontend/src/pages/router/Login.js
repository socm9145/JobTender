import KakaoButton from "../../components/login/KakaoButton";

import { Box, Text } from "@chakra-ui/react";
import Kakao from "../../components/KaKao";

const Login = () => {
  return (
    <Box
      backgroundColor={"#f1efe9"}
      color={"#191919"}
      width={"100%"}
      height="100vh"
    >
      <Box display={"flex"} justifyContent={"center"} width={"50vw"}>
        <Box display={"flex"} height={"100vh"} alignItems={"center"}>
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
                borderBottom={"solid 2px #191919"}
              >
                Login to JobTender
              </Text>
            </Box>
            <Box>
              <KakaoButton buttonWidth={"80%"} />
              <Kakao />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// 로그인 아이콘과 글자 사이의 갭 설정

export default Login;
