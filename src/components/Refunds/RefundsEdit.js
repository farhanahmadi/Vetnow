import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditReturnedOrder.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';


export default function RefundsEdit(props) {
    const [data , setData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        national_code: '',
        state: '',
        city: '',
        address: '',
        plate: '',
        zip_code: '',
        full_name: '',
        phone_number: '',
        confirmation: '',
        created: '',
        message: '',
        order_id: '',
    })

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/refund/${props.match.params.id}/`).then(res => setData({...data, 
        username: res.data.user.username,
        email: res.data.user.email,
        first_name: res.data.user.first_name,
        last_name: res.data.user.last_name,
        national_code: res.data.user.national_code,
        state: res.data.user.state,
        city: res.data.user.city,
        plate: res.data.user.plate,
        zip_code: res.data.user.zip_code,
        full_name: res.data.user.full_name,
        phone_number: res.data.user.phone_number,
        confirmation: res.data.Confirmation,
        created: res.data.created_at,
        message: res.data.message,
        order_id: res.data.order_id,
        
        }))
            
        },[])
    const inputHandler = (event) =>{
        setData({...data , confirmation: event.target.checked})
        console.log(data);
    }
   
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`${MainLink}/api/v1/refund/update/${props.match.params.id}/` , {
            Confirmation: data.confirmation,
        },{ headers:{
            'Authorization': 'Token '+ localStorage.getItem('token'), 
        }}).then(res => console.log(res))
    }
    
    return (
        <div className={styles.container}>
        <form className={styles.main} onSubmit={submitHandler}>
            <section className={styles.header}>
                <h3>ویرایش  سفارشات</h3>
            </section>
            <br />
            <section className={styles.inputs} dir='rtl'>
                <section className={styles.labelSection}>
                    <label>خریدار</label>
                    <input type="text" disabled value={data.username} />
                </section>
                <section className={styles.labelSection}>
                    <label>ایمیل</label>
                    <input type="text" disabled value={data.email} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام</label>
                    <input type="text" disabled value={data.first_name} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام خانوادگی</label>
                    <input type="text" disabled value={data.last_name} />
                </section>
                <section className={styles.labelSection}>
                    <label>کد ملی</label>
                    <input type="text" disabled value={data.national_code} />
                </section>
                <section className={styles.labelSection}>
                    <label>استان</label>
                    <input type="text" disabled value={data.state} />
                </section>
                <section className={styles.labelSection}>
                    <label>شهر</label>
                    <input type="text" disabled value={data.city} />
                </section>
                <section className={styles.labelSection}>
                    <label>آدرس</label>
                    <input type="text" disabled value={data.address} />
                </section>
                <section className={styles.labelSection}>
                    <label>پلاک</label>
                    <input type="text" disabled value={data.plate} />
                </section>
                <section className={styles.labelSection}>
                    <label>کد پستی</label>
                    <input type="text" disabled value={data.zip_code} />
                </section>
                <section className={styles.labelSection}>
                    <label>شماره تماس</label>
                    <input type="text" disabled value={data.phone_number} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام کامل</label>
                    <input type="text" disabled value={data.full_name} />
                </section>
                <section className={styles.labelSection}>
                    <label>تاریخ</label>
                    <input type="text" disabled value={shamsi.gregorianToJalali(data.created)} />
                </section>
                <section className={styles.labelSection}>
                    <label>ایدی سفارش</label>
                    <input type="text" disabled value={data.order_id} />
                </section>
                <section style={{marginTop: 25}} className={styles.labelSection}>
                    <label className={styles.checkBox}><input type="checkbox" checked={data.confirmation} onChange={inputHandler} />تایید شده ؟</label>
                </section>
            </section>
                <section className={styles.message}>
                    <label className={styles.checkBox}>پیام کاربر</label>
                    <textarea disabled value={data.message}></textarea>
                </section>
            <br />
            <input className={styles.submitBtn} type="submit" value="ثبت دسته بندی " />
        </form>
        <section className={styles.sidebar}>
         <Sidebar  />
        </section>
    </div>
    )
}

