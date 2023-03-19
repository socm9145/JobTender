import { useEffect } from "react";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const message1 = document.getElementById("message1");
    const message2 = document.getElementById("message2");
    const message3 = document.getElementById("message3");
    const message4 = document.getElementById("message4");
    const message5 = document.getElementById("message5");
    const message6 = document.getElementById("message6");
    const message7 = document.getElementById("message7");
    const keyword_panel = document.getElementById("keyword_panel");

    const tl = gsap.timeline();
    tl.fromTo(
      message1,
      { opacity: 0, y: 50 },
      {
        duration: 2,
        y: 0,
        opacity: 1,
      }
    )
      .fromTo(
        message2,
        { opacity: 0, y: 50 },
        {
          y: 0,
          duration: 2,
          opacity: 1,
        },
        1
      )
      .fromTo(
        message3,
        { opacity: 0, y: 50 },
        {
          duration: 2,
          y: 0,
          opacity: 1,
        },
        1.5
      )
      .fromTo(
        message4,
        { opacity: 0, y: 50 },
        {
          duration: 2,
          y: 0,
          opacity: 1,
        },
        2.5
      )
      .fromTo(
        message5,
        { opacity: 0, y: 50 },
        {
          duration: 2,
          y: 0,
          opacity: 1,
        },
        3.5
      )
      .fromTo(
        message6,
        { opacity: 0, y: 50 },
        {
          duration: 2,
          y: 0,
          opacity: 1,
        },
        4.5
      )
      .fromTo(
        message7,
        { opacity: 0, y: 50 },
        {
          duration: 2,
          y: 0,
          opacity: 1,
        },
        5
      )
      .fromTo(
        keyword_panel,
        { opacity: 0, y: 50 },
        {
          duration: 1.8,
          y: 0,
          opacity: 1,
        },
        6
      );
    // gsap.fromTo(
    //   message1,
    //   { opacity: 0, y: 50 },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "5%",
    //       end: "25%",
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   message2,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "10%",
    //       end: "30%",
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   message3,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "15%",
    //       end: "35%",
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   message4,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "20%",
    //       end: "40%",
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   message5,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "25%",
    //       end: "45%",
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   message6,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "30%",
    //       end: "50%",
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   message7,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "35%",
    //       end: "55%",
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   keyword_panel,
    //   { opacity: 0, y: 50 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: "body",
    //       start: "40%",
    //       end: "60%",
    //       scrub: true,
    //     },
    //   }
    // );
  }, []);

  return (
    <Box height={"100vh"} display={"flex"} justifyContent={"center"}>
      <Box zIndex={-2} className="landing-background"></Box>
      <Box
        position={"fixed"}
        top={"10%"}
        height={"85vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={"white"}
      >
        <Box
          width={"40vw"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box>
            <Text fontSize={"4xl"} id={"message1"}>
              나를,
            </Text>
          </Box>
          <Box display={"flex"}>
            <Text fontSize={"4xl"} id={"message2"} marginRight={"12px"}>
              그리고
            </Text>
            <Text fontSize={"4xl"} id={"message3"}>
              나와 맞는 기업을
            </Text>
          </Box>
          <Box display={"flex"}>
            <Text fontSize={"4xl"} id={"message4"} marginRight={"12px"}>
              조금 더
            </Text>
            <Text fontSize={"4xl"} id={"message5"}>
              깊게
            </Text>
          </Box>
          <Box display={"flex"}>
            <Text fontSize={"4xl"} id={"message6"} marginRight={"12px"}>
              알 수 있는
            </Text>
            <Text fontSize={"4xl"} id={"message7"}>
              여정입니다
            </Text>
          </Box>
        </Box>

        <Box
          id={"keyword_panel"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"70vw"}
          height={"70%"}
          backgroundColor={"gray.100"}
          opacity={"1"}
          border={"solid 1px white"}
          color={"black"}
        >
          키워드
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
