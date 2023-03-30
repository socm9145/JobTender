import { useEffect } from "react";

import { Box, Image, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Describe = ({ id, title, content }) => {
  const containerId = "container" + id;
  const elementId = "describe" + id;
  // 왼쪽에서 나오는 컴포넌트인지 오른쪽에서 나오는 컴포넌트인지 판단하기 위해
  // id의 홀짝으로 구분함
  const LR = id % 2;
  useEffect(() => {
    if (LR) {
      gsap.fromTo(
        "#" + elementId,
        { opacity: 0, x: -1000 },
        {
          opacity: 1,
          x: 0,
          duration: 1.7,
          scrollTrigger: {
            trigger: "#" + elementId,
            start: "top 90%",
          },
        }
      );
    } else {
      gsap.fromTo(
        "#" + elementId,
        { opacity: 0, x: 1000 },
        {
          opacity: 1,
          x: 0,
          duration: 1.7,
          scrollTrigger: {
            trigger: "#" + elementId,
            start: "top 90%",
          },
        }
      );
    }
    ScrollTrigger.create({
      trigger: "#" + containerId,
      start: "top 5%",
      end: "bottom 77%",

      // end: `bottom ${document.getElementById(elementId).offsetHeight}px`,
      pin: "#" + elementId,
    });
  }, []);
  return (
    <div>
      {LR ? (
        <Box
          id={containerId}
          backgroundColor={"#f1efe9"}
          color={"#191919"}
          width={"100%"}
          height="120vh"
          paddingTop={"3%"}
        >
          <Box
            id={elementId}
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            paddingX={"2vw"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              height={"fit-content"}
            >
              <Box>
                <Text id={`title${id}`} fontSize={"8xl"} fontWeight={"bold"}>
                  {title}
                </Text>
              </Box>
              <Box>
                <Text width={"30vw"} fontSize={"4xl"}>
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                </Text>
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
              <Image
                maxWidth={"none"}
                width="40vw"
                height="60vh"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          id={containerId}
          backgroundColor={"#f7f6f1"}
          color={"#191919"}
          width={"100%"}
          height="120vh"
          paddingTop={"3%"}
        >
          <Box
            id={elementId}
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            paddingX={"2vw"}
          >
            <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
              <Image
                maxWidth={"none"}
                width="40vw"
                height="60vh"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"end"}
              height={"fit-content"}
            >
              <Box>
                <Text id={`title${id}`} fontSize={"8xl"} fontWeight={"bold"}>
                  {title}
                </Text>
              </Box>
              <Box>
                <Text width={"30vw"} fontSize={"4xl"} textAlign={"end"}>
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                  {content}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Describe;
