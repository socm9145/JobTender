import { Link, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  useEffect(() => {
  }, [location]);
  if (location.pathname !== "/login" || location.pathname !== "/loading") {
    return (
      <Box
        zIndex={4}
        display={"flex"}
        position={"absolute"}
        top={"0%"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        alignItems={"center"}
        width={"100%"}
        height={"48px"}
        px={"28px"}
        // backgroundColor={"#f1efe9"}
        color={"white"}
      >
        <Box className={"homeFont"} fontSize={"2em"}>
          {
            sessionStorage.getItem("isLogin") ? <Link to="/home">JOBTENDER</Link> : <Link to="/">JOBTENDER</Link>
          }
        </Box>
        {/* 로그인 상태관리를 통해서 mypage버튼 활성화 비활성화 */}
        {location.pathname === "/mypage" ? null : (
          <Box className={"homeFont"} fontSize={"1.5em"}>
            {sessionStorage.getItem("isLogin") ? <Link to="/mypage">mypage</Link> : <Link to="/login">Login</Link>}
          </Box>
        )}
      </Box>
    );
  } else {
    <></>
  }
};

export default Navbar;
