import { 
    Box,
    Text,
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
    const logo_path = process.env.PUBLIC_URL + "/companyLogo/";
    const size = "28%";
    const borderRadius = "12px";
    return(
        <Card 
        backgroundColor={"rgba(0, 0, 0, 0.05);"}
        // color={"gray.100"}
        // backgroundColor={"rgba(0, 0, 0, 0.5);"}
            // backgroundColor={"black"}
            width={"273px"}
            height={"fit-content"}
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
                    <Box display={"flex"} justifyContent={"space-around"}>
                        <Text fontFamily={"dalserB"} fontSize={"3xl"}>{keyword[0]}</Text>
                        <Text fontFamily={"dalserB"} fontSize={"3xl"}>{keyword[1]}</Text>
                        <Text fontFamily={"dalserB"} fontSize={"3xl"}>{keyword[2]}</Text>
                    </Box>
                </Box>
            </CardBody>
            <CardFooter>
                <Box width={"100%"}>
                    <Text fontFamily={"dalserM"} marginBottom={"2%"}>추천 기업</Text>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Image borderRadius={borderRadius} width={size} height={size} src={logo_path+company[0]+".png"} />
                        <Image borderRadius={borderRadius} width={size} height={size} src={logo_path+company[1]+".png"} />
                        <Image borderRadius={borderRadius} width={size} height={size} src={logo_path+company[2]+".png"} />
                    </Box>
                </Box>
            </CardFooter>
        </Card>
    );
};

export default History;