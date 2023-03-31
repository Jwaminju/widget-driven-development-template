import type { NextPage } from 'next'
import styles from "../styles/Ending.module.css";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/provider";
import { RecoilRoot } from "recoil";
import GlobeContainer from "../widgets/globe/Container";
import GreenHouseEffectStatsContainer from "../widgets/GreenHouseEffectStats/Container";
import { Box } from '@chakra-ui/react';
import LandingSceneContainer from "../widgets/landingScene/Container";
import EndingSceneContainer from '../widgets/endingScene/Container';

const Ending: NextPage = () => {
    return (
        <ChakraProvider>
            <Head>
                <title>CarbonHero</title>
                <meta name="description" content="Education game for Global Warming" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <EndingSceneContainer isDefeat={true} gas={33.4} />
        </ChakraProvider>
    );
}

export default Ending
