import React from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.container} dir="rtl">
           <h1>404 Error Page #3</h1>
<p class="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p>
<section class="error-container">
  <span>4</span>
  <span><span class="screen-reader-text">0</span></span>
  <span>4</span>
</section>
<div class="link-container">
  <a target="_blank" href="https://www.silocreativo.com/en/creative-examples-404-error-css/" class="more-link">Visit the original article</a>
</div>
        </div>
    )
}

export default Navbar