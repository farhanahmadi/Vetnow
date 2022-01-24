import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditDiscount.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';


export default function EditDiscount(props) {
    const [products , setProducts] = useState([]);

    const [data , setData] = useState({
        product: [],
        product: [],
        discountPercent : '' ,
        valid_from : '' , 
        valid_to : '' , 
    })

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/products/`).then(res => setProducts(res.data))
        await axios.get(`${MainLink}/api/v1/discount_detail/${props.match.params.id}/`).then(res => setData({...data , 
            product: res.data.products,
            discountPercent: res.data.discount_percent,
            valid_from: res.data.valid_from.split("-"),
            valid_to: res.data.valid_to.split("-")
            }))
            
        },[])
    const AddProductHandler = (e) =>{
        data.product.push(e.target.value)
        console.log(data.product);

    }
    const DeleteProductHandler = (e) =>{
        const newList = data.product.filter(item => item.id != e.target.value)
        setData({...data , product: newList})
        console.log(data.product);

    }
    const inputHandler =(event) =>{
        setData({...data , subcategoryName: event.target.value})
    }
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`${MainLink}/api/v1/discount_update/${props.match.params.id}/` , {
            discount_percent: data.discountPercent,
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            products: data.product
        }).then(res => console.log(res))
    }
    
    return (
        <div className={styles.container}>
        <form className={styles.main} onSubmit={submitHandler}>
            <section className={styles.header}>
                <h3>ویرایش دسته بندی</h3>
            </section>
            <br />
            <section className={styles.inputs} dir='rtl'>
                <select  onChange={e => AddProductHandler(e)}>
                    <option selected >افزردن محصول برای تخفیف</option>
                   {products.map(item => <option name="products" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}

                </select>
                <select  onChange={e => DeleteProductHandler(e)}>
                    <option selected >حذف محصول از تخفیف ها</option>
                   {data.product.map(item => <option name="products" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}


                </select>
                
                <input type="text" value={data.discountPercent} placeholder="درصد تخفیف" name="discountPercent" onChange={inputHandler} />
                <input type="text" value={shamsi.gregorianToJalali(data.valid_from).join('-')} placeholder="تاریخ شروع تخفیف" name="valid_from" onChange={inputHandler} />
                <input type="text" value={shamsi.gregorianToJalali(data.valid_to).join('-')} placeholder="تاریخ پایان تخفیف" name="valid_to" onChange={inputHandler} />
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

