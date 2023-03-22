import { Box, Image } from "@chakra-ui/react";

const ImageContainer = () => {
  return (
    <Box
      height={"100%"}
      marginLeft={"1.5em"}
      paddingY={"1.5em"}
      overflow={"hidden"}
    >
      <Box
        height={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        width={"100vw"}
      >
        <Box
          flexGrow={"2"}
          height={"100%"}
          overflow={"hidden"}
          marginRight={"2em"}
        >
          <Image
            height={"100%"}
            objectFit={"cover"}
            src={process.env.PUBLIC_URL + "/images/keywords-image.jpg"}
          ></Image>
        </Box>
        <Box
          flexGrow={"1"}
          height={"100%"}
          overflow={"hidden"}
          marginRight={"2em"}
        >
          <Image
            height={"100%"}
            objectFit={"cover"}
            src={process.env.PUBLIC_URL + "/images/survey-image.jpg"}
          ></Image>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageContainer;
