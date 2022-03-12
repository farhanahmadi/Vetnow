import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditOrders.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';


export default function EditOrder(props) {

    const [data , setData] = useState({
        products: [],
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
        confirmation: '',
        created: '',
        price: '',
        quantity: '',
    })

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/orders/${props.match.params.id}/${props.match.params.order_id}`).then(res => setData({...data, 
        products: res.data.data2.map(item => item),
        username: res.data.data1.owner.username,
        email: res.data.data1.owner.email,
        first_name: res.data.data1.owner.first_name,
        last_name: res.data.data1.owner.last_name,
        national_code: res.data.data1.owner.national_code,
        state: res.data.data1.owner.state,
        city: res.data.data1.owner.city,
        plate: res.data.data1.owner.plate,
        zip_code: res.data.data1.owner.zip_code,
        full_name: res.data.data1.owner.full_name,
        phone_number: res.data.data1.owner.phone_number,
        amount: res.data.data1.amount,
        payment_status: res.data.data1.payment_status,
        confirmation: res.data.data1.confirmation,
        created: shamsi.gregorianToJalali(res.data.data1.created),
        price: res.data.data2.price,
        quantity: res.data.data2.quantity,
        
        }))
            
        },[])
    const Order_Payment_Status_Handler = (e) =>{
        setData({...data, payment_status: e.target.value})

    }

    const inputHandler = (event) =>{
        setData({...data , confirmation: event.target.checked})
        console.log(data);
    }
   
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`${MainLink}/api/v1/orders/${props.match.params.id}/` , {
            payment_status: data.payment_status,
            confirmation: data.confirmation,
        }).then(res => console.log(res))
    }
    
    return (
        <div className={styles.container}>
        <form className={styles.main} onSubmit={submitHandler}>
            <section className={styles.header}>
                <h3>ویرایش  سفارشات</h3>
            </section>
            <br />
            {console.log(data.products)}
                {data.products.map(item => 
                     <section key={item.id} className={styles.productsDetails}>
                     <section className={styles.labelSection}>
                         <label>نام محصول</label>
                         <input type="text" disabled value={item.product.name} />
                     </section>
                     <section className={styles.labelSection}>
                         <label>تعداد</label>
                         <input type="text" disabled value={item.quantity} />
                     </section>
                     <section className={styles.labelSection}>
                         <label>قیمت</label>
                         <input type="text" disabled value={item.product.price} />
                     </section>
                     <section className={styles.labelSection}>
                         <label>قیمت کل این محصول</label>
                         <input type="text" disabled value={item.total_amount} />
                     </section>
                     <br />
                 </section>
                 )}
            <br />
            <section className={styles.inputs} dir='rtl'>
                <section className={styles.labelSection}>
                    <label>خریدار</label>
                    <input type="text" disabled defaultValue={data.username} />
                </section>
                <section className={styles.labelSection}>
                    <label>ایمیل</label>
                    <input type="text" disabled defaultValue={data.email} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام</label>
                    <input type="text" disabled defaultValue={data.first_name} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام خانوادگی</label>
                    <input type="text" disabled defaultValue={data.last_name} />
                </section>
                <section className={styles.labelSection}>
                    <label>کد ملی</label>
                    <input type="text" disabled defaultValue={data.national_code} />
                </section>
                <section className={styles.labelSection}>
                    <label>استان</label>
                    <input type="text" disabled defaultValue={data.state} />
                </section>
                <section className={styles.labelSection}>
                    <label>شهر</label>
                    <input type="text" disabled defaultValue={data.city} />
                </section>
                <section className={styles.labelSection}>
                    <label>آدرس</label>
                    <input type="text" disabled defaultValue={data.address} />
                </section>
                <section className={styles.labelSection}>
                    <label>پلاک</label>
                    <input type="text" disabled defaultValue={data.plate} />
                </section>
                <section className={styles.labelSection}>
                    <label>کد پستی</label>
                    <input type="text" disabled defaultValue={data.zip_code} />
                </section>
                <section className={styles.labelSection}>
                    <label>شماره تماس</label>
                    <input type="text" disabled defaultValue={data.phone_number} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام کامل</label>
                    <input type="text" disabled defaultValue={data.full_name} />
                </section>
                <section className={styles.labelSection}>
                    <label>تاریخ</label>
                    <input type="text" disabled defaultValue={data.created} />
                </section>
                <section className={styles.labelSection}>
                    <label className={styles.checkBox}><input type="checkbox" checked={data.confirmation} onChange={inputHandler} />تایید شده ؟</label>
                </section>
                <select  onChange={e => Order_Payment_Status_Handler(e)}>
                    {data.payment_status === "p" && <option selected hidden >پرداخت موفق</option>}
                    {data.payment_status === "c" && <option selected hidden >پرداخت ناموفق</option>}
                    {data.payment_status === "r" && <option selected hidden >مرجوعی</option>}
                    <option value="p">پرداخت موفق</option>
                    <option value="c">پرداخت ناموفق</option>
                    <option value="r">مرجوعی</option>
                   {/* {products.map(item => <option name="products" key={item.id} defaultdefaultValue="null" defaultValue={item.id}>{item.name}</option>)} */}
                </select>
              
              
            </section>
            <br />
            <input className={styles.submitBtn} type="submit" value="ثبت دسته بندی" />
        </form>
        <section className={styles.sidebar}>
         <Sidebar  />
        </section>
    </div>
    )
}

