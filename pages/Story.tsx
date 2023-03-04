import type { NextPage } from 'next'
import styles from "../styles/Story.module.css";
import Head from "next/head";
import {FC} from "react";
const STORY_TXT = `Global warming is an ongoing environmental crisis that has been intensifying over the past few decades. 
It refers to the long-term increase in the Earth's average surface temperature, caused primarily by the build-up of 
greenhouse gases in the atmosphere, such as carbon dioxide and methane. 
The consequences of global warming include rising sea levels, more frequent and severe natural disasters, 
loss of biodiversity, and adverse impacts on human health and livelihoods. 
Despite international efforts to mitigate global warming, such as the Paris Agreement, 
the concentration of greenhouse gases continues to rise, and urgent action is needed to avoid catastrophic outcomes.`;

const StoryBox: FC = ({}) => (
    <div className={styles.story_box}>
        <p className={styles.story_txt}>
            {STORY_TXT}
        </p>
    </div>
);
const Story: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>CarbonHero</title>
                <meta name="description" content="Education game for Global Warming"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {/*main 요소 백그라운드에 이미지 정도 넣으면 되지 않을까 싶어요.*/}
            <main className={styles.main}>
                <StoryBox storytxt={STORY_TXT} />
            </main>
        </div>
    );
}

export default Story
