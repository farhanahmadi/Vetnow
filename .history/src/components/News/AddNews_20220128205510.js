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
    const categoryLINK = `${MainLink}/api/v1/categories/`;
    const createNewsLINK = `${MainLink}/api/v1//news/create/`;

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
    // state baraye gereftan category ha
    const [categories , setCategories] = useState([])
    const [subcategory , setSubcategory] = useState([])
    // 
    // set state kardan input ha
    const inputsHandler = (event) => {
        if (event.target.name !== "pdffile") {
            setData({... data , [event.target.name] : event.target.value})
            console.log(data);
        }else{
            setPdf(event.target.files[0])
        }
        
        }
    // 
    // 
    // set state kardan tinymce 
    const editorHandler = (e,editor) =>{
        setData({... data , body : editor.getData()})
    }
    //
    // gereftan api category ha baraye namayesh
    useEffect(async () =>  {
        const category = await axios.get(categoryLINK);
        setCategories(await category.data)

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

    const usersHandler = () =>{

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
    const submit3DHandler = (event) =>{
        const formD = new FormData()
        data.firstImg  && photo && formD.append('title_image' , photo , photo.name)
        formD.append('title' , data.title)
        formD.append('categories' , data.category)
        formD.append('categories' , data.subcategory)
        formD.append('quantity' , data.quantity)
        formD.append('descreption' , data.body)
        formD.append('price' , data.salesPrice)
        formD.append('company_price' , data.purchasePrice)
        formD.append('manufacturer_company' , data.manufacturerPrice)
        data.pdffile && formD.append('pdf_file' , pdf , pdf.name)
        console.log(formD);
        fetch(createNewsLINK,{
            method:"POST",
            body:formD
        }).then(response => {
                if(event.target.name === "submit3D"){
                    response.json().then(json => {
                        console.log(json);
                        history.push(`/3Dview-Products/${json.id}`)
                      });
                }
          });
    }
    const submitHandler = async (event) =>{
        event.preventDefault();
    }

    // 


    return (
        <div className={styles.container}>
            <form className={styles.main} onSubmit={submitHandler}>
                <section className={styles.header}>
                    <h3>ایجاد محصول</h3>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <input type="text" value={data.name} placeholder="تیتر اخبار" name="name" onChange={inputsHandler} />
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
                        {categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
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
                <input name="submit3D" onClick={submit3DHandler} className={styles.submitBtn} type="button" value=" ثبت اخبار" />

            </form>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}
export default AddNews;
