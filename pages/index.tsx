import React, {useEffect, useMemo, useState} from 'react'
import cn from 'classnames';
import Link from 'next/link';
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {db} from "../firebase/clientApp";

import styles from './Home.module.sass'
import {ArticleBlock} from "../components/ArticleBlock";

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

export const Home = ({ articles }) => {
    const avalArticles = JSON.parse(articles)
    const groupedArticles = useArticlesGrouping(avalArticles)
    const citiesByArticles = Object.keys(groupedArticles)


    return (
        <>
            <Header/>

            <div className={styles.container}>

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

                <ArticleBlock articles={avalArticles}/>

                {citiesByArticles?.map((city, cIndex) =>
                    <>
                        <div className={cn(styles.articleCity, styles.title)} id={city}>
                            <h2 className={styles.articleCity__title}>{city}</h2>

                            <span>{formatQuoteByCity(city)}</span>
                        </div>

                        <ArticleBlock articles={groupedArticles[city]}/>
                    </>
                )}
            </div>


            <Footer/>
        </>
    )
}

export default Home

export const getStaticProps = async () => {
    const articlesCollection = collection(db, 'article')
    const response = await getDocs(articlesCollection);
    const articles = response.docs.map(article =>
        ({
            ...article.data(),
            id: article.id,
        })
    )

    return {
        props: { articles: JSON.stringify(articles) }
    }
}