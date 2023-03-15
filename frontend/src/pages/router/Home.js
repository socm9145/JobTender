import { Box, Text } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const box1 = document.getElementById("first");
    const box2 = document.getElementById("second");
    const box3 = document.getElementById("third");
    gsap.fromTo(
      box1,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "body",
          start: "top+=20%",
          end: "top+=40%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      box2,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "body",
          start: "top+=30%",
          end: "top+=50%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      box3,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "body",
          start: "top+=40%",
          end: "top+=60%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <Box height={"7000px"}>
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
          width={"40vw"}
          position={"fixed"}
          top={"10%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          border={"solid 1px white"}
          flexGrow={3}
        >
          <Box
            id={"first"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px pink"}
          >
            <Text fontSize={"4xl"}>나를,</Text>
          </Box>
          <Box
            id={"second"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px pink"}
          >
            <Text fontSize={"4xl"}>그리고</Text>
          </Box>
          <Box
            id={"third"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px pink"}
          >
            <Text fontSize={"4xl"}>나와 맞는 기업을</Text>
          </Box>
        </Box>
        <Box
          width={"40vw"}
          position={"fixed"}
          top={"10%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"end"}
          border={"solid 1px white"}
          flexGrow={3}
        >
          <Box
            id={"first"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px pink"}
          >
            <Text fontSize={"4xl"}>나를,</Text>
          </Box>
          <Box
            id={"second"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px pink"}
          >
            <Text fontSize={"4xl"}>그리고</Text>
          </Box>
          <Box
            id={"third"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            border={"solid 1px pink"}
          >
            <Text fontSize={"4xl"}>나와 맞는 기업을</Text>
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
    </Box>
  );
};

export default Home;
