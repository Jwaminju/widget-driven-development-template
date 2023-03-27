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
import ItemsMenuContainer from '../widgets/items/Container';

const Items: NextPage = () => {
    return (
        <ChakraProvider>
            <div className={styles.container}>
                <Head>
                    <title>CarbonHero</title>
                    <meta name="description" content="Education game for Global Warming"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main className={styles.main}>
                    <ItemsMenuContainer/>
                </main>
            </div>
        </ChakraProvider>
    )
}

export default Items
