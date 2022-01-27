import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditParentCategory.module.css"
import Sidebar from '../Sidebar'

const EditParentCategory = () => {
    const [data , setData] = useState({
        slug: '',
        parentCategory : '' , 
    })
    const [category , setCategory] = useState([]);

    useEffect( async () =>{
        await axios.get(`$/api/v1/categories/`).then(res => setCategory(res.data))
        console.log(category);

    },[])
    const categoryHandler = (e) =>{
        setData({... data , slug: [category.find(item => item.id == e.target.value).slug] , parentCategory: [category.find(item => item.id == e.target.value).name]})

    }
    const inputHandler =(event) =>{
        setData({...data , parentCategory: event.target.value})
    }
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`$/api/v1/category/update/${data.slug}/` , {
            name: data.parentCategory,
        }).then(res => console.log(res))
    }
    const categoryDeleteHandler =(slug) =>{
        console.log(slug);
        axios.delete(`$/api/v1/category/delete/${slug}/`)
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
                    <option selected>انتخاب دسته بندی</option>
                   {category.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}

                </select>
                <input type="text" value={data.parentCategory} placeholder="نام جدید دسته بندی را وارد کنید" name="parentCategory" onChange={inputHandler} />
            </section>
            <br />
            <section className={styles.btns}>
            <button type="button" className={styles.delButton} onClick={() => categoryDeleteHandler(data.slug)}>حذف دسته بندی</button>
            <input className={styles.submitBtn} type="submit" value="ثبت دسته بندی " />
            </section>
        </form>
        <section className={styles.sidebar}>
         <Sidebar  />
        </section>
    </div>
    )
}


export default EditParentCategory
