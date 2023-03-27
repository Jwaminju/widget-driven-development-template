import type {NextPage} from 'next'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";
import {RecoilRoot} from "recoil";
import {GameStateData, useGameState} from "../hooks/useGameState";
import GlobeContainer from "../widgets/globe/Container";
import GreenHouseEffectStatsContainer from "../widgets/GreenHouseEffectStats/Container";

const Main: NextPage<any> = ({ gameState }) => {
    // const { currentGameState, userInfo, playTime, greenHouseGases, items } = useGameState(gameState);
    return (
        <>
          <Head>
              <title>CarbonHero</title>
              <meta name="description" content="Education game for Global Warming" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <ChakraProvider>
              <RecoilRoot>
                <GreenHouseEffectStatsContainer />
                <GlobeContainer />
              </RecoilRoot>
          </ChakraProvider>
        </>
    );
}

// Main.getInitialProps = async (context) => {
//   const gameState: GameStateData = game_data;
//   return { gameState };
// }

export default Main
