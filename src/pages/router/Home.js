import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Box zIndex={-2} className="landing-background"></Box>
      <Box
        py={"48px"}
        height={"100vh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"solid 1px white"}
          flexGrow={3}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px white"}
          >
            aaaaaaaaaaaaaaaa
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px white"}
          >
            aaaaaaaaaaaaaaaa
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px white"}
          >
            aaaaaaaaaaaaaaaa
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"solid 1px white"}
          flexGrow={7}
        >
          키워드
        </Box>
      </Box>
    </div>
  );
};

export default Home;
