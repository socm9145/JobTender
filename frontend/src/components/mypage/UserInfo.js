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
        <Divider borderColor={"black"} />
        <Box
            display={"flex"}
            minHeight={"7.5em"}
            paddingTop={"0.9375em"}
            paddingBottom={"1.875em"}
            justifyContent={"flex-end"}
            alignItems={"flex-start"}
        >
            <Box
                display={"flex"}
                overflow={"hidden"}
                width={"19.375em"}
                paddingRight={"2em"}
                justifyContent={"flex-start"}
            >
                <Box
                    opacity={"1"}
                >
                    <Text
                        color={"#969696"}
                        fontFamily={"Aktivgroteskcrop, sans-serif"}
                        fontSize={".8125rem"}
                        lineHeight={"1.3846153846153846"}
                        textTransform={"uppercase"}
                    >{props.title}</Text>
                </Box>
            </Box>
            <Box
                display={"flex"}
                overflow={"hidden"}
                paddingRight={"2em"}
                alignItems={"flex-start"}
                flex={"1"}
            >
                <Box
                    opacity={"1"}
                >
                    <Text
                        fontFamily={"Recklessneue,sans-serif"}
                        fontSize={"1.25em"}
                        lineHeight={"1.2"}
                        fontWeight={"400"}
                        textTransform={"none"}
                    >{props.value}</Text>
                </Box>
            </Box>
        </Box>
      </Box>
    );
  };
  
  export default UserInfo;
  