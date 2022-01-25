import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditOrders.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';


export default function EditOrder(props) {

    const [data , setData] = useState([])

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1//orders/${props.match.params.id}/`).then(res => setData(res.data))
            
        },[])
    const AddProductHandler = (e) =>{
        data.productId.push(e.target.value)
        console.log(data.productId);

    }
    const DeleteProductHandler = (e) =>{
        const newListProducts = data.product.filter(item => item.id != e.target.value)
        const newListProductsId = data.productId.filter(item => item != e.target.value)
        setData({...data , product: newListProducts , productId: newListProductsId})

    }
    const inputHandler =(event) =>{
        setData({...data ,[event.target.name]: event.target.value})
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
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>ایمیل</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>نام خانوادگی</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>کد ملی</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>استان</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>شهر</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>آدرس</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>پلاک</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>کد پستی</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>شماره تماس</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>قیمت</label>
                    <input type="text" disabled value={} />
                </section>
                <section className={styles.labelSection}>
                    <label>تاریخ</label>
                    <input type="text" disabled value={} />
                </section>
                <select  onChange={e => AddProductHandler(e)}>
                    <option selected >افزردن محصول برای تخفیف</option>
                   {products.map(item => <option name="products" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}

                </select>
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

