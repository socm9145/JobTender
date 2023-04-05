import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { userhistory, userinfo } from '../../api/mypageAxios';
import { setUserData, setUserId } from '../../redux/user/userSlice'
import { setHistory, setReHistory, initHistory } from '../../redux/mypage/mypageSlice';

import MyHistory from "../../components/mypage/History";
import UserInfo from "../../components/mypage/UserInfo";

import "../../styles/Mypage.css";
import { Box, Text, Divider } from "@chakra-ui/react";

const Mypage = () => {
  const dispatch = useAppDispatch();
  const userid = useAppSelector(state=>state.user.userId);
  const userInfo = useAppSelector(state=>state.user.userData);
  const historyData = useAppSelector(state=>state.mypage.reHistory);

  function historyFuntion(data){
    dispatch(initHistory());
    const keys = Object.keys(data);
    for(const key of keys){
      const no = key;
      let date = data[key].createDate.split("T")[0];
      date = date.replaceAll("-", ".");
      const tmp = data[key];
      let words = []
      let companie = []
      if(tmp.keywords.length !== 0){
        words = [tmp.keywords[0].keywordName, tmp.keywords[1].keywordName, tmp.keywords[2].keywordName];
      }else{
        continue
      }
      if(tmp.companies.length !== 0){
        companie = [tmp.companies[0].companyName, tmp.companies[1].companyName, tmp.companies[2].companyName];
      }else{
        continue
      }
      dispatch(setReHistory([no, date, words, companie]))
    }
  }
  useEffect(()=>{
    dispatch(setUserId(sessionStorage.getItem("userId")));
    async function getUserInfo(){
      await userinfo(
        userid,
        data => {
          dispatch(setUserData(data.data));
        },
        error => {
          console.log(error);
        }
      )
    }

    async function getUserHistory(){
      await userhistory(
        userid,
        data => {
          dispatch(setHistory(data.data));
          historyFuntion(data.data);
        },
        error => {
          console.log(error);
        }
      )
    }

    getUserInfo();
    getUserHistory();
  },[])
  return (
    <Box
      id={"a"}
      display={"flex"}
      justifyContent={"center"}
      height={"100vh"}
      alignItems={"center"}
      backgroundImage={"https://picsum.photos/1600/800"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
    >
      <Box
        maxWidth={"60vw"}
        minWidth={"1440px"}
        // width={"100%"}
        height={"75vh"}
        paddingTop={"3.5em"}
        paddingBottom={"6.5em"}
        backgroundColor={"rgba(255,255,255,0.9)"}
        borderRadius={"20px"}

        // opacity={"0.6"}
      >
        {/* 마이페이지 콘텐츠 */}
        {/* <Divider
          width={"100%"}
          borderWidth={"0.12em"}
          borderColor={"black"}
          marginBottom={"4em"}
        /> */}

        <Box
          height={"100%"}
          position={"relative"}
          display={"flex"}
          // justifyContent={"flex-start"}
          alignItems={"stretch"}
          flexDirection={"row"}
          paddingRight={"2.5em"}
          paddingLeft={"2.5em"}
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
                  fontSize={"2vw"}
                  textTransform={"uppercase"}
                  marginTop={"0"}
                  marginBottom={"0"}
                  fontWeight={"bold"}
                  className={"info"}
                  fontFamily={"taebaek"}
                >
                  회원정보
                </Text>
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
                  fontSize={"2vw"}
                  textTransform={"uppercase"}
                  marginTop={"0"}
                  marginBottom={"0"}
                  fontWeight={"bold"}
                  color={"black"}
                  fontFamily={"taebaek"}
                  paddingX={"0.2em"}
                >
                  /
                </Text>
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
                  fontSize={"2vw"}
                  textTransform={"uppercase"}
                  marginTop={"0"}
                  marginBottom={"0"}
                  //   fontWeight={"400"}
                  className={"update"}
                  fontFamily={"taebaek"}
                  fontWeight={"bold"}
                >
                  수정
                </Text>
              </Box>
            </Box>
            {/* 회원정보 */}
            <UserInfo title={"이름"} value={userInfo.name}></UserInfo>
            <UserInfo title={"성별"} value={userInfo.gender.toUpperCase()}></UserInfo>
            <UserInfo title={"나이"} value={userInfo.age}></UserInfo>
            <UserInfo title={"가입일"} value={userInfo.createDate}></UserInfo>
          </Box>
          <Box>
            <Divider
              height={"100%"}
              borderWidth={"0.1em"}
              orientation={"vertical"}
              borderColor={"black"}
            />
          </Box>
          {/* 히스토리 */}
          <Box
            paddingLeft={"2.1875em"}
            position={"sticky"}
            top={"4.1em"}
            display={"flex"}
            // width={"41.875em"}
            width={"75%"}
            height={"100%"}
            paddingRight={"1.25em"}
            flexDirection={"column"}
            // height={"40em"}
            // overflowY={"auto"}
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
                fontSize={"2vw"}
                textTransform={"uppercase"}
                marginTop={"0"}
                marginBottom={"0"}
                // fontWeight={"400"}
                className={"history"}
                fontFamily={"taebaek"}
                fontWeight={"bold"}
              >
                이력
              </Text>
            </Box>
            {/* 이력 콘텐츠 */}
            <Box
              position={"sticky"}
              top={"4.1em"}
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"wrap"}
              justifyContent={"flex-start"}
              overflowY={"auto"}
            >
              {historyData.map((history) => (
                <MyHistory
                  id={history[0]}
                  date={history[1]}
                  keyWords={history[2]}
                  companies={history[3]}
                ></MyHistory>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Mypage;
