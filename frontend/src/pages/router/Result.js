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
        ref={(el) => (sectionsRef.current[0] = el)}
        position={"relative"}
        className="result-panel hero-story hero second-hero hero2"
        backgroundImage={"./images/result/result_1.jpg"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        height={"100vh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"end"}
      >
        <Box
          width={"80vw"}
          height={"80%"}
          position={"absolute"}
          top={"10%"}
          left={"5%"}
          display={"flex"}
        >
          <Text
            height={"20%"}
            fontSize={"6.5vw"}
            fontFamily={"dodum"}
            textShadow={"1px 1px 3px black"}
          >
            JOBTENDER의 제안
          </Text>
        </Box>
        <Box height={"25%"}>
          <ResultPageResultData
            componentName={"RecommendedCorp"}
          ></ResultPageResultData>
        </Box>
      </Box>

      <Box
        ref={(el) => (sectionsRef.current[1] = el)}
        position={"relative"}
        className="result-panel hero-story hero second-hero hero2"
        backgroundImage={"./images/result/result_2.jpg"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        height={"100vh"}
        paddingY={"5em"}
        paddingX={"5em"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
      >
        <Box zIndex={"1"} position={"absolute"} bottom={"10%"} left={"5%"}>
          <Text paddingLeft={"2.5%"} fontSize={"1vw"} width={"25vw"}>
            기업의 주요 인재상 키워드와 그 중요도가 <br />
            넓이로 표현되어 있습니다.
          </Text>
          <Text fontSize={"6.5vw"} fontFamily={"dodum"}>
            기업의 가치관
          </Text>
        </Box>

        <Box
          className="right-col width-66 delayed"
          width={"60vw"}
          height={"60vw"}
          maxHeight={"90vh"}
          maxWidth={"90vh"}
          // marginLeft={"30vw"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"rgba(255,255,255,0.8)"}
          borderRadius={"450%"}
          boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.3)"}
          // marginRight={"5%"}
        >
          <ResultPageResultData
            componentName={"CorpKeyword"}
          ></ResultPageResultData>
        </Box>
      </Box>

      <Box
        ref={(el) => (sectionsRef.current[2] = el)}
        position={"relative"}
        className="result-panel hero-story hero second-hero hero3"
        backgroundImage={"./images/result/result_3.jpg"}
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
            가치관을 기반으로 분석한 <br />
            나와 가까운 키워드 5개 & 먼 키워드 5개 입니다
            <br /> 인재상을 볼 때와 자기소개서에 참고하세요!
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
            componentName={"IdealTalent"}
          ></ResultPageResultData>
        </Box>
      </Box>
      {Object.keys(chart4).length !== 0 ? (
        <Box
          ref={(el) => (sectionsRef.current[3] = el)}
          className="result-panel hero-story hero second-hero hero4"
          position={"relative"}
          backgroundImage={"./images/result/result_4.jpg"}
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
              paddingRight={"2.5%"}
              fontSize={"1vw"}
              width={"25vw"}
              textAlign={"end"}
            >
              10개의 가치관 각각의 중요도입니다
              <br />
              막대그래프를 클릭하면 <br />
              세부 가치들을 확인할 수 있습니다.
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
          backgroundImage={"./images/result/result_5.jpg"}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          height={"100vh"}
        >
          <Box zIndex={"1"} position={"absolute"} bottom={"10%"} left={"5%"}>
            <Text paddingLeft={"2.5%"} fontSize={"1vw"} width={"25vw"}>
              20대 대학생들의 가치관을 기준으로 <br />
              자신이 어떤 가치를 더 중요히 여기는지 <br />
              확인할 수 있습니다.
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
