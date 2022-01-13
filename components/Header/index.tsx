import React from 'react'
import Link from 'next/link'
import styles from './header.module.sass'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div>
                <Link href='/'>Town Hero</Link>
                <span className={styles.muted}>Guide Service</span>
            </div>
        </header>
    )
}