import { Box } from "@chakra-ui/react";

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
          <Box border={"solid 1px white"}>
            <Box
              textAlign={"center"}
              fontSize={"4xl"}
              paddingX={"1rem"}
              borderBottom={"solid 1px white"}
              marginBottom={"1rem"}
            >
              Login to JobTender
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Box border={"solid 1px white"}>카카오 로그인 버튼</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
