import React, {Fragment, useEffect, useMemo, useState} from "react";
import Link from 'next/link'
import {collection, doc, getDoc, getDocs, query, where} from "@firebase/firestore";
import {db} from "../../firebase/clientApp";
import {Footer} from "../../components/Footer";
import {Header} from "../../components/Header";

import styles from './index.module.sass'

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const Article = ({ article }) => {
    const currentArticle = JSON.parse(article)
    const [relatives, setRelatives] = useState([])
    const [randomRelativeArticle, setRandomRelativeArticle] = useState(null)

    useEffect(() => {
        const findRelatives = async () => {
            const q = query(collection(db, 'article'), where('city', '==', currentArticle?.city))
            const relativeSnapshot = await getDocs(q)

            return relativeSnapshot.docs.map(doc =>
                ({
                    ...doc.data(),
                    id: doc.id
                })
            )
        }

        findRelatives().then(res => setRelatives(res))
    }, [currentArticle?.city])

    useEffect(() => {
        const relativeArticles = relatives.filter(art => art.url !== currentArticle?.url)
        const count = relativeArticles.length - 1
        const randomIndex = count
            ? getRandomNumber(0, count)
            : 0

        setRandomRelativeArticle(relativeArticles[randomIndex])
    }, [relatives, currentArticle?.url])

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.article}>
                <div className={styles.articleHead}>
                    <div className={styles.articleStats}>
                        <div className={styles.articleStats__Item}>
                            <div>21</div>
                            <div>МИН</div>
                        </div>
                        <div className={styles.articleStats__Item}>
                            <div>1,6</div>
                            <div>КМ</div>
                        </div>
                        <div className={styles.articleStats__Item}>
                            <div>~3k</div>
                            <div>РУБЛЕЙ</div>
                        </div>
                    </div>

                    <div className={styles.articleInfo}>
                        <h1>{currentArticle?.title}</h1>

                        <div>Маршрут на карте</div>

                        <div className={styles.city}>{currentArticle?.city}</div>

                        <div className={styles.divider} />

                        <div className={styles.about}>
                            <div className={styles.about__todo}>
                                <b>Чем заняться</b> <br/>
                                {currentArticle?.todo}
                            </div>

                            <div className={styles.about__totry}>
                                <b>Сколько стоит</b> <span>2021</span> <br/>
                                {currentArticle?.totry?.map(pos =>
                                    <Fragment key={pos?.title}>
                                        {pos?.title} <br />

                                        {pos?.menu?.map(menuItem =>
                                            <Fragment key={menuItem}>
                                                - {menuItem}₽ <br />
                                            </Fragment>
                                        )}
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.articleContent}>
                    {currentArticle?.places?.map((place, index) =>
                        <Fragment key={place?.description}>
                            <div className={styles.articleContent__image}>
                                <img src={place?.image} alt={place?.description}/>
                            </div>

                            <div className={styles.articleContent__description}>
                                {index + 1}. {place?.description}
                            </div>
                        </Fragment>

                    )}
                </div>
            </main>

            <div className={styles.next}>
                <Link href={`/article/${randomRelativeArticle?.id}`} >
                    <div className={styles.nextContent}>
                        <div className={styles.nextText}>
                            <h1>
                                {randomRelativeArticle?.title}
                            </h1>

                            <div>
                                <span>Следующий гайд</span>
                                <img src="/link-arrow.svg" alt="link-arrow"/>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <Footer />
        </div>
    )
}

export default Article

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db, 'article'))
    const paths = snapshot.docs.map(doc => ({
        params: { article: doc.id.toString() }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.article

    const docRef = doc(db, 'article', id)
    const docSnap = await getDoc(docRef)

    return {
        props: {
            article: JSON.stringify(docSnap.data()) || null,
        }
    }
}