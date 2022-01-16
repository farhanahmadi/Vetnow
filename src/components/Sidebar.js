import React, { useEffect } from 'react'
import styles from '../styles/Sidebar.module.css'
import { FaCartPlus , FaUser , FaPhone , FaPager , FaNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
             <section className={styles.sideBar}>
                <ul className={styles.adminSideBar}>
                    <li><Link to="/Products-List">محصولات <FaCartPlus /></Link></li>
                    <li><Link to="/Users">کاربران <FaUser /></Link></li>
                    <li><Link to="#">چت روم <FaPhone /></Link></li>
                    <li><Link to="#">گزارشات <FaNewspaper /></Link></li>
                    <li><Link to="#">وبلاگ <FaPager /></Link></li>
                </ul>
                <ul className={styles.adminSideBarMobile}>
                    <li><Link to="/Products-List"><FaCartPlus /></Link></li>
                    <li><Link to="/Users"><FaUser /></Link></li>
                    <li><Link to="#"><FaPhone /></Link></li>
                    <li><Link to="#"><FaNewspaper /></Link></li>
                    <li><Link to="#"><FaPager /></Link></li>
                </ul>
            </section>
    )
}

export default Sidebar
