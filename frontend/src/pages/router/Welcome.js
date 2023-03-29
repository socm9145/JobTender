import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FirstScene from "../../components/welcome/FirstScene";
import Describe from "../../components/welcome/Describe";

import { Box, Text, Button, Section } from "@chakra-ui/react";

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
      section.txt = section.querySelector(".txt");
      section.firstscene = section.querySelector(".firstscene");

      // Give the backgrounds some random images
      section.bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

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
      {/* 임시 로그인 페이지 이동 버튼 */}
      <Box
        zIndex={4}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        position={"fixed"}
        top={"0"}
      >
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인페이지로
        </Button>
      </Box>

      <Box />
      {/* 설명 컴포넌트 */}
      <FirstScene className={"section"} title={"JOBTENDER"} fontsize={"10em"} />
      <Describe
        className={"section"}
        title={"Simple parallax Boxs"}
        fontsize={"3em"}
      />
      <Describe
        className={"section"}
        title={"Simple parallax Boxs"}
        fontsize={"3em"}
      />
      <Describe
        className={"section"}
        title={"Simple parallax Boxs"}
        fontsize={"3em"}
      />
      <Describe
        className={"section"}
        title={"Simple parallax Boxs"}
        fontsize={"3em"}
      />
      <Describe
        className={"section"}
        title={"Simple parallax Boxs"}
        fontsize={"3em"}
      />
    </Box>
  );
};

export default Welcome;
