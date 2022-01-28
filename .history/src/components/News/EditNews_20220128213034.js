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
        }else{
            setPdf(event.target.files[0])
            console.log(event.target.files[0]);
        }
    }
    // 
     // gereftan value selected option baraye gereftan zirshaxe ha
     const categoryHandler = (e) =>{ 
        setSubcategory(([categories[e.target.value - 1 ]]))
        setData({...data ,category: [e.target.value]})
    }
    const subCategoryHandler = (e) =>{ 
        setData({...data , subcategory: [e.target.value]})
    }
    //
    // set state kardan tinymce 
    const editorHandler = (e,editor) =>{
        setData({... data , body : editor.getData()})
    }
    //

     // gereftan api input ha baraye namayesh value gabli
     useEffect( async () =>  {
        const URL = `${MainLink}/api/v1/product/update/${props.match.params.slug}/`
        const inputValue = await axios.get(URL);
        setData(await {...data , 
            name: inputValue.data.name,
            slug: inputValue.data.slug,
            category: inputValue.data.categories[0],
            subcategory: inputValue.data.categories[1],
            quantity: inputValue.data.quantity,
            salesPrice: inputValue.data.price,
            purchasePrice: inputValue.data.company_price,
            body: inputValue.data.descreption,
            pdf_file_download: inputValue.data.pdf_file,
            manufacturerPrice: inputValue.data.manufacturer_company,
            firstImg: inputValue.data.image,
            secoundImg: inputValue.data.image2,
            thirdImg: inputValue.data.image3,
        })
        setEditorText(inputValue.data.descreption);
    }, [pdf])
    // 
      // gereftan api category ha baraye namayesh
      useEffect(async () =>  {
        const idSplit = props.match.params.id.split(",");
        setCategoryId({category: idSplit[0] , subcategory: idSplit[1]})
        const category = await axios.get(`${MainLink}/api/v1/categories/`);
        // await axios.get("https://1d05ca9129270a.lhr.life/api/v1/products/").then(res => console.log((res.data)))
        setCategories(await category.data)
        // setSubcategory(await [category.data[props.match.params.id[categoryId] - 1].parent.find(item => item.id === subCategoryId - 1)])
        // console.log(category.data[[categoryId.category] - 1]);
    }, [])
    // 
    // set kardan img ha dar state ha 
    const fileuploadHandler = async (event) =>{
        if(event.target.name === "firstImg"){
            setData({...data , firstImg: URL.createObjectURL(event.target.files[0])})
            setPhoto(event.target.files[0])
        }else if(event.target.name === "secoundImg"){
            setData({...data ,secoundImg: URL.createObjectURL(event.target.files[0])})
            setPhoto1(event.target.files[0])
        }else if(event.target.name === "thirdImg"){
            setData({...data ,thirdImg: URL.createObjectURL(event.target.files[0])})
            setPhoto2(event.target.files[0])
        }
    }
    // 
   
    // baraye inke input hide shode az tarig div karkone
    const firstHandleUpload = () => {
        firstFileUpload.current.click();
        };
        const secoundHandleUpload = () => {
        secoundFileUpload.current.click();
        };
        const thirdHandleUpload = () => {
        thridFileUpload.current.click();
        };
    // 
    // in baxsh baraye btn hazf mibashad ke aks preview pakshode va div nemayesh dade shavad
    const clickHandler = (event) =>{
        if(event.target.id === "firstImgBtn"){
        setData({...data , firstImg: null})
        }else if(event.target.id === "secoundImgBtn"){
        setData({...data , secoundImg: null})
        }else if(event.target.id === "thirdImgBtn"){
        setData({...data , thirdImg: null})
        }
    }
    // 
    // ersal data be database
    const submitHandler = async (event) =>{
        event.preventDefault();
        const formD = new FormData()
        data.firstImg  && photo && formD.append('image' , photo , photo.name) 
        data.secoundImg  && photo1 && formD.append('image2' , photo1, photo1.name )
        data.thirdImg  && photo2 && formD.append('image3' , photo2, photo2.name )
        formD.append('name' , data.name)
        formD.append('categories' , data.category)
        formD.append('categories' , data.subcategory)
        formD.append('quantity' , data.quantity)
        formD.append('descreption' , data.body)
        formD.append('price' , data.salesPrice)
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
