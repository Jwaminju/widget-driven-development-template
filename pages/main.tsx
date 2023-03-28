import type {NextPage} from 'next'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";
import GlobeContainer from "../widgets/globe/Container";
import GreenHouseEffectStatsContainer from "../widgets/GreenHouseEffectStats/Container";
import {customTheme} from "../theme/theme";
import PlayTimeContainer from "../widgets/playtimeIndicator/Container";

const Main: NextPage<any> = () => {
    return (
        <>
          <Head>
              <title>CarbonHero</title>
              <meta name="description" content="Education game for Global Warming" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <ChakraProvider theme={customTheme}>
            <GreenHouseEffectStatsContainer />
            <PlayTimeContainer />
            <GlobeContainer />
          </ChakraProvider>
        </>
    );
}

export default Main
