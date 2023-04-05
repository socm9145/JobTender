import { useEffect } from "react";
import { useLocation, useNavigate, router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setUserId } from "../../redux/user/userSlice"

import KakaoButton from "../../components/login/KakaoButton";

import { Box, Text } from "@chakra-ui/react";

import { login } from '../../api/userAxios'

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
    async function letLogin(){
      await login(
        myCode,
        data => {
          dispatch(setUserId(data.data));
          sessionStorage.setItem("isLogin", true);
          navigate("/home");
        },
        error => {
          console.log(error);
          console.log("로그인 에러");
          navigate(-1);
        }
      )
    }
    letLogin();
  },[]);

  return (
    // 로그인 하는동안 이질감이 없도록 Login 페이지와 같은 화면 으로 구현
    <Box
      backgroundColor={"#f1efe9"}
      color={"#191919"}
      width={"100%"}
      height="100vh"
    >
      <Box display={"flex"} justifyContent={"center"} width={"50vw"}>
        <Box display={"flex"} height={"100vh"} alignItems={"center"}>
          <Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"4xl"}
              paddingX={"1rem"}
              paddingBottom={"1rem"}
            >
              <Text
                fontWeight={"semibold"}
                width={"90%"}
                borderBottom={"solid 2px #191919"}
              >
                Login to JobTender
              </Text>
            </Box>
            <Box>
              <KakaoButton buttonWidth={"80%"} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Kakao;
