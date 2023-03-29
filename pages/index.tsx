"use client"
import type {NextPage} from 'next'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";
import {useRouter} from "next/router";
import LandingSceneContainer from "../widgets/landingScene/Container";

const Index: NextPage = () => {
    const router = useRouter();
    return (
        <ChakraProvider>
          <Head>
            <title>CarbonHero</title>
            <meta name="description" content="Education game for Global Warming" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <LandingSceneContainer />
        </ChakraProvider>
    );
}

export default Index
