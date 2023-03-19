import { Box, Image } from "@chakra-ui/react";
import { useEffect } from "react";

import { gsap } from "gsap";
const Describe = ({ id, title, content }) => {
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
            start: "top 40%",
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
            start: "top 40%",
          },
        }
      );
    }
  }, []);
  return (
    <div>
      {LR ? (
        <Box backgroundColor={"#f1efe9"} color={"#191919"} width={"100%"}>
          <Box
            id={elementId}
            display={"flex"}
            height="100vh"
            justifyContent={"space-evenly"}
            alignItems={"center"}
            paddingX={"25vw"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              height={"fit-content"}
            >
              <Box fontSize={"4xl"} fontWeight={"bold"}>
                {title}
              </Box>
              <Box width={"30vw"}>{content}</Box>
            </Box>
            <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box backgroundColor={"#f7f6f1"} color={"#191919"} width={"100%"}>
          <Box
            id={elementId}
            display={"flex"}
            height="100vh"
            justifyContent={"space-evenly"}
            alignItems={"center"}
            paddingX={"25vw"}
          >
            <Box display={"flex"} alignItems={"center"} height={"fit-content"}>
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"end"}
              height={"fit-content"}
            >
              <Box fontSize={"4xl"} fontWeight={"bold"}>
                {title}
              </Box>
              <Box width={"30vw"} textAlign={"end"}>
                {content}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Describe;
