import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Describe from "../../components/welcome/Describe";

import { Box, Text, Button } from "@chakra-ui/react";

import { gsap } from "gsap";
// 추가 플러그인이 필요한 경우도 있슴.
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EasePack } from "gsap/EasePack";

// 플러그인 받고 장착도 해줘야함
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(EasePack);

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // gsap 타임라인 메소드 초기화
    const tl = gsap.timeline();

    const messageList = [
      "#welcomeMessage1",
      "#welcomeMessage2",
      "#welcomeMessage3",
      "#underline",
    ];
    messageList.forEach((element) => {
      const selectedId = element;
      // 첫번째인자는 움직일놈
      // 두번째 인자는 애니메이션 정보
      gsap.to(selectedId, {
        // 가로이동
        x: "85vw",
        // 스크롤설렸을때 할거
        scrollTrigger: {
          //화면에서 확인용
          markers: true,
          // 스크롤 트리거의 기준이 되는 놈.
          trigger: selectedId,

          // 반응 시작
          // 첫번째 인자는 엘리먼트의의 세로비율
          // 두번째 인자는 화면에서 비율
          // 둘이 만날때 시작함.
          start: "70% 60%",
          // 스크롤이 빠꾸하면 애니메이션이 빠꾸하는 기능
          scrub: true,
        },
      });
    });

    // fromTo
    // 첫번째 인자 - 애니메이션 먹일놈
    // 두번째 인자 - from
    // 세번째 인자 - to

    // duration - 바뀌는데 걸리는 시간. duration은 뒤에놈에 넣어야한다.

    // x는 가로축 ,y는 세로축 애니메이션
    // tl -> 타임라인 설정
    // 4번째 인자는 시작시간.
    tl.fromTo("#word-values", { opacity: 0 }, { duration: 2, opacity: 1 })
      .fromTo(
        "#underline",
        { width: "0" },
        //ease : 애니메이션에 다이나믹을 먹이는거
        { duration: 2, width: "100%", ease: "circ.out" },
        2
      )
      .fromTo(
        "#welcomeMessage1",
        { opacity: 0, y: 100 },
        { duration: 1, opacity: 1.5, y: 0 },
        3.7
      )
      .fromTo("#welcomeMessage2", { y: 100 }, { duration: 2, y: 0 }, 3.7)
      .fromTo("#welcomeMessage3", { y: 100 }, { duration: 2, y: 0 }, 4)
      .fromTo(
        "#welcomeMessage3",
        { color: "#191919", backgroundColor: "#f7f6f1" },
        {
          duration: 1.5,
          color: "#f7f6f1",
          backgroundColor: "#191919",
          // 딜레이는 앞선 녀석이 끝나고 00초뒤에 시작해라.
          delay: 0.5,
        }
      );
  }, []);
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
      <Box display={"flex"} flexDirection={"column"}>
        {/* 첫 box */}
        <Box width={"100%"} height={"100vh"} backgroundColor={"#f7f6f1"}>
          <Box
            position={"absolute"}
            top={"0%"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Text
              id={"word-values"}
              width={"100vw"}
              textAlign={"center"}
              fontSize={"27.5vw"}
              fontWeight={"bold"}
              lineHeight={"shorter"}
              color={"white"}
              sx={{
                WebkitTextStroke: "0.1px gray",
                textStroke: "0.1px gray",
              }}
            >
              VALUES
            </Text>
          </Box>
          <Box
            width={"100vw"}
            height={"100vh"}
            position={"relative"}
            top={"0%"}
          >
            <Box
              position={"absolute"}
              bottom={"15%"}
              width={"85%"}
              left={"15%"}
            >
              <Box
                id="welcomeMessage1-container"
                marginBottom={"2rem"}
                overflow={"hidden"}
              >
                <Text
                  width={"100vw"}
                  lineHeight={"1.1"}
                  id={"welcomeMessage1"}
                  color={"#191919"}
                  fontSize={"4vw"}
                  fontFamily={"dodum"}
                >
                  가치관 :
                </Text>
                <Box
                  id={"underline"}
                  width={"100vw"}
                  height={"0"}
                  borderTop={"solid 0.2vw #2D3748"}
                ></Box>
              </Box>
              <Box overflow={"hidden"}>
                <Text id="welcomeMessage2" color={"#191919"} fontSize={"2vw"}>
                  어떤 대상에 대하여 가지는 평가의
                </Text>
              </Box>
              <Box width={"100%"} overflow={"hidden"}>
                <Text
                  id="welcomeMessage3"
                  width={"fit-content"}
                  color={"#191919"}
                  fontSize={"2.3vw"}
                >
                  근본적 태도나 관점(觀點)
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* 설명 컴포넌트 */}
        <Describe id={"1"} title={"Title"} content={"content"} />
        <Describe id={"2"} title={"Title"} content={"content"} />
        <Describe id={"3"} title={"Title"} content={"content"} />
        <Describe id={"4"} title={"Title"} content={"content"} />
        <Describe id={"5"} title={"Title"} content={"content"} />
        <Describe id={"6"} title={"Title"} content={"content"} />
      </Box>
      <Box />
    </Box>
  );
};

export default Welcome;
