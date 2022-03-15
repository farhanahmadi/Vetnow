import React, { useEffect, useState } from 'react';
import styles from "../../styles/login.module.css"
import { MainLink } from '../Link/MainLink';
import logo from "../../Image/Layer1.png"
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

    const [number , setNumber] = useState();

    const inputHandler = (event) =>{
        setNumber(event.target.value)
        console.log(number);
    }

    useEffect(() => {
        localStorage.getItem("key") && localStorage.removeItem('key');
    })

    const redirect = new useHistory();
    const submitHandler = (event) =>{
        event.preventDefault();
        axios.post(`${MainLink}/api/v1/otp/verify/`, {
            phone_number: number,
        }).then(response => {if (response) {
            localStorage.setItem('key', response.data.key)
            redirect.push("/Login-Confirmation")
        }}).catch((error) => {
            if(error.response){
              toast.error(error.response.data.phone_number.toString())
            //   console.log(error.response.data.phone_number.toString());
            }
        });

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
        <ToastContainer />
    </div>
    )
    }
export default Login