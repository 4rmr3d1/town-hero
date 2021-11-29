import React, {useEffect, useState} from 'react'
import cn from 'classnames';
import Link from 'next/link';
import {collection, getDocs} from "@firebase/firestore";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {db} from "../firebase/clientApp";

import styles from './Home.module.sass'


export const Home = () => {
    const [articles, setArticles] = useState([])
    const articlesCollection = collection(db, 'article')

    useEffect(() => {
        const getArticles = async () => {
            const response = await getDocs(articlesCollection);

            setArticles(response.docs.map(article =>
                ({
                    ...article.data(),
                    id: article.id,
                })
            ))
        }

        getArticles()
    }, [])

    return (
        <div className={styles.container}>
            <Header/>

            <main className={styles.home}>
                <h1 className={styles.home__title}>
                    Авторские гайды по&nbsp;городам России
                </h1>

                <span>
                    а именно
                </span>

                <div className={styles.home_filters}>
                    <a>Москва</a>
                    <a>Казань</a>
                    <a>Чебоксары</a>
                    <a>Иннополис</a>
                </div>
            </main>

            <div className={styles.article}>
                {articles?.map((article, index) =>

                    <Link href={`/article/${article?.id}`} key={article?.id}>
                        <div className={cn(
                            styles.articleItem,
                            (index + 1) % 3 === 1 && styles.article__first,
                            (index + 1) % 3 === 2 && styles.article__second,
                            (index + 1) % 3 === 0 && styles.article__third
                        )}>
                            <div className={styles.imageContainer}>
                                <img src={`${article?.places?.[0]?.image}`} alt=""/>
                            </div>

                            <div className={styles.articleItem__name}>{article?.title}</div>

                            <div className={styles.articleItem__city}>{article?.city}</div>
                        </div>
                    </Link>

                )}
            </div>

            <Footer/>
        </div>
    )
}

export default Home