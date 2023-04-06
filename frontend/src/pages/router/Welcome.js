import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FirstScene from "../../components/welcome/FirstScene";
import Describe from "../../components/welcome/Describe";

import { Box, Button } from "@chakra-ui/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(EasePack);

const Welcome = () => {
  useEffect(() => {
    let getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    gsap.utils.toArray(".section").forEach((section, i) => {
      section.bg = section.querySelector(".bg");
      section.txt = section.querySelectorAll(".txt");
      section.firstscene = section.querySelector(".firstscene");

      // Give the backgrounds some random images
      section.bg.style.backgroundImage = `url(${
        process.env.PUBLIC_URL
      }/images/welcome/welcome_${i + 1}.jpg)`;
      // section.bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

      // the first image (i === 0) should be handled differently because it should start at the very top.
      // use function-based values in order to keep things responsive
      gsap.fromTo(
        section.bg,
        {
          backgroundPosition: () =>
            i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true, // to make it responsive
          },
        }
      );
      gsap.from(section.firstscene, {
        delay: 1.5,
        duration: 1.5,
        opacity: 0,
        ease: "power4.in",
      });
      gsap.from(section.txt, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.bg,
          start: "top center", // the default values
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
  }, []);
  const navigate = useNavigate();

  return (
    <Box overflow="hidden">
      <Box />
      {/* 설명 컴포넌트 */}
      <FirstScene
        className={"section"}
        title={"JOBTENDER"}
        fontsize={"10em"}
        backgroundImage={'url("../../../public/images/welcome/welcome_1.jpg")'}
      />
      <Describe
        className={"section"}
        title={[
          "내 인생의 반 이상을 보내는 직장",
          "직장은 우리에게 무엇이어야 할까요?",
        ]}
        fontsize={"2.5vw"}
      />
      <Describe
        className={"section"}
        title={[
          "단순히 돈을 버는 수단이 아닌,",
          "나의 가치를 이룰 수 있는 곳이라면 어떨까요?",
        ]}
        fontsize={"2.5vw"}
      />
      <Describe
        className={"section"}
        title={[
          "당신의 가치관과 자아를 실현할 무대",
          "Jobtender에서 찾아보세요",
        ]}
        fontsize={"2.5vw"}
      />
      {/* <Describe
        className={"section"}
        title={"Simple parallax Boxs"}
        fontsize={"3em"}
      />
      <Describe
        className={"section"}
        title={"Simple parallax Boxs"}
        fontsize={"3em"}
      /> */}
    </Box>
  );
};

export default Welcome;
