import { Box, Image } from "@chakra-ui/react";

const KakaoButton = ({ buttonWidth }) => {
  const REST_API_KEY = "1d00d14f1ffe2865a5b8a876c3de14da";
  const REDIRECT_URI = "https://jobtender.shop/kakao";
  // const REDIRECT_URI = "http://localhost:3000/kakao";
  const kakaoLogin = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  return (
    <div>
      <a>
        <Box display={"flex"} justifyContent={"center"}>
          <Image
            className="hoverable"
            borderRadius={"0"}
            shadow={"1px 1px 2px black"}
            onClick={() => {
              window.location.href = kakaoLogin;
            }}
            src={process.env.PUBLIC_URL + "/images/kakaoButton.jpg"}
            width={buttonWidth}
          />
        </Box>
      </a>
    </div>
  );
};

export default KakaoButton;
