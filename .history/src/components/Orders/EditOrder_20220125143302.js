import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditOrders.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';


export default function EditOrder(props) {

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
        amount: '',
        payment_status: '',
        payment_status_send: '',
        confirmation: '',
        created: '',
    })

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/orders/${props.match.params.id}/`).then(res => setData({...data, 
        username: res.data.owner.username,
        email: res.data.owner.email,
        first_name: res.data.owner.first_name,
        last_name: res.data.owner.last_name,
        national_code: res.data.owner.national_code,
        state: res.data.owner.state,
        city: res.data.owner.city,
        plate: res.data.owner.plate,
        zip_code: res.data.owner.zip_code,
        full_name: res.data.owner.full_name,
        phone_number: res.data.owner.phone_number,
        amount: res.data.amount,
        payment_status: res.data.payment_status === "p" && "خرید موفق",
        payment_status: res.data.payment_status === "c" && "خرید ناموفق",
        payment_status: res.data.payment_status === "r" && "مرجوعی",
        payment_status_send: res.data.payment_status,
        confirmation: res.data.confirmation,
        created: res.data.created,
        
        }))
            
        },[])
    const Order_Payment_Status_Handler = (e) =>{
        setData({...data, payment_status_send: e.target.value})

    }

    const inputHandler = (event) =>{

    }
   
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`${MainLink}/api/v1/discount_update/${props.match.params.id}/` , {
            discount_percent: data.discountPercent,
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            products: data.productId
        }).then(res => console.log(res))
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
                    <label>قیمت</label>
                    <input type="text" disabled value={data.amount} />
                </section>
                <section className={styles.labelSection}>
                    <label>تاریخ</label>
                    <input type="text" disabled value={shamsi.gregorianToJalali(data.created)} />
                </section>
                <select  onChange={e => Order_Payment_Status_Handler(e)}>
                    <option selected hidden >{data.payment_status}</option>
                    <option value="p">پرداخت موفق</option>
                    <option value="c">پرداخت ناموفق</option>
                    <option value="r">مرجوعی</option>
                   {/* {products.map(item => <option name="products" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)} */}
                </select>
                <section className={styles.labelSection}>
                    <label className={styles.checkBox}><input type="checkbox" disabled checked={data.confirmation} value={da} onChange={inputHandler} />تایید شده ؟</label>
                </section>
              
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

