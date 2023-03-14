import Heading1 from "../../components/Heading1";
import LinkToNext from "../../components/LinkToNext";
import {Center} from "@chakra-ui/layout";
import {Container} from "@chakra-ui/react";
interface Props {
  sceneTitle?: string;
  labelForLinkToNext?: string;
}

const Presenter = ({
  sceneTitle,
  labelForLinkToNext
                   }: Props) => {
    return (
      <Center w={'100vw'} h={'100vh'} backgroundImage={'url(/melting_ice_northpole.jpg)'} backgroundRepeat={'no-repeat'} backgroundPosition={'center'}>
        <Container>
          <Heading1 label={sceneTitle} />
          <LinkToNext label={labelForLinkToNext} />
        </Container>
      </Center>
    );
}

export default Presenter
