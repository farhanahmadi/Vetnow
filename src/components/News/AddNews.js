import React,{useRef, useState , useEffect} from 'react'
import styles from "../../styles/AddNews.module.css"
import Sidebar from '../Sidebar'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { MainLink } from '../Link/MainLink';


const AddNews = () => {
    const editorRef = useRef(null);
    const firstFileUpload = useRef(null);
    const secoundFileUpload = useRef(null);
    const thridFileUpload = useRef(null);
    const usersLink = `${MainLink}/api/v1/admin/user/list/`;
    const createNewsLINK = `${MainLink}/api/v1/news/create/`;

    // set kardan data baraye ersal be database
    const [data , setData] = useState({
        title: '',
        body: '',
        author: '',
        firstImg: null ,
    })
    // 
    // set kardan aks ha baraye ersal be database
    const [photo , setPhoto] = useState(null)
    const [pdf , setPdf] = useState(null)
    // 
    // state baraye gereftan user ha
    const [admins , setAdmins] = useState([])
    // 
    // set state kardan input ha
    const inputsHandler = (event) => {
            setData({... data , [event.target.name] : event.target.value})
            console.log(data);
        }
    // 
    // 
    // set state kardan tinymce 
    const editorHandler = (e,editor) =>{
        setData({... data , body : editor.getData()})
    }
    //
    // gereftan api Users ha baraye namayesh
    useEffect(async () =>  {
        const users = await axios.get(usersLink);
        setAdmins(await users.data)


    }, [])
    // 
    // set kardan img ha dar state ha 
    const fileuploadHandler = async (event) =>{
        if(event.target.name === "firstImg"){
            setData({...data , firstImg: URL.createObjectURL(event.target.files[0])})
            setPhoto(event.target.files[0])
        }
    }
    // 

    const usersHandler = (event) =>{
        setData({...data , author: event.target.value})
    }
   
    // baraye inke input hide shode az tarig div karkone
    const firstHandleUpload = () => {
        firstFileUpload.current.click();
        };
    // 
    // in baxsh baraye btn hazf mibashad ke aks preview pakshode va div nemayesh dade shavad
    const clickHandler = (event) =>{
        if(event.target.id === "firstImgBtn"){
        setData({...data , firstImg: null})
        }
    }
    // 
    // ersal data be database
    const history = useHistory();
    const submitHandler = async (event) =>{
        event.preventDefault();
        const formD = new FormData()
        data.firstImg  && photo && formD.append('title_image' , photo , photo.name)
        formD.append('title' , data.title)
        formD.append('body' , data.body)
        formD.append('author' , data.author)
        console.log(formD);
        fetch(createNewsLINK,{
            
            method:"POST",
            headers: new Headers({
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }),
            body:formD
        }).then(response => console.log(response));
    }

    // 


     return (
        <div className={styles.container}>
            <form className={styles.main} onSubmit={submitHandler}>
                <section className={styles.header}>
                    <h3>ایجاد محصول</h3>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <input type="text" value={data.name} placeholder="تیتر اخبار" name="title" onChange={inputsHandler} />
                    <CKEditor className={styles.editor}
                        editor={ClassicEditor}
                        config={{
                            language: 'fa',
                            placeholder: "متن خود را وارد کنید"
                        }}
                        onChange={(e,editor) => {editorHandler(e,editor)}}
                    />
                    <select  onChange={e => usersHandler(e)}>
                        <option value="null">انتخاب کاربر</option>
                        {admins.map(item => <option key={item.id} value={item.id}>{item.username}</option>)}
                    </select>
                </section>
                <section className={styles.textEditor}>
               
                </section>
                <section className={styles.productsImg}>
                    <h5>: عکس محصول</h5>
                   
                <div className={styles.imageContainer} dir="rtl">
                    {data.firstImg ?/* <button onClick={fileuploadclickHandler}>upload</button> */ 
                        <div className={styles.firstImg}>
                            <img
                            src={data.firstImg}
                            alt="Thumb"
                            />
                            <button id="firstImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div>
                        :
                        <div className={styles.imgBox}>
                            <input style={{display:"none"}} name="firstImg" onChange={fileuploadHandler} type="file" 
                            ref={firstFileUpload} />
                            <section onClick={() => firstHandleUpload()} className={styles.divImg}>
                                <p>کلیک برای آپلود عکس</p>
                            </section>
                        </div>
                    }
                </div>
                </section>
                <input name="submit3D" className={styles.submitBtn} type="submit" value=" ثبت اخبار" />
            </form>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
            
        </div>
    )
}
export default AddNews;
