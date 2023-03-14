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
      <Box border={"solid 1px white"}>mypage</Box>
    </Box>
  );
};

export default Navbar;
