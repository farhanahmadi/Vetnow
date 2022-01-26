import React from 'react';
import styles from "../../styles/Login.module.css"
import { MainLink } from '../Link/MainLink';
import logo from "../../Image/Layer1.png"
const Login = () => {
  return(
   <div className={styles.Container}>
       <form className={styles.loginForm}>
            <section className={styles.logo}>
                <img src={logo} />
            </section>
            <hr />
            <section className={styles.loginInput}>
                <p></p>
                <input type="text" />
            </section>
            <section className={styles.register}>

            </section>
       </form>
  </div>
  )
}
export default Login