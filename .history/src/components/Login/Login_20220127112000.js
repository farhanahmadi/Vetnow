import React, { useState } from 'react';
import styles from "../../styles/Login.module.css"
import { MainLink } from '../Link/MainLink';
import logo from "../../Image/Layer1.png"
const Login = () => {

    const [number , setNumber] = useState()
  return(
   <div className={styles.Container}>
       <form className={styles.loginForm}>
            <section className={styles.logo}>
                <img className={styles.Layer} src={logo} />
                <h3>ورود / ثبت نام</h3>
            </section>
            <hr className={styles.line} />
            <section className={styles.loginInputSection}>
                <p>لطفا شماره خود را در کادر پایین وارد کنید </p>
                <input type="number" className={styles.loginInput} />
                <input type="submit" className={styles.submitBtn} value="ورود به وتنا" onChange />
            </section>
            <section className={styles.register}>
                <p>اکانت ندارید ؟ <a>ثبت نام</a></p>
            </section>
       </form>
  </div>
  )
}
export default Login