import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditCategory.module.css"
import { MainLink } from '../Link/MainLink'
import Sidebar from '../Sidebar'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditCategory = (props) => {
    const redirect = new useHistory();

  
    const [data , setData] = useState({
        parent : '' ,
        subcategoryName : '' , 
    })
    const [category , setCategory] = useState([]);

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/category/update/${props.match.params.slug}`,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }
        }).then(res => setData({
            parent: res.data.parent,
            subcategoryName: res.data.parent && res.data.name
        }))
        await axios.get(`${MainLink}/api/v1/categories/`,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }
        }).then(res => setCategory(res.data))

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
        axios.put(`${MainLink}/api/v1/category/update/${props.match.params.slug}/` , {
            parent: data.parent,
            name: data.subcategoryName
        }
        ,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }
        }).then((res) => {
            if (res) {
              toast.success("دسته بندی با موفقیت ویرایش شد")
              setTimeout(() => {
                  redirect.push(`/Categories-List`)
              },5000)
            }
          }).catch((error) => {
            if(error.response){
            toast.error("موارد وارد شده صحیح نمیباشد")
            }
        });
        
    }
    return (
        <div className={styles.container}>
            {console.log(category)}
        <form className={styles.main} onSubmit={submitHandler}>
            <section className={styles.header}>
                <h3>ویرایش دسته بندی</h3>
            </section>
            <br />
            <section className={styles.inputs} dir='rtl'>
                <select  onChange={e => categoryHandler(e)}>
                   {category.length > 0 && category.parent ? <option selected hidden value={category.find(item => item.id == data.parent).id} >{category.find(item => item.id == data.parent).name}</option> :
                   <option selected hidden value="" >{category.length > 0 && category.find(item => item.slug == props.match.params.slug).name}</option>  }
                   {category.map(item => item.parent.length > 0 && <option name="category" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}

                </select>
                <input type="text" value={data.subcategoryName} placeholder="نام زیرشاخه را وارد کنید" name="subcategoryName" onChange={inputHandler} />
            </section>
            <br />
            <input className={styles.submitBtn} type="submit" value="ثبت دسته بندی " />
        </form>
        <section className={styles.sidebar}>
         <Sidebar  />
        </section>
        <ToastContainer />
    </div>
    )
}

export default EditCategory
