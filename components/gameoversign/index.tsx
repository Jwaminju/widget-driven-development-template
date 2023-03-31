import { Center } from "@chakra-ui/layout";
import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import LinkToNext from "../LinkToNext";

interface Props {}

const GameOverSign = () => {
    return (
      <Center position={"fixed"} left={0} top={0} zIndex={100} width={"100%"} height={"100%"}>
        <Card width={"xl"} height={"xl"}>
            <CardHeader>
                <Heading size='md'>Game Over!</Heading>
            </CardHeader>
            <CardBody>
                <Text>Good Job!</Text>
            </CardBody>
            <CardFooter>
                <LinkToNext label={"Check the result"} nextPageRoute={"/ending"} />
            </CardFooter>
        </Card>
      </Center>
    )
}

export default GameOverSign
