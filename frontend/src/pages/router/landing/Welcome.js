import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Image, Button } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const describeFromLeft = ["1", "3", "5"];
    const describeFromRight = ["2", "4", "6"];
    const tl = gsap.timeline();
    tl.fromTo("#word-values", { opacity: 0 }, { duration: 2, opacity: 1 })
      .fromTo(
        "#welcomeMessage1",
        { opacity: 0 },
        { duration: 1, opacity: 1.5 },
        2.5
      )
      .fromTo("#underline", { width: "0" }, { width: "100vw", duration: 4 }, 3)
      // .fromTo(
      //   "#welcomeMessage1-container",
      //   {
      //     borderBottomColor: "#f7f6f1",
      //   },
      //   { duration: 2.5, borderBottomColor: "#191919" }
      // )
      .fromTo(
        "#welcomeMessage2",
        { opacity: 0, y: 100 },
        { duration: 2, opacity: 1, y: 0 },
        3.8
      )
      .fromTo(
        "#welcomeMessage3",
        { opacity: 0, y: 100 },
        { duration: 2, opacity: 1, y: 0 },
        4.7
      );

    describeFromLeft.forEach((element) => {
      const selectedId = "#describe" + element;
      gsap.fromTo(
        selectedId,
        { autoAlpha: 0, x: -1000 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.7,
          scrollTrigger: {
            trigger: selectedId,
            start: "top 40%",
          },
        }
      );
    });
    describeFromRight.forEach((element) => {
      const selectedId = "#describe" + element;
      gsap.fromTo(
        selectedId,
        { autoAlpha: 0, x: 1000 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.7,
          scrollTrigger: {
            trigger: selectedId,
            start: "top 40%",
          },
        }
      );
    });
  }, []);
  return (
    <Box overflow={"hidden"}>
      <Box position={"fixed"} top={"7%"}>
        <Button
          zIndex={4}
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인페이지로
        </Button>
      </Box>

      <Box
        position={"absolute"}
        top={"0%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Text
          id={"word-values"}
          width={"100vw"}
          textAlign={"center"}
          fontSize={"27.5vw"}
          fontWeight={"bold"}
          lineHeight={"shorter"}
          color={"white"}
          sx={{
            WebkitTextStroke: "0.1px gray",
            textStroke: "0.1px gray",
          }}
        >
          VALUES
        </Text>
      </Box>
      <Box width={"100vw"} height={"100vh"} position={"relative"} top={"0%"}>
        <Box position={"absolute"} bottom={"17%"} width={"85%"} left={"15%"}>
          <Box id="welcomeMessage1-container" marginBottom={"2rem"}>
            <Text
              width={"100vw"}
              lineHeight={"1.1"}
              id="welcomeMessage1"
              color={"#191919"}
              fontSize={"7vw"}
              text
            >
              가치관 :
            </Text>
            <Box
              id={"underline"}
              width={"100vw"}
              height={"0"}
              borderTop={"solid 0.2vw #2D3748"}
            ></Box>
          </Box>
          <Box>
            <Text id="welcomeMessage2" color={"#191919"} fontSize={"3vw"}>
              어떤 대상에 대하여 가지는 평가의
            </Text>
          </Box>
          <Box width={"fit-content"}>
            <Text
              id="welcomeMessage3"
              color={"#f7f6f1"}
              fontSize={"3vw"}
              backgroundColor={"#191919"}
            >
              근본적 태도나 관점(觀點)
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        color={"#191919"}
        overflow={"hidden"}
      >
        <Box
          id="describe1"
          display={"flex"}
          width={"60%"}
          height="100vh"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            height={"fit-content"}
          >
            <Box>
              <Box fontSize={"4xl"} fontWeight={"bold"}>
                Title
              </Box>
              <Box width={"30vw"}>
                ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
        </Box>
        <Box
          id="describe2"
          display={"flex"}
          width={"60%"}
          height="100vh"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            height={"fit-content"}
          >
            <Box>
              <Box fontSize={"4xl"} fontWeight={"bold"} textAlign={"end"}>
                Title
              </Box>
              <Box width={"30vw"} textAlign={"end"}>
                ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          id="describe3"
          display={"flex"}
          width={"60%"}
          height="100vh"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            height={"fit-content"}
          >
            <Box>
              <Box fontSize={"4xl"} fontWeight={"bold"}>
                Title
              </Box>
              <Box width={"30vw"}>
                ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
        </Box>
        <Box
          id="describe4"
          display={"flex"}
          width={"60%"}
          height="100vh"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            height={"fit-content"}
          >
            <Box>
              <Box fontSize={"4xl"} fontWeight={"bold"} textAlign={"end"}>
                Title
              </Box>
              <Box width={"30vw"} textAlign={"end"}>
                ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          id="describe5"
          display={"flex"}
          width={"60%"}
          height="100vh"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            height={"fit-content"}
          >
            <Box>
              <Box fontSize={"4xl"} fontWeight={"bold"}>
                Title
              </Box>
              <Box width={"30vw"}>
                ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
        </Box>
        <Box
          id="describe6"
          display={"flex"}
          width={"60%"}
          height="100vh"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            height={"fit-content"}
          >
            <Box>
              <Box fontSize={"4xl"} fontWeight={"bold"} textAlign={"end"}>
                Title
              </Box>
              <Box width={"30vw"} textAlign={"end"}>
                ContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContentContent
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
