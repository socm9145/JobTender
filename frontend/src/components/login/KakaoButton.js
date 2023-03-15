import { Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const KakaoButton = ({ buttonWidth }) => {
  const navigate = useNavigate();
  return (
    <div>
      <a>
        <Box display={"flex"} justifyContent={"center"}>
          <Image
            cursor={"pointer"}
            onClick={() => {
              navigate("/home");
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
