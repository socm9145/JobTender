import { Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      zIndex={1}
      display={"flex"}
      position={"fixed"}
      top={"0%"}
      justifyContent={"space-between"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      height={"48px"}
      px={"28px"}
      backgroundColor={"#f1efe9"}
      color={"#191919"}
    >
      <Box border={"solid 1px #191919"}>JTD</Box>
      {/* 로그인 상태관리를 통해서 mypage버튼 활성화 비활성화 */}
      <Box border={"solid 1px #191919"}>mypage</Box>
    </Box>
  );
};

export default Navbar;
