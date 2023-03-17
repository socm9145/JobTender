import { Box } from "@chakra-ui/react";
import React from "react";
import KakaoLogin from "react-kakao-login";

const Kakao = () => {
  const handleLogin = (response) => {
    console.log(response);
  };

  const REST_API_KEY = "1d00d14f1ffe2865a5b8a876c3de14da"; // 호성이 새로운거
  const REDIRECT_URI = "http://localhost:3000/kakao";
  // const naverLogin = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&state=${state}`;
  const kakaoLogin = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  // console.log(process.env.PUBLIC_URL + `assets/naverLogin.png`);

  return (
    <div>
      <KakaoLogin
        // appId={"1d00d14f1ffe2865a5b8a876c3de14da"}
        token={"16e141611c0dc15d1e07641489d44c46"}
        onSuccess={handleLogin}
        onFailure={console.error}
        render={({ onClick }) => (
          <button onClick={onClick}>Login with Kakao</button>
        )}
      />
      <a href={kakaoLogin}>
        <button type="box">카카오 로그인</button>
      </a>
    </div>
  );
};

export default Kakao;
