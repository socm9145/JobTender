import KakaoButton from "../../../components/login/KakaoButton";

const Login = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin_right: "100px",
        }}
      >
        {/* 로그인 페이지 */}
        <div
          style={{
            backgroundColor: "white",
            width: "200px",
            height: "200px",
            marginRight: "200px",
            opacity: "0.7",
          }}
        >
          {/* 내용 추가 */}
          <KakaoButton buttonWidth={200} />
        </div>
      </div>
    </div>
  );
};

export default Login;
