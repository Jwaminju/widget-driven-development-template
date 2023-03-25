import type { NextPage } from 'next'
import styles from "../styles/Items.module.css";
import Head from "next/head";
import { SimpleGrid, Center, ChakraProvider, Button, Spacer, Flex, VStack, Text, Box, Tooltip } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions';
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
import ItemsSceneContainer from "../widgets/items/Container";

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
                    <ItemsSceneContainer/>
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
                