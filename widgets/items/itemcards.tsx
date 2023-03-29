import { Wrap, WrapItem, Tabs, TabList, Tab, TabPanels, TabPanel, useColorModeValue, SimpleGrid, Box, Container } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useState } from "react";
import { ItemDataInterface, ItemSelectInterface } from "../../data/items.interface";
import ItemCardWrap from "../../components/ItemCardWrap";

interface itemsSpec {
    children: React.ReactNode;
    property: ItemDataInterface[];
    getCurrItem: (arg1?: any) => any;
    selected: ItemSelectInterface;
};

const ItemCards = (props:itemsSpec) => {

    const colors = useColorModeValue(
        ['blue.100', 'red.100', 'yellow.100'],
        ['blue.900', 'red.900', 'yellow.900'],
      )

    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]

    const myClick = () => {
        props.getCurrItem({})
    }
    return (

    <Tabs isFitted variant='enclosed' onChange={(index) => setTabIndex(index)} bg={bg} borderTopRadius='lg' minH="100%">
    <TabList mb='1em'>
        <Tab fontWeight='bold' onClick={myClick}>Individual Action</Tab>
        <Tab fontWeight='bold' onClick={myClick}>Business Action</Tab>
        <Tab fontWeight='bold' onClick={myClick}>National Action</Tab>
    </TabList>
    <TabPanels>
        <TabPanel padding='1%'> 
            <ItemCardWrap 
                property={props.property} 
                getCurrItem={props.getCurrItem} 
                selected={props.selected['person']}></ItemCardWrap>
        </TabPanel>

        <TabPanel>
            {/* <ItemCardWrap 
                property={props.property} 
                getCurrItem={props.getCurrItem} 
                selected={props.selected['person']}></ItemCardWrap> */}
        
        </TabPanel>

        <TabPanel>
            {/* <ItemCardWrap 
                property={props.property} 
                getCurrItem={props.getCurrItem} 
                selected={props.selected['person']}></ItemCardWrap> */}
        
        </TabPanel>
    
    </TabPanels>
    </Tabs>

    )
}

export default ItemCards