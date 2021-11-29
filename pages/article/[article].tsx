import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import {useRouter} from "next/router";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../../firebase/clientApp";
import {Footer} from "../../components/Footer";
import {Header} from "../../components/Header";

import styles from './index.module.sass'

export const Article = () => {
    const router = useRouter()
    const {article} = router.query

    const [currentArticle, setCurrentArticle] = useState(null)

    useEffect(() => {
        const ref = doc(db, 'article', `${article}`)

        const getArticle = async () => {
            const articleSnap = await getDoc(ref)

            if (articleSnap.exists()) {
                setCurrentArticle(articleSnap.data())
            }
        }

        getArticle()
    }, [article])

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.article}>
                <div className={styles.articleHead}>
                    <div className={styles.articleStats}>
                        <div className={styles.articleStats__Item}> </div>
                        <div className={styles.articleStats__Item}> </div>
                        <div className={styles.articleStats__Item}> </div>
                    </div>

                    <div className={styles.articleInfo}>
                        <h1>{currentArticle?.title}</h1>

                        <div>Маршрут на карте</div>

                        <div>{currentArticle?.city}</div>

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
                <Link href='/random-article' >
                    <div className={styles.nextContent}>
                        <div className={styles.nextText}>
                            <h1>
                                Следующая статья там.
                            </h1>
                        </div>
                    </div>
                </Link>
            </div>

            <Footer />
        </div>
    )
}

export default Article