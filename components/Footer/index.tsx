import styles from './index.module.sass'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_feedback}>
                <h2>
                    Связаться с нами
                </h2>

                <p>
                    Просьба писать только по&nbsp;работе, если у&nbsp;вас&nbsp;есть&nbsp;
                    замечания, или для совместного похода в&nbsp;бар.
                    <br/><br/>
                    Если вы&nbsp;это читаете, значит я&nbsp;открыт для работы.
                </p>

                <a href="mailto:hello@townhero.com">
                    hello@townhero.com
                </a>
            </div>

            <div className={styles.footer_about}>
                <div className={styles.footer_socials}>
                    <h3>Социалки</h3>

                    <a href="" className={styles.instagram}>Instagram</a>
                    <a href="" className={styles.telegram}>Telegram</a>
                </div>

                <div className={styles.footer_credits}>
                    <h3>О проекте</h3>

                    <p>
                        Этот сайт был свёрстан, пробекенден и&nbsp;натянут на&nbsp;CMS Джоном Доем.
                        <br/><br/>
                        На&nbsp;сайте использовался шрифт Helvetica Neue, разработанный командой CG. Вдали от&nbsp;всех живут они в&nbsp;буквенных домах на&nbsp;берегу Семантика большого океана.
                    </p>
                </div>
            </div>
        </footer>
    )
}