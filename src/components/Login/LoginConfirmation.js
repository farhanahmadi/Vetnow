import React, { useEffect, useState } from 'react';
import styles from "../../styles/login.module.css"
import { MainLink } from '../Link/MainLink';
import logo from "../../Image/Layer1.png"
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LoginConfirmation = () => {

    const [data , setData] = useState({
        key: '',
        password: '',
    })
    const inputHandler = (event) =>{
        setData({...data , key: localStorage.getItem('key') , password :event.target.value})
        console.log(data);
    }

    const redirect = new useHistory();
    const submitHandler = (event) =>{
        event.preventDefault();
        axios.post(`${MainLink}/api/v1/otp/confirm/`, {
            key: data.key,
            password: data.password,
        }).then(response => {
            if (response.data.admin) {
                localStorage.setItem('token' , response.data.token)
                redirect.push('/Admin-MainPanel')
            }else{
               toast.error("شما ادمین نیستید");
            }
        }).catch((error) => {
            if(error.response){
              toast.error("رمز وارد شده اشتباه میباشد")
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
                     <p>لطفا کد تایید را که به شماره شما ارسال شده را وارد کنید </p>
                     <input type="number" name="password" className={styles.loginInput} onChange={inputHandler} />
                     <input type="submit" className={styles.submitBtn} value="ورود به وتنا" />
                 </section>
                 <section className={styles.register}>
                     <p>اکانت دارید ؟ <a> وارد شوید</a></p>
                 </section>
            </form>
            <ToastContainer />
       </div>
       )
     }
export default LoginConfirmation;
