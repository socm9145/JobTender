import { Box, Text, Divider } from "@chakra-ui/react";
import MyHistory from "../../components/mypage/History";
import UserInfo from "../../components/mypage/UserInfo"
import "../../styles/Mypage.css"
  
  const Mypage = () => {
    const historyData = [["2023.03.27", ["성장", "혁신", "창의"], ["추천기업", "추천기업", "추천기업"]],
    ["2023.03.21", ["성장", "창의", "도전"], ["추천기업", "추천기업", "추천기업"]],
    ["2023.03.22", ["가자", "취업", "힘내"], ["추천기업", "추천기업", "추천기업"]],
    ["2023.03.23", ["아자", "도전", "창의"], ["추천기업", "추천기업", "추천기업"]],
    ["2023.03.24", ["혁신", "도전", "성장"], ["추천기업", "추천기업", "추천기업"]]]
      return (
          // 마이페이지
        // <Box  width={"100vw"}>
          <Box
          id={"a"}
          paddingRight={"2.5em"}
          paddingLeft={"2.5em"}
          display={"flex"}
          height={"100vh"}
          backgroundColor={"#f1efe9"}
          alignItems={"center"}
          >
        <Box
            width={"100%"}
            paddingTop={"2.5em"}
            paddingBottom={"2.5em"}
            >
                {/* 마이페이지 콘텐츠 */}
                <Divider width={"100%"} borderWidth={"0.12em"} borderColor={"black"} marginBottom={"4em"} />
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
                    // width={"41.875em"}
                    width={"25%"}
                    height={"100%"}
                    paddingRight={"1.25em"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                >
                    {/* 이름 */}
                    <Box
                        display={"flex"}
                        maxWidth={"36em"}
                        justifyContent={"flex-start"}
                        flexWrap={"wrap"}
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
                                fontSize={"2.65em"}
                                textTransform={"uppercase"}
                                marginTop={"0"}
                                marginBottom={"0"}
                                fontWeight={"400"}
                                className={"info"}
                                fontFamily={"dodum"}
                            >회원정보</Text>

                        </Box>
                        <Box
                            display={"flex"}
                            maxWidth={"36em"}
                            marginBottom={"3.75em"}
                            justifyContent={"flex-start"}
                            flexWrap={"wrap"}
                        >
                            <Text
                                lineHeight={"1"}
                                fontSize={"2.65em"}
                                textTransform={"uppercase"}
                                marginTop={"0"}
                                marginBottom={"0"}
                                fontWeight={"400"}
                                color={"#969696"}
                                fontFamily={"dodum"}
                            >/</Text>
                        </Box>
                        <Box
                            display={"flex"}
                            maxWidth={"36em"}
                            marginBottom={"3.75em"}
                            justifyContent={"flex-start"}
                            flexWrap={"wrap"}
                        >
                            <Text
                                lineHeight={"1"}
                                fontSize={"2.65em"}
                                textTransform={"uppercase"}
                                marginTop={"0"}
                                marginBottom={"0"}
                                fontWeight={"400"}
                                className={"update"}
                                fontFamily={"dodum"}
                            >수정</Text>
                        </Box>
                    </Box>
                    {/* 회원정보 */}
                    <UserInfo title={"이름"} value={"김싸피"}></UserInfo>
                    <UserInfo title={"이메일"} value={"test@test.com"}></UserInfo>
                    <UserInfo title={"성별"} value={"M"}></UserInfo>
                    <UserInfo title={"나이"} value={"20"}></UserInfo>
                    {/* <UserInfo title={"이력 수"} value={"12"}></UserInfo> */}
                </Box>
                <Box>
                    <Divider height={"100%"} borderWidth={"0.1em"} orientation={"vertical"} borderColor={"black"} />
                </Box>
                {/* 히스토리 */}
                <Box
                    paddingLeft={"2.1875em"}
                    position={"sticky"}
                    top={"4.1em"}
                    display={"flex"}
                    // width={"41.875em"}
                    width={"75%"}
                    // height={"100%"}
                    paddingRight={"1.25em"}
                    flexDirection={"column"}
                    height={"40em"}
                    overflowY={"auto"}
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
                            fontSize={"2.65em"}
                            textTransform={"uppercase"}
                            marginTop={"0"}
                            marginBottom={"0"}
                            fontWeight={"400"}
                            className={"history"}
                            fontFamily={"dodum"}
                        >이력</Text>

                    </Box>
                    {/* 이력 콘텐츠 */}
                    <Box
                        position={"sticky"}
                        top={"4.1em"}
                        display={"flex"}
                        flexDirection={"row"}
                        flexWrap={"wrap"}
                        
                        justifyContent={"flex-start"}
                    >
                        {
                            historyData.map((history, index) => (
                                <MyHistory date={history[0]} keyWords={history[1]} companies={history[2]}></MyHistory>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
            <Divider width={"100%"} borderWidth={"0.12em"} borderColor={"black"} marginTop={"4em"} />
        </Box>
      </Box>
    //   </Box>
    );
  };
  
  export default Mypage;
  