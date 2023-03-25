import { Wrap, WrapItem, Tabs, TabList, Tab, TabPanels, TabPanel, useColorModeValue, SimpleGrid, Box } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useState } from "react";

const ItemCards = () => {

    const colors = useColorModeValue(
        ['blue.100', 'red.100', 'yellow.100'],
        ['blue.900', 'red.900', 'yellow.900'],
      )

      const [tabIndex, setTabIndex] = useState(0)
      const bg = colors[tabIndex]
    return (

    <Tabs isFitted variant='enclosed' onChange={(index) => setTabIndex(index)} bg={bg} borderTopRadius='lg' >
    <TabList mb='1em'>
        <Tab fontWeight='bold'>Individual Action</Tab>
        <Tab fontWeight='bold'>Business Action</Tab>
        <Tab fontWeight='bold'>National Action</Tab>
    </TabList>
    <TabPanels>
        <TabPanel> 

            <Wrap gridColumn={[2, null, 3]} spacing='40px'>
                <WrapItem>
                    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </WrapItem>
                <WrapItem>
                    <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
                <WrapItem>
                    <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                </WrapItem>
                <WrapItem>
                    <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                </WrapItem>
                <WrapItem>
                    <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                </WrapItem>
                <WrapItem>
                    <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                </WrapItem>
                <WrapItem>
                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                </WrapItem>
            </Wrap>

        </TabPanel>
        <TabPanel>
         <p>two!</p>

        </TabPanel>
        <TabPanel>
        <p>tree!</p>
        </TabPanel>
    </TabPanels>
    </Tabs>

    )
}

export default ItemCards


