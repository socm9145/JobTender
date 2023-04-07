import { useEffect } from "react";
import { useLocation, useNavigate, router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setUserId } from "../../redux/user/userSlice";

import KakaoButton from "../../components/login/KakaoButton";

import { Box, Text } from "@chakra-ui/react";

import { login } from "../../api/userAxios";

const Kakao = () => {
  const dispatch = useAppDispatch();
  // 주소창의 인가코드 가져오는 코드
  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // myParam 이 인가코드
  // const myCode = params.get("code");

  // 위의 URLSeacrchParams 사용해서 코드 가져오는거속도느리고 비효율적인것 같아 아래로 교체.
  const myCode = location.search.slice(6);

  // 주소창 파라미터 지우는 코드인데 반응이 느려서 쓸모 있나 싶음.
  // window.history.replaceState({}, null, location.pathname);

  const navigate = useNavigate();

  useEffect(() => {
    // 인가 코드로 액세스 토큰 받기.
    async function letLogin() {
      await login(
        myCode,
        (data) => {
          dispatch(setUserId(data.data));
          sessionStorage.setItem("isLogin", true);
          navigate("/home");
        },
        (error) => {
          console.log(error);
          navigate(-1);
        }
      );
    }
    letLogin();
  }, []);

  return (
    // 로그인 하는동안 이질감이 없도록 Login 페이지와 같은 화면 으로 구현
    <Box
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    color={"#191919"}
    width={"100vw"}
    height={"100vh"}
    backgroundImage={"https://picsum.photos/1600/800"}
    backgroundSize={"cover"}
    backgroundPosition={"center"}
    backgroundRepeat={"no-repeat"}
  >
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingY={"1.5rem"}
      height={"80vh"}
      width={"100vw"}
      overflowY={"hidden"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        height={"100%"}
        alignItems={"center"}
        paddingLeft={"5vw"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"35vw"}
          paddingX={"1.5rem"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            textAlign={"center"}
            fontSize={"3vw"}
            overflow={"hidden"}
          >
            <Text
              id={"login-message"}
              color={"white"}
              textShadow={"1px 1px 3px black"}
              fontWeight={"semibold"}
            >
              Login to JobTender
            </Text>
          </Box>
          <Box
            id={"horizontal-line"}
            height={"0"}
            width={"87%"}
            borderTop={"solid 1px white"}
            boxShadow={"1px 1px 3px black"}
          ></Box>
          <Box id={"kakao-button"} marginTop={"4%"}>
            <KakaoButton buttonWidth={"65%"} />
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
  );
};

export default Kakao;
