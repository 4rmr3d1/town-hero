import React, {Fragment} from "react";
import cn from 'classnames';
import Link from "next/link";
import styles from "./index.module.sass";

export const ArticleBlock = ({articles}) => {
    return (
        <div className={styles.article}>
            {articles?.map((article, index) =>
                <Fragment key={article?.id + index}>
                    <div
                        key={index}
                        className={cn(
                            styles.articleItem,
                            (index + 1) % 3 === 1 && styles.article__first,
                            (index + 1) % 3 === 2 && styles.article__second,
                            (index + 1) % 3 === 0 && styles.article__third
                        )}
                    >
                        <Link href={`/article/[article]`} as={`/article/${article?.id}`}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={`${article?.places?.[0]?.image}`}
                                    alt={article?.description}
                                />
                            </div>
                        </Link>

                        <Link href={`/article/[article]`} as={`/article/${article?.id}`}>
                            <div className={styles.articleItem__name}>{article?.title}</div>
                        </Link>

                        <div className={styles.articleItem__city}>{article?.city}</div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}