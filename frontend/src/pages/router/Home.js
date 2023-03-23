import { useEffect, useState } from "react";

import TextContainer from "../../components/home/TextContainer";
import ImageContainer from "../../components/home/ImageContainer";

import { Box } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [selectedTest, setSelectedTest] = useState(true);
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
        >
          <Box width={"25%"}>
            <TextContainer
              selectedTest={selectedTest}
              setSelectedTest={setSelectedTest}
            />
          </Box>
          <Box
            id={"vertical-line-1"}
            height={"100%"}
            width={"0"}
            borderLeft={"solid 1px black"}
          ></Box>
          <Box width={"75%"}>
            <ImageContainer
              selectedTest={selectedTest}
              setSelectedTest={setSelectedTest}
            />
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
