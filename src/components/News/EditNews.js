import React,{useRef, useState , useEffect, Component } from 'react'
import styles from "../../styles/EditNews.module.css"
import Sidebar from '../Sidebar'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { MainLink } from '../Link/MainLink';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditNews = (props) => {

    const firstFileUpload = useRef(null);
    const usersLink = `${MainLink}/api/v1/admin/user/list/`;


    // set kardan data baraye ersal be database
    const [data , setData] = useState({
        title: '',
        username: '',
        body: '',
        created_at: '',
        author: '',
        authorDetails: '',
        firstImg: ''
    })
    // 
    const [admins , setAdmins] = useState([])

    // baraye ckeditor chon hengam estfade az data.body input haye dig neshon nmidad
    const [editorText , setEditorText] = useState('')
    //
    // set kardan aks ha baraye ersal be database
    const [photo , setPhoto] = useState(null)

    //
    // set state kardan input ha
    const inputsHandler = (event) => {
            setData({... data , [event.target.name] : event.target.value})
    }
    // 

    // set state kardan tinymce 
    const editorHandler = (e,editor) =>{
        setData({... data , body : editor.getData()})
    }
    //

     // gereftan api input ha baraye namayesh value gabli
     useEffect( async () =>  {
        const users = await axios.get(usersLink);
        setAdmins(await users.data)
        const URL = `${MainLink}/api/v1/news/${props.match.params.slug}/`
        const inputValue = await axios.get(URL);
        setData(await {...data , 
            title: inputValue.data.title,
            username: inputValue.data.author.username,
            firstImg: inputValue.data.title_image,
            body: inputValue.data.body,
            author: inputValue.data.author.id,
            authorDetails: inputValue.data.author,
            created_at: inputValue.data.created_at,
        })
        setEditorText(inputValue.data.body);
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

    const userHandler = (event) =>{
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
        formD.append('body	' , data.body)
        // formD.append('created_at' , data.created_at)
        formD.append('author' , data.author)
        fetch(`${MainLink}/api/v1/news/update/${props.match.params.slug}/`,{
            
            method:"PUT",
            headers: new Headers({
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }),
            body:formD,
        })
        .then(response => {if (response) {
            toast.success("اخبار با موفقیت ویرایش شد")
            setTimeout(() => {
                history.push(`/NewsList`)
            },5000)
        }})
        .catch(error =>{
            toast.error("لطفا دوباره تلاش کنید")
        });
    }
    // 
    return (
        <div className={styles.container}>
            <form className={styles.main} onSubmit={submitHandler}>
                <section className={styles.header}>
                    <h3>ایجاد اخبار</h3>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <input type="text" value={data.title} placeholder="تیتر خبر" name="title" onChange={inputsHandler} />
                    <CKEditor className={styles.editor}
                        editor={ClassicEditor}
                        config={{
                            language: 'fa',
                        }}
                        onChange={(e,editor) => {editorHandler(e,editor)}}
                        data={editorText}
                        />
                    <select  onChange={e => userHandler(e)}>
                        <option value={data.author} hidden >{`${data.authorDetails.first_name} ${data.authorDetails.last_name}`}</option>
                        {admins.map(item => <option key={item.id} value={item.id}>{`${item.first_name} ${item.last_name}`}</option>)}
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
                        data.firstImg ? 
                        <div className={styles.imgBox}>
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
                <input className={styles.submitBtn} type="submit" value="ثبت محصول " />
            </form>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
            <ToastContainer />
        </div>
    )
}
export default EditNews;
