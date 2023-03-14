import { Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      zIndex={1}
      display={"flex"}
      position={"absolute"}
      top={"0%"}
      justifyContent={"space-between"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      height={"48px"}
      px={"28px"}
      color={"white"}
    >
      <Box border={"solid 1px white"}>JTD</Box>
      {/* 로그인 상태관리를 통해서 mypage버튼 활성화 비활성화 */}
      <Box border={"solid 1px white"}>mypage</Box>
    </Box>
  );
};

export default Navbar;
