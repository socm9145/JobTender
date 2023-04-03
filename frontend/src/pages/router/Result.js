import { useLayoutEffect, useRef } from "react";

import ResultPageResultData from "../../components/result/ResultPageResultData";

import "../../styles/result/Result.css";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Result = () => {
  const sectionsRef = useRef([]);
  useLayoutEffect(() => {
    // const sections = document.querySelectorAll(".result-panel");

    // this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
    // some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
    const scrolling = {
      enabled: true,
      events: "scroll,wheel,touchmove,pointermove".split(","),
      prevent: (e) => e.preventDefault(),
      disable() {
        if (scrolling.enabled) {
          scrolling.enabled = false;
          window.addEventListener("scroll", gsap.ticker.tick, {
            passive: true,
          });
          scrolling.events.forEach((e, i) =>
            (i ? document : window).addEventListener(e, scrolling.prevent, {
              passive: false,
            })
          );
        }
      },
      enable() {
        if (!scrolling.enabled) {
          scrolling.enabled = true;
          window.removeEventListener("scroll", gsap.ticker.tick);
          scrolling.events.forEach((e, i) =>
            (i ? document : window).removeEventListener(e, scrolling.prevent)
          );
        }
      },
    };

    function goToSection(section, anim, i) {
      if (scrolling.enabled) {
        // skip if a scroll tween is in progress
        scrolling.disable();
        gsap.to(window, {
          scrollTo: { y: section, autoKill: false },
          onComplete: scrolling.enable,
          duration: 1,
        });

        anim && anim.restart();
      }
    }

    sectionsRef.current.forEach((section, i) => {
      const intoAnim = gsap.from(section.querySelector(".right-col"), {
        yPercent: 50,
        duration: 1,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=1",
        end: "bottom top+=1",
        onEnter: () => goToSection(section, intoAnim),
        onEnterBack: () => goToSection(section),
      });
    });
  }, []);

  return (
    <Box>
      {/* <Box
        ref={(el) => (sectionsRef.current[0] = el)}
        id="landing-page"
        className="result-panel hero-story hero hero1"
      >
        <Box className="full-col width-100">
          <h1>Landing Screen</h1>
        </Box>
      </Box> */}

      <Box
        position={"relative"}
        ref={(el) => (sectionsRef.current[1] = el)}
        id="rooms"
        className="result-panel hero-story hero second-hero hero2"
        // backgroundColor={"blackAlpha.300"}
        backgroundImage={"https://picsum.photos/1600/800"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
      >
        <Box zIndex={"1"} position={"absolute"} bottom={"10%"} left={"5%"}>
          <Text paddingLeft={"2.5%"} fontSize={"1vw"} width={"25vw"}>
            L’obiettivo di HARC è rendere la casa un luogo che migliora
            l’esperienza di vita di chi la abita curando ogni dettaglio come
            irripetibile e offrendo soluzioni
          </Text>
          <Text fontSize={"5.7vw"} fontFamily={"dodum"}>
            기업의 가치관
          </Text>
        </Box>

        <Box className="left-col width-33" width={"25vw"}></Box>
        <Box
          className="right-col width-66 delayed"
          width={"67%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          // backgroundColor={"white"}
          backgroundColor={"rgba(255,255,255,0.8)"}
          // backgroundColor={"orange.50"}
          borderRadius={"450%"}
        >
          <ResultPageResultData
            title="기업이 주요하게 보는 가치관"
            componentName={"CorpKeyword"}
          ></ResultPageResultData>
        </Box>
        <Box width={"8vw"}></Box>
      </Box>

      <Box
        ref={(el) => (sectionsRef.current[2] = el)}
        id="you"
        className="result-panel hero-story hero second-hero hero3"
      >
        <Box className="left-col width-33 delayed">
          <h2>Contenu gauche pour proche de vous</h2>
        </Box>
        <Box className="middle-col width-33">
          <h2>Proche de vous</h2>
        </Box>
        <Box className="right-col width-33 delayed">
          <h2>Contenu droite pour proche de vous</h2>
        </Box>
      </Box>

      <Box
        ref={(el) => (sectionsRef.current[3] = el)}
        id="near"
        className="result-panel hero-story hero second-hero hero4"
      >
        <Box className="left-col width-66 delayed">
          <h2>Contenu pour proche de tout</h2>
        </Box>
        <Box className="right-col width-33">
          <h2>Proche de tout</h2>
        </Box>
      </Box>

      <Box
        ref={(el) => (sectionsRef.current[4] = el)}
        className="result-panel hero-story hero second-hero hero5"
      >
        <h2>Contenu du footer</h2>
      </Box>
    </Box>
  );
};
export default Result;
