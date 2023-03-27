import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Scene1 from "../../components/welcome/Scene1";
import Describe from "../../components/welcome/Describe";

import { Box, Text, Button } from "@chakra-ui/react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box overflow="hidden">
      {/* 임시 로그인 페이지 이동 버튼 */}
      <Box
        zIndex={4}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        position={"fixed"}
        top={"0"}
      >
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인페이지로
        </Button>
      </Box>

      <Box display={"flex"} flexDirection={"column"}>
        {/* 첫 box */}
        <Scene1 />
        {/* 설명 컴포넌트 */}
        <Describe id={"1"} title={"Title"} content={"content"} />
        <Describe id={"2"} title={"Title"} content={"content"} />
        <Describe id={"3"} title={"Title"} content={"content"} />
        <Describe id={"4"} title={"Title"} content={"content"} />
        <Describe id={"5"} title={"Title"} content={"content"} />
        <Describe id={"6"} title={"Title"} content={"content"} />
      </Box>
      <Box />
    </Box>
  );
};

export default Welcome;
