import { useLayoutEffect, useRef } from "react";

import ResultPageResultData from "../../components/result/ResultPageResultData";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import "../../styles/result/Result.css";

import { Box, Text } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Result = () => {
  const sectionsRef = useRef([]);
  const chart4 = useAppSelector((state) => state.result.chart4);
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
      <Box
        ref={(el) => (sectionsRef.current[1] = el)}
        position={"relative"}
        className="result-panel hero-story hero second-hero hero2"
        backgroundImage={"https://picsum.photos/1600/800?random=1"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        height={"100vh"}
      >
        <Box zIndex={"1"} position={"absolute"} bottom={"10%"} left={"5%"}>
          <Text paddingLeft={"2.5%"} fontSize={"1vw"} width={"25vw"}>
            L’obiettivo di HARC è rendere la casa un luogo che migliora
            l’esperienza di vita di chi la abita curando ogni dettaglio come
            irripetibile e offrendo soluzioni
          </Text>
          <Text fontSize={"6.5vw"} fontFamily={"dodum"}>
            기업의 가치관
          </Text>
        </Box>

        <Box
          className="right-col width-66 delayed"
          width={"67%"}
          height={"100%"}
          marginLeft={"30vw"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"rgba(255,255,255,0.8)"}
          borderRadius={"450%"}
        >
          <ResultPageResultData
            title="기업이 주요하게 보는 가치관"
            componentName={"CorpKeyword"}
          ></ResultPageResultData>
        </Box>
      </Box>

      <Box
        ref={(el) => (sectionsRef.current[2] = el)}
        position={"relative"}
        className="result-panel hero-story hero second-hero hero3"
        backgroundImage={"https://picsum.photos/1600/800?random=1"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        height={"100vh"}
      >
        <Box
          zIndex={"1"}
          position={"absolute"}
          top={"7%"}
          right={"5%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"end"}
        >
          <Text fontSize={"6.5vw"} fontFamily={"dodum"}>
            나의 키워드
          </Text>
          <Text
            paddingLeft={"2.5%"}
            fontSize={"1vw"}
            width={"25vw"}
            textAlign={"end"}
          >
            L’obiettivo di HARC è rendere la casa un luogo che migliora
            l’esperienza di vita di chi la abita curando ogni dettaglio come
            irripetibile e offrendo soluzioni
          </Text>
        </Box>

        <Box
          className="right-col width-66 delayed"
          width={"67%"}
          height={"100%"}
          marginLeft={"3vw"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          // backgroundColor={"rgba(255,255,255,0.8)"}
        >
          <ResultPageResultData
            title="내 가치관과 관련있는 인재상 키워드"
            componentName={"IdealTalent"}
          ></ResultPageResultData>
        </Box>
      </Box>
      {Object.keys(chart4).length !== 0 ? (
        <Box
          ref={(el) => (sectionsRef.current[3] = el)}
          className="result-panel hero-story hero second-hero hero4"
          position={"relative"}
          backgroundImage={"https://picsum.photos/1600/800?random=1"}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          height={"100vh"}
        >
          <Box
            zIndex={"1"}
            position={"absolute"}
            bottom={"10%"}
            right={"5%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"end"}
          >
            <Text
              paddingLeft={"2.5%"}
              fontSize={"1vw"}
              width={"25vw"}
              textAlign={"end"}
            >
              L’obiettivo di HARC è rendere la casa un luogo che migliora
              l’esperienza di vita di chi la abita curando ogni dettaglio come
              irripetibile e offrendo soluzioni
            </Text>
            <Text fontSize={"6.5vw"} fontFamily={"dodum"}>
              나의 가치관
            </Text>
          </Box>
          <Box
            className="right-col width-33 delayed"
            width={"67%"}
            height={"100%"}
            marginLeft={"3vw"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ResultPageResultData
              title="가치관 별 막대 그래프"
              componentName={"GraphValues"}
            ></ResultPageResultData>
          </Box>
        </Box>
      ) : null}

      {Object.keys(chart4).length !== 0 ? (
        <Box
          ref={(el) => (sectionsRef.current[4] = el)}
          className="result-panel hero-story hero second-hero hero5"
          position={"relative"}
          backgroundImage={"https://picsum.photos/1600/800?random=1"}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          height={"100vh"}
        >
          <Box zIndex={"1"} position={"absolute"} bottom={"10%"} left={"5%"}>
            <Text paddingLeft={"2.5%"} fontSize={"1vw"} width={"25vw"}>
              L’obiettivo di HARC è rendere la casa un luogo che migliora
              l’esperienza di vita di chi la abita curando ogni dettaglio come
              irripetibile e offrendo soluzioni
            </Text>
            <Text fontSize={"6.5vw"} fontFamily={"dodum"}>
              나의 위치
            </Text>
          </Box>
          <Box
            className="right-col width-33 delayed"
            position={"absolute"}
            right={"1vw"}
            width={"67%"}
            height={"100%"}
            marginLeft={"3vw"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ResultPageResultData
              title="나이대 별 가치관"
              componentName={"AgeValues"}
            ></ResultPageResultData>
          </Box>
        </Box>
      ) : null}
    </Box>
    // Object.keys(chart4).length !== 0 ?
  );
};
export default Result;
