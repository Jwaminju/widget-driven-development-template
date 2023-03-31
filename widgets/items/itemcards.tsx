import {Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue} from "@chakra-ui/react";
import {useState} from "react";
import ItemCardWrap from "../../components/ItemCardWrap";
import {ItemDataInterface, ItemSelectInterface} from "../../models/items.interface";

interface itemsSpec {
    children: React.ReactNode;
    property: ItemDataInterface[];
    getCurrItem: (arg1?: any) => any;
    selected: ItemSelectInterface;
};

const ItemGroupType = ["person", "enterprise", "country"];

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