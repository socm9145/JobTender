import { 
    Box, Text, Divider, Stack, RadioGroup, Radio,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, 
  } from "@chakra-ui/react";
  import MyHistory from "../../components/mypage/History";
  import UserInfo from "../../components/mypage/UserInfo"
  
  const Mypage = () => {
      return (
          // 마이페이지
        <Box  width={"100vw"}>
          <Box
          id={"a"}
          width={"100vw"}
          paddingRight={"2.5em"}
          paddingLeft={"2.5em"}
          display={"flex"}
          height={"100vh"}
          backgroundColor={"#f1efe9"}
          alignItems={"center"}
          >
        <Box
            paddingTop={"2.5em"}
            paddingBottom={"2.5em"}
            >
                {/* 마이페이지 콘텐츠 */}
            <Box
                position={"relative"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"stretch"}
                flexDirection={"row"}
            >
                {/* 유저 상세정보 */}
                <Box
                    position={"sticky"}
                    top={"4.1em"}
                    display={"flex"}
                    width={"41.875em"}
                    height={"100%"}
                    paddingRight={"1.25em"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                >
                    {/* 이름 */}
                    <Box
                        display={"flex"}
                        maxWidth={"36em"}
                        marginBottom={"3.75em"}
                        justifyContent={"flex-start"}
                        flexWrap={"wrap"}
                    >
                        <Text
                            lineHeight={"1"}
                            fontSize={"2.125em"}
                            textTransform={"uppercase"}
                            marginTop={"0"}
                            marginBottom={"0"}
                            fontWeight={"400"}
                        >회원정보</Text>

                    </Box>
                    {/* 회원정보 */}
                    <UserInfo title={"이름"} value={"김싸피"}></UserInfo>
                    <UserInfo title={"이메일"} value={"test@test.com"}></UserInfo>
                    <UserInfo title={"성별"} value={"M"}></UserInfo>
                    <UserInfo title={"나이"} value={"20"}></UserInfo>

                </Box>
                <Box>
                    <Divider height={"100%"} orientation={"vertical"} borderColor={"black"} />
                </Box>
                {/* 히스토리 */}
                <Box
                    paddingLeft={"2.1875em"}
                    position={"sticky"}
                    top={"4.1em"}
                    display={"flex"}
                    width={"41.875em"}
                    height={"100%"}
                    paddingRight={"1.25em"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                >
                    <Box
                        display={"flex"}
                        maxWidth={"36em"}
                        marginBottom={"3.75em"}
                        justifyContent={"flex-start"}
                        flexWrap={"wrap"}
                    >
                        <Text
                            lineHeight={"1"}
                            fontSize={"2.125em"}
                            textTransform={"uppercase"}
                            marginTop={"0"}
                            marginBottom={"0"}
                            fontWeight={"400"}
                        >이력</Text>

                    </Box>
                    {/* 이력 콘텐츠 */}
                    <Box
                        // position={"sticky"}
                        // top={"4.1em"}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-around"}

                    >
                        <MyHistory></MyHistory>
                        <MyHistory></MyHistory>
                        {/* <MyHistory></MyHistory>
                        <MyHistory></MyHistory>
                        <MyHistory></MyHistory>
                        <MyHistory></MyHistory> */}
                    </Box>
                </Box>
            </Box>
        </Box>
      </Box>
      </Box>
    );
  };
  
  export default Mypage;
  