import React, { useEffect } from 'react';
import styles from "../../styles/Login.module.css"
import { MainLink } from '../Link/MainLink';
import logo from "../../Image/Layer1.png"
import {reactLocalStorage} from 'reactjs-localstorage';


const LoginConfirmation = () => {

    useEffect(() => {
        console.log(reactLocalStorage.get('key'));
    },[])
    return(
        <div className={styles.Container}>
            <form className={styles.loginForm}>
                 <section className={styles.logo}>
                     <img className={styles.Layer} src={logo} />
                     <h3>ورود / ثبت نام</h3>
                 </section>
                 <hr className={styles.line} />
                 <section className={styles.loginInputSection}>
                     <p>لطفا کد تایید را که به شماره شما ارسال شده را وارد کنید </p>
                     <input type="number" className={styles.loginInput} />
                     <input type="submit" className={styles.submitBtn} value="ورود به وتنا" />
                 </section>
                 <section className={styles.register}>
                     <p>اکانت دارید ؟ <a> وارد شوید</a></p>
                 </section>
            </form>
       </div>
       )
     }
export default LoginConfirmation;
