import React, { useState } from 'react';
import styles from "../../styles/Login.module.css"
import { MainLink } from '../Link/MainLink';
import logo from "../../Image/Layer1.png"
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';


const Login = () => {

    const [number , setNumber] = useState();

    const inputHandler = (event) =>{
        setNumber(event.target.value)
        console.log(number);
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        axios.post(`${MainLink}/api/v1/otp/verify/`, {
            phone_number: number,
        }).then(response => reactLocalStorage.set('key', response.data.key))
    }

    return(
    <div className={styles.Container}>
        <form onSubmit={submitHandler} className={styles.loginForm}>
                <section className={styles.logo}>
                    <img className={styles.Layer} src={logo} />
                    <h3>ورود / ثبت نام</h3>
                </section>
                <hr className={styles.line} />
                <section className={styles.loginInputSection}>
                    <p>لطفا شماره خود را در کادر پایین وارد کنید </p>
                    <input type="number" className={styles.loginInput}  onChange={inputHandler}  />
                    <input type="submit" className={styles.submitBtn} value="ورود به وتنا"/>
                </section>
                <section className={styles.register}>
                    <p>اکانت ندارید ؟ <a>ثبت نام</a></p>
                </section>
        </form>
    </div>
    )
    }
export default Login