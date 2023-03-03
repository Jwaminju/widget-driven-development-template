import type { NextPage } from 'next'
import styles from "../styles/Landing.module.css";
import Head from "next/head";

const Ending: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>CarbonHero</title>
                <meta name="description" content="Education game for Global Warming" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*main 요소 백그라운드에 이미지 정도 넣으면 되지 않을까 싶어요.*/}
            <main className={styles.main}>
                <EndingMessage isDefeated={true}/>
                <GameStatus />
            </main>
        </div>
    );
}

export default Ending
