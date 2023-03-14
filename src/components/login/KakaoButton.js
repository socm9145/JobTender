import { Box } from "@chakra-ui/react";
const KakaoButton = ({ buttonWidth }) => {
  return (
    <div>
      <a>
        <Box display={"flex"} justifyContent={"center"}>
          <img
            src={process.env.PUBLIC_URL + "/images/kakaoButton.jpg"}
            width={buttonWidth}
          />
        </Box>
      </a>
    </div>
  );
};

export default KakaoButton;
