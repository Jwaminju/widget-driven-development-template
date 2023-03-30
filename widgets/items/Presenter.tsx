import {
    Box, Button, Container, Heading, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalOverlay, SimpleGrid, Spacer, Tooltip, useDisclosure
} from "@chakra-ui/react";
import ItemSpecCard from "../../components/ItemSpecCard";
import { ItemDataInterface, ItemSelectInterface } from "../../data/items.interface";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ItemCards from "./itemcards";

interface Props {
  sceneTitle?: string;
  data: ItemDataInterface[];
  select: (arg1?: any, arg2?: any) => any;
  itemSelected: ItemSelectInterface;
  currItem: ItemDataInterface;
  getCurrItem: (arg1?: any) => any;
  getLastSelection: (arg1?: any) => any;
}



const Presenter = ( props : Props) => {

    const { width, height } = useWindowDimensions();
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
        <Container> 
            <Tooltip label='Select item'>
                <Button onClick={onOpen}> Item Box </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bgColor='blackAlpha.700' />
                <ModalContent 
                    p='1%' 
                    minHeight={height!/100*95} 
                    minWidth={width!/100*95} 
                    alignSelf='center'
                    backgroundColor='whiteAlpha.800'
                    opacity='50%'>
                <ModalBody >
                    <ModalCloseButton backgroundColor='white'/>
                    <SimpleGrid spacing='1%'>  
                        <Heading size='lg' > {props.sceneTitle} </Heading> 
                        <Box minWidth="90%" minHeight={height!/100*55}> {/* minHeight={height!/100*60} */}
                            <ItemCards 
                                property={props.data}
                                getCurrItem={props.getCurrItem}
                                selected={props.itemSelected}> </ItemCards> 
                        </Box>
                        <Box minWidth={width!/100*90} minHeight={height!/100*20}> 
                            <ItemSpecCard 
                                property={props.currItem} 
                                select={props.select} 
                                selected={props.itemSelected}
                                getLastSelection={props.getLastSelection}></ItemSpecCard>
                        </Box>
                    </SimpleGrid>
                    <Spacer/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
}

export default Presenter
