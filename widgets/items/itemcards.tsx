import { Wrap, WrapItem, Tabs, TabList, Tab, TabPanels, TabPanel, useColorModeValue, SimpleGrid, Box, Container } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useState } from "react";
import { ItemDataInterface } from "../../data/items.interface";

interface itemsSpec {
    children: React.ReactNode;
    property: ItemDataInterface;
};

const ItemCards = ({property}:itemsSpec) => {

    const colors = useColorModeValue(
        ['blue.100', 'red.100', 'yellow.100'],
        ['blue.900', 'red.900', 'yellow.900'],
      )

      const [tabIndex, setTabIndex] = useState(0)
      const bg = colors[tabIndex]
    return (

    <Tabs isFitted variant='enclosed' onChange={(index) => setTabIndex(index)} bg={bg} borderTopRadius='lg' minH="100%">
    <TabList mb='1em'>
        <Tab fontWeight='bold'>Individual Action</Tab>
        <Tab fontWeight='bold'>Business Action</Tab>
        <Tab fontWeight='bold'>National Action</Tab>
    </TabList>
    <TabPanels>
        <TabPanel padding='1%'> 

            <Wrap spacing='8%' justify='center' > 
                <WrapItem>
                    {Array(4).fill('').map((_, i) => (
                        // eslint-disable-next-line react/jsx-key
                        <Avatar size='2xl' name={property.name} src={property.img} p='1%'>
                            <AvatarBadge boxSize='1.25em' bg='teal.300'> {property.tier} </AvatarBadge> 
                        </Avatar>
                    ))}
                </WrapItem> 

                <WrapItem>
                    {Array(4).fill('').map((_, i) => (
                        // eslint-disable-next-line react/jsx-key
                        <Avatar size='2xl' name={property.name} src={property.img} p='1%'>
                            <AvatarBadge boxSize='1.25em' bg='teal.300'> {property.tier} </AvatarBadge> 
                        </Avatar>
                    ))}
                </WrapItem> 

                <WrapItem padding='1%'>
                    {Array(4).fill('').map((_, i) => (
                        // eslint-disable-next-line react/jsx-key
                        <Avatar size='2xl' name={property.name} src={property.img} p='1%'>
                            <AvatarBadge boxSize='1.25em' bg='teal.300'> {property.tier} </AvatarBadge> 
                        </Avatar>
                    ))}
                </WrapItem> 
            </Wrap>
        </TabPanel>

        <TabPanel>
       
        </TabPanel>

        <TabPanel>
        
        </TabPanel>
    
    </TabPanels>
    </Tabs>

    )
}

export default ItemCards