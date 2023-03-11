import type { NextPage } from 'next'
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";
import GlobeContainer from "../widgets/globe/Container";

const Main: NextPage = () => {
    return (
      <ChakraProvider>
          <Head>
              <title>CarbonHero</title>
              <meta name="description" content="Education game for Global Warming" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*Main 요소 백그라운드에 이미지 정도 넣으면 되지 않을까 싶어요.*/}
          <GlobeContainer />
      </ChakraProvider>
    );
}

export default Main
