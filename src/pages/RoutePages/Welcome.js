import { useRef, useEffect } from "react";

import Navbar from "../../components/Navbar";

import "../../styles/Welcome.css";
import { Box, Image } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Welcome = () => {
  useEffect(() => {
    const describeFromLeft = ["1", "3", "5"];
    const describeFromRight = ["2", "4", "6"];

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
            start: "top 80%",
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
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <div>
      <div className="background"></div>
      <Navbar />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        color={"white"}
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
    </div>
  );
};

export default Welcome;
