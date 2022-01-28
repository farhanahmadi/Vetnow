import React,{useRef, useState , useEffect, Component } from 'react'
import styles from "../../styles/EditProduct.module.css"
import Sidebar from '../Sidebar'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MainLink } from '../Link/MainLink';
const EditNews = () => {

    const firstFileUpload = useRef(null);
    // set kardan data baraye ersal be database
    const [data , setData] = useState({
        title: '',
        username: '',
        title_image: '',
        body: '',
        created_at: '',
        firstImg: ''
    })
    // 
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
        const URL = `${MainLink}/api/v1/news/detail/${props.match.params.slug}/`
        const inputValue = await axios.get(URL);
        setData(await {...data , 
            title: inputValue.data.title,
            username: inputValue.data.author.username,
            title_image: inputValue.data.title_image,
            body: inputValue.data.body,
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
    const submitHandler = async (event) =>{
        event.preventDefault();
        const formD = new FormData()
        data.firstImg  && photo && formD.append('title_image' , photo , photo.name) 
        formD.append('title' , data.title)
        formD.append('categories' , data.category)
        formD.append('categories' , data.subcategory)
        formD.append('quantity' , data.quantity)
        formD.append('body	' , data.body)
        formD.append('created_at' , data.created_at)
        formD.append('company_price' , data.purchasePrice)
        formD.append('manufacturer_company' , data.manufacturerPrice)
        data.pdf_file && formD.append('pdf_file' , pdf , pdf.name)
        fetch(`${MainLink}/api/v1/product/update/${props.match.params.slug}/`,{
            method:"PUT",
            body:formD
        }).then(res => console.log(res))
    }
    // 
    return (
        <div className={styles.container}>
            <form className={styles.main} onSubmit={submitHandler}>
                <section className={styles.header}>
                    <h3>ایجاد محصول</h3>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <input type="text" value={data.name} placeholder="نام محصول" name="name" onChange={inputsHandler} />
                    <select  onChange={e => categoryHandler(e)}>
                        {categories.length > 0 ? <option disabled selected hidden value="">{categories[categoryId.category - 1].name}</option> : <option disabled hidden selected value="null">دسته بندی</option>}
                        {categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <select onChange={e => subCategoryHandler(e)}>
                        {categories.length > 0 && categoryId.subcategory ? <option disabled selected value=""> {(categories[categoryId.category - 1].parent.find(item => item.id == [categoryId.subcategory]).name)} </option> : <option disabled selected value="null">دسته بندی</option>}
                        {subcategory.map(subcategories => subcategories.parent.map(subcategory => <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>))}
                    </select>
                    <input type="number" value={data.quantity} placeholder="تعداد محصول" name="quantity" onChange={inputsHandler} />
                    <input type="number" value={data.salesPrice} placeholder="قیمت فروش" name="salesPrice" onChange={inputsHandler} />
                    <input type="text" value={data.manufacturerPrice} placeholder=" تولید کننده" name="manufacturerPrice" onChange={inputsHandler} />
                    <input type="number" value={data.purchasePrice} placeholder="قیمت خرید" name="purchasePrice" onChange={inputsHandler} />
                    <input type="file" placeholder="فایل پی دی اف"  name="pdf_file" onChange={inputsHandler} />
                    <a className={styles.pdf} href={data.pdf_file}>دانلود فایل pdf</a>

                </section>
                <section className={styles.textEditor}>
                <CKEditor className={styles.editor}
                editor={ClassicEditor}
                config={{
                    language: 'fa',
                }}
                onChange={(e,editor) => {editorHandler(e,editor)}}
                data={editorText}
                />
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
                    {data.secoundImg ?/* <button onClick={fileuploadclickHandler}>upload</button> */ 
                        <div className={styles.secoundImg}>
                           
                        <img
                            src={data.secoundImg}
                            alt="Thumb"
                            />
                            <button id="secoundImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div>
                        :
                        data.secoundImg ?
                            <div className={styles.imgBox}>
                            <img
                                src={data.secoundImg}
                                alt="Thumb"
                                />
                                <button id="secoundImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div> 
                        :
                        <div className={styles.imgBox}>
                        <input style={{display:"none"}} name="secoundImg" onChange={fileuploadHandler} type="file" 
                        ref={secoundFileUpload} />
                        <section onClick={() => secoundHandleUpload()} className={styles.divImg}>
                            <p>کلیک برای آپلود عکس</p>
                        </section>
                        </div>
                        
                        
                    }
                    {data.thirdImg ?/* <button onClick={fileuploadclickHandler}>upload</button> */ 
                        <div className={styles.thirdImg}>
                            <img
                            src={data.thirdImg}
                            alt="Thumb"
                            />
                            <button id="thirdImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div>
                        :
                       data.thirdImg ?  
                       <div className={styles.imgBox}>
                        <img
                            src={data.thirdImg}
                            alt="Thumb"
                            />
                            <button id="thirdImgBtn" onClick={clickHandler}>حدف عکس</button>
                       </div> 
                       :
                       <div className={styles.imgBox}>
                       <input style={{display:"none"}} name="thirdImg" onChange={fileuploadHandler} type="file" 
                       ref={thridFileUpload} />
                       <section onClick={() => thirdHandleUpload()} className={styles.divImg}>
                           <p>کلیک برای آپلود عکس</p>
                       </section>
                       </div>
                    }

                        <div className={styles.imgBox}>
                        <section className={styles.divImg}>
                            <Link to={`/Edit-3Dview-Products/${data.slug}`} ><p>ویرایش 3D</p></Link>
                        </section>
                        </div>
                    
                </div>
                </section>
                <input className={styles.submitBtn} type="submit" value="ثبت محصول " />
            </form>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}
export default EditNews;
