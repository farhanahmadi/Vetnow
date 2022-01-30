import React from 'react'
import styles from '../styles/Navbar.module.css'
import { useHistory } from 'react-router-dom'

const Navbar = () => {
    const history = new useHistory()

    const clickHandler = () =>{
        localStorage.removeItem('token');
        history.push('/')
    }
    return (
        <div className={styles.container} dir="rtl">
            <section className={styles.NavbarText}>
                <h2 className={styles.VetnowTitle}>پنل ادمین وتنا</h2>
            </section>
            <section className={styles.VetnowEn}>
                <button onClick={clickHandler} className={styles.Logout}>خروج</button>
                <h2 className={styles.VetnowTitleEn}>Vetnow</h2>
            </section>
        </div>
    )
}

export default Navbar
