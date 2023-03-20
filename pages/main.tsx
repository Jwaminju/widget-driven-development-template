import type {NextPage} from 'next'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";
import {RecoilRoot} from "recoil";
import {GameStateData, useGameState} from "../hooks/useGameState";
import GlobeContainer from "../widgets/globe/Container";
import game_data from "../public/game_data.json";

const Main: NextPage<any> = ({ gameState }) => {
    const { currentGameState, userInfo, playTime, greenHouseGases, greenHouseEffect, items } = useGameState(gameState);
    return (
        <>
          <Head>
              <title>CarbonHero</title>
              <meta name="description" content="Education game for Global Warming" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <ChakraProvider>
              <RecoilRoot>
                <GlobeContainer />
              </RecoilRoot>
          </ChakraProvider>
        </>
    );
}

Main.getInitialProps = async (context) => {
  const gameState: GameStateData = game_data;
  return { gameState };
}

export default Main
