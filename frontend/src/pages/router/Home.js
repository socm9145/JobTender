import { useEffect } from "react";

import TextContainer from "../../components/home/TextContainer";
import ImageContainer from "../../components/home/ImageContainer";

import { Box } from "@chakra-ui/react";

import { gsap } from "gsap";

const Home = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from("#horizontal-line-1", {
      duration: 1.8,
      opacity: 0,
      x: "-80vw",
      ease: "sine.out",
    })
      .from(
        "#horizontal-line-2",
        {
          duration: 1.5,
          opacity: 0,
          x: "-80%",
          ease: "sine.out",
        },
        0.5
      )
      .from(
        "#vertical-line-1",
        {
          duration: 1.2,
          opacity: 0,
          y: "-60%",
          ease: "sine.out",
        },
        1
      )
      .from(
        "#image-container",
        {
          x: "7%",
          duration: 1.2,
          opacity: 0,
        },
        2
      );
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      height={"100vh"}
      backgroundColor={"#f1efe9"}
    >
      <Box
        id={"horizontal-line-1"}
        height={"0"}
        width={"100vw"}
        borderTop={"solid 1px black"}
      ></Box>
      <Box height={"80vh"} paddingX={"40px"}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          width={"100%"}
          height={"100%"}
          overflow={"hidden"}
        >
          <Box id={"text-container"} width={"25%"}>
            <TextContainer />
          </Box>
          <Box
            id={"vertical-line-1"}
            height={"100%"}
            width={"0"}
            borderLeft={"solid 1px black"}
          ></Box>
          <Box id={"image-container"} width={"75%"}>
            <ImageContainer />
          </Box>
        </Box>
      </Box>
      <Box
        id={"horizontal-line-2"}
        height={"0"}
        width={"100vw"}
        borderTop={"solid 1px black"}
      ></Box>
    </Box>
  );
};

export default Home;
