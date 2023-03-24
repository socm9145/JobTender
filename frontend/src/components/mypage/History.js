import { 
    Box,
    Text,
    Stack,
    Image,
    Card,
    CardHeader, 
    CardBody, 
    CardFooter,
    Heading,
 } from "@chakra-ui/react"

const History = () => {
    return(
        <Card 
            backgroundColor={"rgba(255, 255, 255, 0.75);"}
            width={"273px"}
            height={"273px"}
        >
            <CardHeader>
                <Heading size={"md"}>2023.03.27</Heading>
            </CardHeader>
            <CardBody>
                <Box>
                    <Text>선택한 키워드</Text>
                    <Stack spacing={5} direction={"row"}>
                        <Text fontSize={"3xl"}>성장</Text>
                        <Text fontSize={"3xl"}>혁신</Text>
                        <Text fontSize={"3xl"}>창의</Text>
                    </Stack>
                </Box>
            </CardBody>
            <CardFooter>
                <Box>
                    <Text>추천 기업</Text>
                    <Stack>
                        {/* <Image>이미지</Image>
                        <Image>이미지</Image>
                        <Image>이미지</Image> */}
                        <Stack spacing={5} direction={"row"}>
                            <Text>기업로고</Text>
                            <Text>기업로고</Text>
                            <Text>기업로고</Text>
                        </Stack>
                    </Stack>
                </Box>
            </CardFooter>
        </Card>
    );
};

export default History;