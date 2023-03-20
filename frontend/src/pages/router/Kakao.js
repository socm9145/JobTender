import { useEffect } from "react";
import { useLocation, useNavigate, router } from "react-router-dom";

import axios from "axios";
import qs from "qs";

import KakaoButton from "../../components/login/KakaoButton";

import { Box, Text } from "@chakra-ui/react";

const Kakao = () => {
  // 주소창의 인가코드 가져오는 코드
  const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // myParam 이 인가코드
  // const myCode = params.get("code");

  // 위의 URLSeacrchParams 사용해서 코드 가져오는거속도느리고 비효율적인것 같아 아래로 교체.
  const myCode = location.search.slice(6);

  // 주소창 파라미터 지우는 코드인데 반응이 느려서 쓸모 있나 싶음.
  window.history.replaceState({}, null, location.pathname);

  const data = {
    grant_type: "authorization_code",
    client_id: "1d00d14f1ffe2865a5b8a876c3de14da", //REST API
    redirect_uri: "http://localhost:3000/kakao",
    code: myCode,
  };

  const navigate = useNavigate();

  useEffect(() => {
    // 인가 코드로 액세스 토큰 받기.
    axios
      .post("https://kauth.kakao.com/oauth/token", qs.stringify(data), {
        // "Content-Type": "application/json",
      })

      .then(function (response) {
        console.log(response.data);
        const accessToken = response.data["access_token"];

        // !! 여긴 나중에 백엔드 에서 수행
        // 액세스 토큰으로 유저 정보 받기.
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        axios
          .get("https://kapi.kakao.com/v2/user/me", { headers: headers })
          .then(function (response) {
            console.log(response);
          });
        // //////////////////////////////////////////

        navigate("/home");
      })
      .catch(function (error) {
        // console.log(error);
        console.log("로그인 에러");
        navigate(-1);
      });
  }, []);

  return (
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
