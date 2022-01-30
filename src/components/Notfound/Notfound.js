import React from 'react'
import styles from '../../styles/Notfound.module.css'

const Navbar = () => {
    return (
        <div className={styles.container} dir="rtl">
           <h1>404 Error Page #3</h1>
              <p className={styles.zoom_area}>صفحه مورد نظر یافت نشد</p>
              <section className={styles.error_container}>
                <span>4</span>
                <span><span className={styles.creen_reader_text}>0</span></span>
                <span>4</span>
              </section>
        </div>
    )
}

export default Navbar
