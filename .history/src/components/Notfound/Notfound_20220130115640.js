import React from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.container} dir="rtl">
           <h1>404 Error Page #3</h1>
              <p className={styles.zoom_area}><b>CSS</b> animations to make a cool 404 page. </p>
              <section className={styles.error_container}>
                <span>4</span>
                <span><span className="{styles.creen-reader-text">0</span></span>
                <span>4</span>
              </section>
              <div className={styles.link-container">
                <a target="_blank" href="https://www.silocreativo.com/en/creative-examples-404-error-css/" className={styles.more-link">Visit the original article</a>
              </div>
        </div>
    )
}

export default Navbar
