import "../../../styles/result/RecommendCorp3.css";
import { useAppSelector } from "../../../hooks/hooks";
import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const RecommendedCorp = () => {
  const company1 = useAppSelector((state) => state.result.chart2_1.name);
  const company2 = useAppSelector((state) => state.result.chart2_2.name);
  const company3 = useAppSelector((state) => state.result.chart2_3.name);

  useEffect(()=>{
    
  },[company1, company2, company3])

  return (
    <Box
      className={"hero-section"}
      display={"flex"}
      alignItems={"end"}
      justifyContent={"end"}
      width={"100vw"}
      height={"100%"}
      paddingBottom={"3%"}
      paddingRight={"3%"}
    >
      <Box className="reco-card-grid">
        <Box className="reco-card">
          <Box
            className="reco-card__background"
            boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.5)"}
            backgroundColor={"white"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              padding={"3%"}
              paddingBottom={"2%"}
              width={"100%"}
              className="reco-card__content"
              borderBottom={"solid 1px black"}
            >
              <Text
                paddingLeft={"3%"}
                textAlign={"start"}
                fontFamily={"dodum"}
                className="reco-card__heading"
                width={"100%"}
              >
                {company1}
              </Text>
              <Text paddingRight={"3%"} className="reco-card__category">
                1
              </Text>
            </Box>
            <Box
              flexGrow={"1"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"65%"}
            >
              <Image
                width={"100%"}
                borderRadius={"20px"}
                src={"/companyLogo/" + company1 + ".png"}
              />
            </Box>
          </Box>
        </Box>
        <Box className="reco-card">
          <Box
            className="reco-card__background"
            boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.5)"}
            backgroundColor={"white"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              padding={"3%"}
              paddingBottom={"2%"}
              width={"100%"}
              className="reco-card__content"
              borderBottom={"solid 1px black"}
            >
              <Text
                paddingLeft={"3%"}
                textAlign={"start"}
                fontFamily={"dodum"}
                className="reco-card__heading"
                width={"100%"}
              >
                {company2}
              </Text>
              <Text paddingRight={"3%"} className="reco-card__category">
                2
              </Text>
            </Box>
            <Box
              flexGrow={"1"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"65%"}
            >
              <Image
                width={"100%"}
                borderRadius={"20px"}
                src={"/companyLogo/" + company2 + ".png"}
              />
            </Box>
          </Box>
        </Box>
        <Box className="reco-card">
          <Box
            className="reco-card__background"
            boxShadow={"5px 5px 5px 5px rgba(0,0,0,0.5)"}
            backgroundColor={"white"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              padding={"3%"}
              paddingBottom={"2%"}
              width={"100%"}
              className="reco-card__content"
              borderBottom={"solid 1px black"}
            >
              <Text
                paddingLeft={"3%"}
                textAlign={"start"}
                fontFamily={"dodum"}
                className="reco-card__heading"
                width={"100%"}
              >
                {company3}
              </Text>
              <Text paddingRight={"3%"} className="reco-card__category">
                3
              </Text>
            </Box>
            <Box
              flexGrow={"1"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"65%"}
            >
              <Image
                width={"100%"}
                borderRadius={"20px"}
                src={"/companyLogo/" + company3 + ".png"}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendedCorp;
