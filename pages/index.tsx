"use client"
import type { NextPage } from 'next'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";
import {useRouter} from "next/router";
import SceneContainer from "../widgets/Scene/Container";
import Items from "../pages/Items"
import Story from "../pages/Story"


const Index: NextPage = () => {
    const router = useRouter();
    return (
        <ChakraProvider>
            <Head>
                <title>CarbonHero</title>
                <meta name="description" content="Education game for Global Warming" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Story/> */}
            <Items/>
            {/*main 요소 백그라운드에 이미지 정도 넣으면 되지 않을까 싶어요.*/}
            {/* <SceneContainer path={router.pathname} /> */}
        </ChakraProvider>
    );
}

export default Index
