import React from 'react';
import styles from "../../styles/Login.module.css"
import { MainLink } from '../Link/MainLink';
import logo from "../../Image/Layer1.png"
const Login = () => {
  return(
   <div className={styles.Container}>
       <form className={styles.loginForm}>
            <section className={styles.logo}>
                <img className={styles.Layer} src={logo} />
            </section>
            <hr />
            <section className={styles.loginInput}>
                <p>لطفا شماره خود را در کادر پایین وارد کنید </p>
                <input type="text" className={styles.Input} />
                <input type="submit" className={styles.submitBtn} value="ورود" />
            </section>
            <section className={styles.register}>
                <p>اکانت ندارید ؟ <a>ثبت نام</a></p>
            </section>
       </form>
  </div>
  )
}
export default Login