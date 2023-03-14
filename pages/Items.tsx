import type { NextPage } from 'next'
import styles from "../styles/Items.module.css";
import Head from "next/head";
import { SimpleGrid, Center, ChakraProvider, Button, Spacer, Flex, Badge, Text, Box, Tooltip } from "@chakra-ui/react";
import useWindowDimensions from  "../widgets/hello/Screen/screen";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from "@chakra-ui/react"
import { url } from 'inspector';
import React, { forwardRef, useRef } from "react";

// const CustomButton = React.forwardRef(({title}) => (
//     <Button borderRadius={1} borderRightColor='black' textColor='black'>
//         {title}
//     </Button>

//   ))


const MenuButton = (title: string) => (
    <Button borderRadius={1} borderRightColor='black' textColor='black'>
    {title}
    </Button>
)
  
//   render(<CustomToolTip />)

const Items: NextPage = () => {
    const { width, height } = useWindowDimensions();
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true, })

    return (
        <ChakraProvider>
            <div className={styles.container}>
                <Head>
                    <title>CarbonHero</title>
                    <meta name="description" content="Education game for Global Warming"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main className={styles.main}>
                    <SimpleGrid spacing={height!/100*80}> 
                        <Flex>
                            <Spacer />
                            <Tooltip label='Select item'>
                                <Button onClick={onOpen}> Item Box </Button>
                            </Tooltip>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay bgColor='black' />
                                <ModalContent 
                                    p='1%' 
                                    minHeight={height!/100*95} 
                                    minWidth={width!/100*95} 
                                    alignSelf='center'
                                    bgImage={`https://i.stack.imgur.com/SvWWN.png`} >
                                <ModalBody >
                                    <ModalCloseButton backgroundColor='white'/>
                                    <SimpleGrid> 
                                        <Flex minHeight={height!/100*68}>
                                            <Box borderWidth='1px' borderTopLeftRadius='lg' minWidth={width!/100*70} >

                                                {/* <Flex color='white'>
                                                </Flex> */}
                                            </Box>

                                            <Box borderTopWidth='1px' borderRightWidth='1px' borderTopRightRadius='lg' minWidth={width!/100*20.5}>
                                                <SimpleGrid spacing='30%'> 
                                                    <Spacer />
                                                    <Flex color='white' maxW='' justifyContent='center'>
                                                        <Button minW='30%' borderRadius={1} borderRightColor='black' textColor='black' >Box 1</Button>
                                                        <Button minW='30%' borderRadius={1} borderRightColor='black' textColor='black'>Box 2</Button>
                                                        <Button minW='30%' borderRadius={1} borderRightColor='black' textColor='black'>Box 3</Button>
                                                    </Flex>
                                                </SimpleGrid> 
                                            </Box>

                                        </Flex>
                                        <Flex minHeight={height!/100*20}>
                                            <Box borderWidth='1px' borderBottomLeftRadius='lg' minWidth={width!/100*70}> sdf </Box>
                                            <Box borderRightWidth='1px' borderBottomWidth='1px' borderBottomRightRadius='lg' minWidth={width!/100*20.5}>  </Box>
                                        </Flex>
                                    </SimpleGrid>

                                    <Flex>
                                    {/* <Button variant='solid' height='' onClick={() => pageMove(pageIdx - 1)}> {'<'} </Button>
                                    {/* <StoryBox content={STORY_TXT[pageIdx].txt} /> */}
                                    {/* <Button variant='solid' height='' > {'>'} </Button>  */}
                                    </Flex>
                                </ModalBody>
                                </ModalContent>
                            </Modal>
                            <Spacer />
                        </Flex>
                        
                    
                    </SimpleGrid>
                </main>
            </div>
        </ChakraProvider>



    )
}

export default Items


// https://images.app.goo.gl/oXdZpRWq8X1FTDzDA


// <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
//                                         {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}

//                                     <Box p='6'>
//                                         <Box display='flex' alignItems='baseline'>
//                                         <Badge borderRadius='full' px='2' colorScheme='teal'>
//                                             New
//                                         </Badge>
//                                         <Box  
//                                             color='gray.500'
//                                             fontWeight='semibold'
//                                             letterSpacing='wide'
//                                             fontSize='xs'
//                                             textTransform='uppercase'
//                                             ml='2'
//                                         >
//                                             {/* {property.beds} beds &bull; {property.baths} baths */}
//                                         </Box>
//                                         </Box>

//                                         <Box
//                                         mt='1'
//                                         fontWeight='semibold'
//                                         as='h4'
//                                         lineHeight='tight'
//                                         isTruncated
//                                         >
//                                         {/* {property.title} */}
//                                         </Box>

//                                         <Box>
//                                         {/* {property.formattedPrice} */}
//                                         <Box as='span' color='gray.600' fontSize='sm'>
//                                             / wk
//                                         </Box>
//                                         </Box>

//                                         <Box display='flex' mt='2' alignItems='center'>
//                                         {Array(5)
//                                             .fill('')
//                                             .map((_, i) => (
//                                                 <></>
//                                             // <StarIcon
//                                             //     key={i}
//                                             //     // color={i < property.rating ? 'teal.500' : 'gray.300'}
//                                             // />
//                                             ))}
//                                         <Box as='span' ml='2' color='gray.600' fontSize='sm'>
//                                             reviews
//                                             {/* {property.reviewCount} reviews */}
//                                         </Box>
//                                         </Box>
//                                     </Box>
//                                     </Box>
                