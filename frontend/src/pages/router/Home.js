import { useEffect, useRef } from "react";

import TextContainer from "../../components/home/TextContainer";
import ImageContainer from "../../components/home/ImageContainer";
import WiseSaying from "../../components/home/WiseSaying";

import { Box } from "@chakra-ui/react";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);
gsap.registerPlugin(TextPlugin);
const Home = () => {
  const wiseSayingRef = useRef([]);
  const blackBox = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    gsap.from(wiseSayingRef.current[0], {
      delay: 3,
      duration: 2,
      text: "what you rist reaveals",
      ease: "none",
    });
    gsap.from(wiseSayingRef.current[1], {
      delay: 3.5,
      duration: 2,
      text: "what you value.",
      ease: "none",
    });
    gsap.from(wiseSayingRef.current[2], {
      delay: 4,
      duration: 2,
      text: "- Jeanette Winterson",
      ease: "none",
    });

    tl.from(wiseSayingRef.current[0], {
      duration: 1,
      opacity: 0,
    });
    tl.from(
      wiseSayingRef.current[1],
      {
        duration: 1,
        opacity: 0,
      },
      0.2
    );
    tl.from(
      wiseSayingRef.current[2],
      {
        duration: 1,
        opacity: 0,
      },
      0.4
    )
      .from(
        blackBox.current,
        {
          duration: 2,
          opacity: 0,
          y: "100%",
          ease: "sine.out",
        },
        2
      )
      .from(
        "#vertical-line-1",
        {
          duration: 1.2,
          opacity: 0,
          y: "-60%",
          ease: "sine.out",
        },
        4
      )
      .from(
        "#image-container",
        {
          x: "7%",
          duration: 1.2,
          opacity: 0,
        },
        5
      );
  }, []);

  return (
    <Box
      className={"draggunable"}
      height={"100vh"}
      backgroundImage={"https://picsum.photos/1600/800"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
    >
      <Box
        height={"100%"}
        paddingTop={"48px"}
        display={"grid"}
        gridTemplateRows={"repeat(15,1fr)"}
      >
        <Box width={"100vw"} gridRow={"2/7"}>
          <WiseSaying wiseSayingRef={wiseSayingRef} />
        </Box>
        <Box
          ref={blackBox}
          width={"100%"}
          position={"relative"}
          gridRow={"8/16"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          marginLeft={"15%"}
          overflow={"hidden"}
          borderTopRadius={"40px"}
        >
          <Box
            position={"absolute"}
            left={"0px"}
            top={"0px"}
            width={"100%"}
            height={"100%"}
            backgroundColor={"black"}
            // opacity={"0.9"}
          ></Box>

          <Box height={"80vh"} paddingX={"40px"}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              width={"100%"}
              height={"100%"}
              overflow={"hidden"}
            >
              <Box id={"text-container"} width={"20%"}>
                <TextContainer />
              </Box>
              <Box
                id={"vertical-line-1"}
                height={"100%"}
                width={"0"}
                borderLeft={"solid 1px white"}
              ></Box>
              <Box id={"image-container"} width={"75%"}>
                <ImageContainer />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
