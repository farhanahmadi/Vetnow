import React, { useEffect } from 'react'
import styles from '../styles/Sidebar.module.css'
import { FaCartPlus , FaUser , FaPhone , FaPager , FaNewspaper, FaPercent , FaCompress , FaShoppingBag , FaArrowsAlt , FaPaperclip , FaHome  } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
             <section className={styles.sideBar}>
                <ul className={styles.adminSideBar}>
                    <li><Link style={{width: '100%'}} to="/Admin-MainPanel">خانه <FaHome /></Link></li>
                    <li><Link style={{width: '100%'}} to="/Products-List">محصولات <FaCartPlus /></Link></li>
                    <li><Link style={{width: '100%'}} to="/Users">کاربران <FaUser /></Link></li>
                    <li><Link style={{width: '100%'}} to="#">چت روم <FaPhone /></Link></li>
                    <li><Link style={{width: '100%'}} to="/Reports">گزارشات <FaPaperclip /></Link></li>
                    <li><Link style={{width: '100%'}} to="/Discount-Products-List">تخفیف محصولات <FaPercent /></Link></li>
                    <li><Link style={{width: '100%'}} to="/Categories-List">لیست دسته بندی ها <FaCompress /></Link></li>
                    <li><Link style={{width: '100%'}} to="/Order-List">لیست سفارشات <FaShoppingBag /></Link></li>
                    <li><Link style={{width: '100%'}} to="/Refunds-List">مرجوعی <FaArrowsAlt /></Link></li>
                    <li><Link style={{width: '100%'}} to="/NewsList">اخبار <FaNewspaper /></Link></li>
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
