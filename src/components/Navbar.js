import { Box } from "@chakra-ui/react";
const Navbar = () => {
  return (
    <Box
      display={"flex"}
      position={"sticky"}
      top={"0%"}
      justifyContent={"space-between"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      height={"48px"}
      px={"28px"}
    >
      <Box border={"solid 1px black"}>logo</Box>
      <Box border={"solid 1px black"}>mypage</Box>
    </Box>
  );
};

export default Navbar;
