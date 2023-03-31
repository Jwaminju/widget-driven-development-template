import {Card, CardBody, CardFooter, CardHeader, Heading, Text} from "@chakra-ui/react";
import LinkToNext from "../LinkToNext";

interface Props {}

const GameOverSign = ({}: Props) => {
    return (
      <Card>
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
    )
}

export default GameOverSign
