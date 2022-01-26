import React from 'react';
import styles from "../../styles/Login.module.css"
import { MainLink } from '../Link/MainLink';
const Login = () => {
  return(
   <div className={styles.Container}>
       <form className={styles.loginForm}>
            <section className={styles.logo}>

            </section>
            <section className={styles.loginInput}>
                <input />
            </section>
            <section className={styles.register}>

            </section>
       </form>
  </div>
  )
}
export default Login