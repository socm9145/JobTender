import React from "react";
import KakaoLogin from "react-kakao-login";

const Kakao = () => {
  const handleLogin = (response) => {
    console.log(response);
  };
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
    </div>
  );
};

export default Kakao;
