import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditParentCategory.module.css"
import { MainLink } from '../Link/MainLink'
import Sidebar from '../Sidebar'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditParentCategory = () => {
    const [data , setData] = useState({
        slug: '',
        parentCategory : '' , 
    })
    const [category , setCategory] = useState([]);

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/categories/`).then(res => setCategory(res.data))
        console.log(category);

    },[])
    const categoryHandler = (e) =>{
        setData({... data , slug: [category.find(item => item.id == e.target.value).slug] , parentCategory: [category.find(item => item.id == e.target.value).name]})

    }
    const inputHandler =(event) =>{
        setData({...data , parentCategory: event.target.value})
    }
    const history = useHistory();
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`${MainLink}/api/v1/category/update/${data.slug}/` , {
            name: data.parentCategory,
        },{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }}).then((res) => {
            if (res) {
              toast.success("دسته بندی با موفقیت ویرایش شد")
              setTimeout(() => {
                  history.push(`/Categories-List`)
              },5000)
            }
          }).catch((error) => {
            if(error.response){
            toast.error("موارد وارد شده صحیح نمیباشد")
            }
        });
    }
    const categoryDeleteHandler =(slug) =>{
        console.log(slug);
        axios.delete(`${MainLink}/api/v1/category/delete/${slug}/`)
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
                   {category.map(item => item.parent.length > 0 && <option key={item.id} value={item.id}>{item.name}</option>)}

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
        <ToastContainer />
    </div>
    )
}


export default EditParentCategory
