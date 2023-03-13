import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Describes from "../../components/welcome/Describes";
import WelcomeMessage from "../../components/welcome/WelcomeMessage";
import { Box, Image } from "@chakra-ui/react";
import "../../styles/Welcome.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const [nextView, setNextView] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!nextView) {
      body.classList.add("overflow");
    } else {
      body.classList.remove("overflow");
    }
  }, [nextView]);

  return (
    <Box>
      <Box className="background"></Box>
      {nextView ? (
        <Describes />
      ) : (
        <WelcomeMessage setNextView={setNextView} nextView={nextView} />
      )}
    </Box>
  );
};

export default Welcome;
