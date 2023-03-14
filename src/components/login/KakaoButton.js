const KakaoButton = ({ buttonWidth }) => {
  return (
    <div style={{ opacity: "1" }}>
      <li>
        <a id="custom-login-btn">
          <img
            src={process.env.PUBLIC_URL + "/images/kakaoButton.jpg"}
            width={buttonWidth}
          />
        </a>
      </li>
    </div>
  );
};

export default KakaoButton;
