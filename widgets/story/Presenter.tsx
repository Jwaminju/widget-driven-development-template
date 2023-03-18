import {Center} from "@chakra-ui/layout";
import {Container} from "@chakra-ui/react";
import Heading2 from "../../components/Heading2";
import LinkToNext from "../../components/LinkToNext";
import { STORY_TXT } from "../../data/main_story";
import TextModalMultiPages from "../../components/TextModalMultiPages";
import { SimpleGrid, Button, Spacer, Flex} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react"
import Login from "../hello/Login";

interface Props {
  sceneTitle?: string;
  labelForLinkToNext?: string;
}

const Presenter = ({
  sceneTitle,
  labelForLinkToNext
                   }: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true, })

  return ( 
    <Center w={'100vw'} h={'100vh'} backgroundImage={'url(https://firebasestorage.googleapis.com/v0/b/green-5be28.appspot.com/o/globe-1849404.png?alt=media&token=11913eda-8200-4877-834d-f5622b989f4d)'} backgroundRepeat={'no-repeat'} backgroundPosition={'center'}>
      <SimpleGrid spacing="10%"> 
        <Spacer />
        <Container>
          <Flex>
            <Button onClick={onOpen} opacity={0.5} p='5%'>
              <Heading2 label={sceneTitle}/>
            </Button>
            <TextModalMultiPages 
              textContents={STORY_TXT} 
              initOpen={true}
              isOpen={isOpen} 
              onClose={onClose}/>
            <Spacer />
          </Flex>
        </Container>

        <Container>
          <Flex justifyContent='center'>
                <LinkToNext
                label={labelForLinkToNext} 
                title={'Login to Start'}
                color={'yellow'}/>
          </Flex>
        </Container>

        <Container>
          {/* <Login/> */}
        </Container>

        <Spacer />
      </SimpleGrid>
    </Center>
    );
}

export default Presenter
