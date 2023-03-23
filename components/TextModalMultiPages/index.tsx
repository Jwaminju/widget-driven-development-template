import {Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay} from "@chakra-ui/react";
import {useState} from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface TextModalProps {
  textContents: string[];
  initOpen?:boolean;
  isOpen: boolean;
  onClose: () => void;
  footerItems?: JSX.Element[];
}

const TextModalMultiPages = ({
  textContents,
  initOpen,
  isOpen,
  onClose,
  footerItems
                   }: TextModalProps) => {

  const { width, height } = useWindowDimensions();
  const [ pageIdx, setPageIdx ] = useState(0);
  function pageMove(i:number) :void{
    if (i >= 0 && i < textContents.length) {
        setPageIdx(i)
    }
    if (i>=textContents.length){
      isOpen=false
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p='1%' minHeight={height!/100*25} minWidth={width!/100*80} alignSelf='center'>
          <ModalBody>
              {/* <ModalCloseButton /> */}
              <Flex  minW={width!/100*70} minH={height!/100*20}>
                  <Button variant='solid' height='' onClick={() => pageMove(pageIdx - 1)}> {'<'} </Button>
                  <Box verticalAlign='center' minH={height!/100*20} minW={width!/100*70} bg='tomato' p='1%' fontSize='xl' color='white'> {textContents[pageIdx]} </Box>
                  <Button variant='solid' height='' onClick={() => pageMove(pageIdx + 1)} > {'>'} </Button>
              </Flex>
          </ModalBody>
          <ModalFooter>
            {footerItems}
          </ModalFooter>
        </ModalContent>
    </Modal>
    </>
    );
}

export default TextModalMultiPages
