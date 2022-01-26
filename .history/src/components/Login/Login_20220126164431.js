import React from 'react';
import styles from "../../styles/Login.module.css"
import { MainLink } from '../Link/MainLink';
const Login = () => {
  return(
   <div className={styles.Container}>
       <form className={styles.loginForm}>
            <section className={styles.logo}>
                <img />
            </section>
            <section className={styles.loginInput}>
                <input type="text" />
            </section>
            <section className={styles.register}>

            </section>
       </form>
  </div>
  )
}
export default Login