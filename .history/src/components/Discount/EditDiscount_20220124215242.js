import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditDiscount.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';



export default function EditDiscount() {
    
    const [data , setData] = useState({
        parent : '' ,
        subcategoryName : '' , 
    })
    const [category , setCategory] = useState([]);

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/products/`).then(res => setProducts(res.data))
        await axios.get(`https://f41f5c809bb0ed.lhr.life/api/v1/categories/`).then(res => setCategory(res.data))
        console.log(data.parent);

    },[])
    const categoryHandler = (e) =>{
        setData({... data , parent: e.target.value})
        console.log(data);

    }
    const inputHandler =(event) =>{
        setData({...data , subcategoryName: event.target.value})
    }
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`https://f41f5c809bb0ed.lhr.life/api/v1/category/update/${props.match.params.slug}/` , {
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
                <select  onChange={e => categoryHandler(e)}>
                   {category.length > 0 && <option selected hidden value={category.find(item => item.id == data.parent).id} >{category.find(item => item.id == data.parent).name}</option>}
                   {category.map(item => <option name="category" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}

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

