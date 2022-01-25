import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditOrders.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';


export default function EditOrder(props) {

    const [data , setData] = useState()

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/discount_detail/${props.match.params.id}/`).then(res => setData({...data , 
            product: res.data.products,
            productId: res.data.products.map(item => item.id),
            discountPercent: res.data.discount_percent,
            valid_from: shamsi.gregorianToJalali(res.data.valid_from.split("-")).join("-"),
            valid_to: shamsi.gregorianToJalali(res.data.valid_from.split("-")).join("-")
            }))
            
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
                <input type="text" value={data.valid_from} placeholder="تاریخ شروع تخفیف" name="valid_from" onChange={inputHandler} />
                <input type="text" value={data.valid_to} placeholder="تاریخ پایان تخفیف" name="valid_to" onChange={inputHandler} />
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

