import React, {useEffect, useMemo, useState} from 'react'
import cn from 'classnames';
import Link from 'next/link';
import {collection, getDocs} from "@firebase/firestore";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {db} from "../firebase/clientApp";

import styles from './Home.module.sass'

const articlesSortedByCity = (articles) =>
    articles?.reduce((acc, article) => {
        const city = article?.city;

        acc[city]
            ? acc[city].push(article)
            : acc[city] = [article]

        return acc
    }, {})

const useArticlesGrouping = (articles) =>
    useMemo(() => articlesSortedByCity(articles), [articles])

const cityQuote = {
    'Казань': 'Чак-чак и Нефть: 10 гайдов по столице Татарстана',
    'Чебоксары': 'Рай на земле: 9 гайдов по столице Чувашии'
}

const formatQuoteByCity = (city) => cityQuote[city]

export const Home = () => {
    const [articles, setArticles] = useState([])
    const articlesCollection = collection(db, 'article')
    const groupedArticles = useArticlesGrouping(articles)
    const citiesByArticles = Object.keys(groupedArticles)

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
    }, [articlesCollection])

    return (
        <div className={styles.container}>
            <Header/>

            <main className={cn(styles.home, styles.title)}>
                <h1 className={styles.home__title}>
                    Авторские гайды по&nbsp;городам России
                </h1>

                <span>
                    а именно
                </span>

                <div className={styles.home_filters}>
                    {citiesByArticles?.map(city => <a href={`#${city}`} key={city}> {city}</a>)}
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
                                <img
                                    src={`${article?.places?.[0]?.image}`}
                                    alt={article?.description}
                                />
                            </div>

                            <div className={styles.articleItem__name}>{article?.title}</div>

                            <div className={styles.articleItem__city}>{article?.city}</div>
                        </div>
                    </Link>
                )}
            </div>

            {citiesByArticles?.map((city, cIndex) =>
                <>
                    <div className={cn(styles.articleCity, styles.title)} id={city}>
                        <h2 className={styles.articleCity__title}>{city}</h2>

                        <span>{formatQuoteByCity(city)}</span>
                    </div>

                    <div className={styles.article} key={cIndex + city}>
                        {groupedArticles[city]?.map((article, index) =>
                            <Link href={`/article/${article?.id}`} key={article?.id}>
                                <div className={cn(
                                    styles.articleItem,
                                    (index + 1) % 3 === 1 && styles.article__first,
                                    (index + 1) % 3 === 2 && styles.article__second,
                                    (index + 1) % 3 === 0 && styles.article__third
                                )}>
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={`${article?.places?.[0]?.image}`}
                                            alt={article?.description}
                                        />
                                    </div>

                                    <div className={styles.articleItem__name}>{article?.title}</div>

                                    <div className={styles.articleItem__city}>{article?.city}</div>
                                </div>
                            </Link>
                        )}
                    </div>
                </>
            )}

            <Footer/>
        </div>
    )
}

export default Home