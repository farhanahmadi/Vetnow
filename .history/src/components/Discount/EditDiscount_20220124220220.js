import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditDiscount.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';



export default function EditDiscount(props) {
    const [discountedproducts , setDiscountedproducts] = useState([]);
    const [data , setData] = useState({
        product: [],
        discountPercent : '' ,
        valid_from : '' , 
        valid_to : '' , 
    })

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/products/`).then(res => setData({...data , 
        product: res.data.products,
        discountPercent: res.data.discount_percent,
        valid_from: res.data.valid_from,
        valid_to: res.data.
        }))
        await axios.get(`${MainLink}/api/v1/discount_update/list/${pros.match.params.id}`).then(res => setDiscountedproducts(res.data))
        console.log(data.parent);

    },[])
    const AddProductHandler = (e) =>{
        setData({... data , parent: e.target.value})
        console.log(data);

    }
    const DeleteProductHandler = (e) =>{
        setData({... data , parent: e.target.value})
        console.log(data);

    }
    const inputHandler =(event) =>{
        setData({...data , subcategoryName: event.target.value})
    }
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`${MainLink}/api/v1/category/update/${props.match.params.slug}/` , {
            parent: data.parent,
            name: data.subcategoryName
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
                   {discountedproducts.map(item => <option name="discountedProducts" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}

                </select>
                <input type="text" value={data.subcategoryName} placeholder="نام زیرشاخه را وارد کنید" name="subcategoryName" onChange={inputHandler} />
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

