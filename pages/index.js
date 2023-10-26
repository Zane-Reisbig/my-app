import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'

import Loader from './ExcelFileLoader.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Loader />
      </main>
    </div>
  )
}
