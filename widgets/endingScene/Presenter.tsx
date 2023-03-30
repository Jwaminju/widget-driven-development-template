import Heading1 from "../../components/Heading1";
import Heading2 from "../../components/Heading2";
import LinkToNext from "../../components/LinkToNext";
import { Center } from "@chakra-ui/layout";
import { Container, Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

interface Props {
  isDefeat?: boolean;
}

const Presenter = ({
  isDefeat,
}: Props) => {
  const expand = typeof window !== 'undefined' ? false : true


  if (isDefeat) {
    return (
      <Center w={'100vw'} h={'100vh'} backgroundImage={'url(/melting_ice_northpole.jpg)'} backgroundRepeat={'no-repeat'} backgroundPosition={'center'}>
        <Container>
          <Heading1 label={"Congratulation!"} />
          <Card w={"100%"} boxShadow='xs' p='6' rounded='md' >
            <CardHeader padding={6}>
              <Heading2 label={"You saved the earth🌎"} />
            </CardHeader>
            <CardFooter>
              <LinkToNext label={"Go back Main"} nextPageRoute={"/"} />
            </CardFooter>
          </Card>
        </Container>
      </Center>
    );
  } else {
    return (
      <Center w={'100vw'} h={'100vh'} backgroundImage={'url(/melting_ice_northpole.jpg)'} backgroundRepeat={'no-repeat'} backgroundPosition={'center'}>
        <Container>
          <Heading1 label={"You did your best!"} />
          <Card w={"100%"} boxShadow='xs' p='6' rounded='md' >
            <CardHeader padding={6}>
              <Heading2 label={"You'll do better next time."} />
            </CardHeader>
            <CardFooter>
              <LinkToNext label={"Start game again"} nextPageRoute={"/"} />
            </CardFooter>
          </Card>
        </Container>
      </Center>
    );
  }
}

export default Presenter
