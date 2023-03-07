"use client"
import type { NextPage } from 'next'
import styles from "../styles/Landing.module.css";
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/provider";
import LinkToNext from "../components/LinkToNext";
import Heading1 from '../components/Heading1';

const Landing: NextPage = () => {
    return (
        <ChakraProvider>
            <div className={styles.container}>
                <Head>
                    <title>CarbonHero</title>
                    <meta name="description" content="Education game for Global Warming" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {/*main 요소 백그라운드에 이미지 정도 넣으면 되지 않을까 싶어요.*/}
                <main className={styles.main}>
                    <Heading1 label={'Carbon Hero'} />
                    <LinkToNext label={'See the Story'} />
                </main>
            </div>
        </ChakraProvider>
    );
}

export default Landing
