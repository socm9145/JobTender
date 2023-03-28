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

const History = (props) => {
    const keyword = [props.keyWords[0], props.keyWords[1], props.keyWords[2]];
    const company = [props.companies[0], props.companies[1], props.companies[2]];
    return(
        <Card 
        backgroundColor={"rgba(0, 0, 0, 0.05);"}
        // color={"gray.100"}
        // backgroundColor={"rgba(0, 0, 0, 0.5);"}
            // backgroundColor={"black"}
            width={"273px"}
            height={"273px"}
            marginRight={"3em"}
            marginBottom={"2em"}
            borderRadius={"20px"}
            boxShadow={"md"}
        >
            <CardHeader>
                <Heading size={"md"} fontFamily={"dodum"}>{props.date}</Heading>
            </CardHeader>
            <CardBody>
                <Box>
                    <Text fontFamily={"dalserM"}>선택한 키워드</Text>
                    <Stack spacing={5} direction={"row"}>
                        <Text fontFamily={"dalserB"} fontSize={"3xl"}>{keyword[0]}</Text>
                        <Text fontFamily={"dalserB"} fontSize={"3xl"}>{keyword[1]}</Text>
                        <Text fontFamily={"dalserB"} fontSize={"3xl"}>{keyword[2]}</Text>
                    </Stack>
                </Box>
            </CardBody>
            <CardFooter>
                <Box>
                    <Text fontFamily={"dalserM"}>추천 기업</Text>
                    <Stack>
                        {/* <Image>이미지</Image>
                        <Image>이미지</Image>
                        <Image>이미지</Image> */}
                        <Stack spacing={5} direction={"row"}>
                            <Text>{company[0]}</Text>
                            <Text>{company[1]}</Text>
                            <Text>{company[2]}</Text>
                        </Stack>
                    </Stack>
                </Box>
            </CardFooter>
        </Card>
    );
};

export default History;