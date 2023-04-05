import { Box, Text, Divider } from "@chakra-ui/react";

const UserInfo = (props) => {
  return (
    // 마이페이지
    <Box
      display={"flex"}
      width={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
    >
      <Divider borderColor={"black"} borderRadius={"100px"} />
      <Box
        display={"flex"}
        minHeight={"7.5em"}
        paddingTop={"0.9375em"}
        paddingBottom={"1.875em"}
        justifyContent={"flex-end"}
        alignItems={"flex-start"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          overflow={"hidden"}
          width={"6.375em"}
          paddingLeft={"0.5em"}
          justifyContent={"flex-start"}
        >
          <Box opacity={"1"}>
            <Text
              color={"#969696"}
              // fontFamily={"Aktivgroteskcrop, sans-serif"}
              //   fontFamily={"dodum"}
              //   fontFamily={"jungnaL"}
              fontSize={".8125rem"}
              lineHeight={"1.3846153846153846"}
              textTransform={"uppercase"}
            >
              {props.title}
            </Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          overflow={"hidden"}
          paddingTop={"2em"}
          paddingRight={"1em"}
          alignItems={"flex-start"}
          flex={"1"}
          width={"100%"}
          flexDirection={"row-reverse"}
        >
          <Box opacity={"1"}>
            <Text
              // fontFamily={"Recklessneue,sans-serif"}
              //   fontFamily={"jungnaL"}
              fontFamily={"taebaek"}
              //   fontFamily={"dodum"}
              fontSize={"1.25em"}
              lineHeight={"1.2"}
              fontWeight={"bold"}
              textTransform={"none"}
            >
              {props.value}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
