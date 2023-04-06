import "../../../styles/result/RecommendCorp3.css";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { Box, Image, Text } from "@chakra-ui/react";

const RecommendedCorp = () => {
  // const company1 = useAppSelector((state) => state.result.chart2_1.name);
  const company1 = "찌오컴퍼니";
  const compnay2 = useAppSelector((state) => state.result.chart2_2.name);
  const company3 = useAppSelector((state) => state.result.chart2_3.name);
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
            backgroundColor={"white"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              width={"70%"}
              borderRadius={"20px"}
              src={"/companyLogo/찌오.png"}
            />
          </Box>
          <Box
            padding={"7%"}
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
             찌오컴퍼니
            </Text>
            <Text className="reco-card__category">1</Text>
          </Box>
        </Box>
        <Box className="reco-card">
          <Box
            className="reco-card__background"
            backgroundColor={"white"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              width={"70%"}
              borderRadius={"20px"}
              src={"/companyLogo/"+compnay2+".png"}
            />
          </Box>
          <Box
            padding={"7%"}
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
              {compnay2}
            </Text>
            <Text className="reco-card__category">2</Text>
          </Box>
        </Box>
        <Box className="reco-card">
          <Box
            className="reco-card__background"
            backgroundColor={"white"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              width={"70%"}
              borderRadius={"20px"}
              src={"/companyLogo/"+company3+".png"}
            />
          </Box>
          <Box
            padding={"7%"}
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
            <Text className="reco-card__category">3</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendedCorp;

{
  /* <Box height={"100%"} border={"solid 1px black"}>
  1
</Box>
<Box height={"100%"} border={"solid 1px black"}>
  2
</Box>
<Box height={"100%"} border={"solid 1px black"}>
  3
</Box> */
}
