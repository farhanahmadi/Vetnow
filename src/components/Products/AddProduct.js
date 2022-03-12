import React,{useRef, useState , useEffect} from 'react'
import styles from "../../styles/AddProduct.module.css"
import Sidebar from '../Sidebar'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { MainLink } from '../Link/MainLink';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {
    const editorRef = useRef(null);
    const firstFileUpload = useRef(null);
    const secoundFileUpload = useRef(null);
    const thridFileUpload = useRef(null);
    const categoryLINK = `${MainLink}/api/v1/categories/`;
    const createProductLINK = `${MainLink}/api/v1/product/create/`;

    // set kardan data baraye ersal be database
    const [data , setData] = useState({
        name: '',
        category: '',
        subcategory: '',
        quantity: '',
        salesPrice: '',
        manufacturerPrice: '',
        purchasePrice: '',
        body: '',
        pdffile: '',
        firstImg: null ,
        secoundImg: null,
        thirdImg: null,
        fourthImg: null
    })
    // 
    // set kardan aks ha baraye ersal be database
    const [photo , setPhoto] = useState(null)
    const [photo1 , setPhoto1] = useState(null)
    const [photo2 , setPhoto2] = useState(null)
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
     // gereftan value selected option baraye gereftan zirshaxe ha
     const categoryHandler = (e) =>{ 
        setSubcategory([categories.find(item => item.id == e.target.value)])
        setData({...data ,category: [e.target.value]})
        console.log(data.category);
        // console.log(categories.find(item => item.id == e.target.value));
    }
    const subCategoryHandler = (e) =>{ 
        setData({...data , subcategory: [e.target.value]})
        console.log(data.subcategory);
    }
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
    const history = useHistory();
    const submit3DHandler = (event) =>{
        const formD = new FormData()
        data.firstImg  && photo && formD.append('image' , photo , photo.name)
        data.secoundImg  && photo && formD.append('image2' , photo1 , photo1.name )
        data.thirdImg  && photo && formD.append('image3' , photo2 , photo2.name )
        formD.append('name' , data.name)
        formD.append('categories' , data.category)
        formD.append('categories' , data.subcategory)
        formD.append('quantity' , data.quantity)
        formD.append('descreption' , data.body)
        formD.append('price' , data.salesPrice)
        formD.append('company_price' , data.purchasePrice)
        formD.append('manufacturer_company' , data.manufacturerPrice)
        data.pdffile && formD.append('pdf_file' , pdf , pdf.name)
        console.log(formD);
        fetch(createProductLINK,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            },
            method:"POST",
            body:formD
        }).then(response => {
                if(response.status !== 400){
                    response.json().then(json => {
                        toast.success("محصول با موفقیت ساخته شد")
                        setTimeout(() => {
                            history.push(`/3Dview-Products/${json.id}`)
                        },5000)
                      });
                }else{
                    response.json().then(json => {
                        toast.error("موارد وارد شده صحیح نمیباشد")
                      });
                }
          })
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
                    <input type="text" value={data.name} placeholder="نام محصول" name="name" onChange={inputsHandler} />
                    <select onChange={e => categoryHandler(e)}>
                        <option value="null">دسته بندی</option>
                        {categories.map(item => item.parent.length > 0 && <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <select onChange={e => subCategoryHandler(e)}>
                        <option value="null">زیر شاخه</option>
                        {subcategory.map(subcategories => subcategories.parent.map(subcategory => <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>))}
                    </select>
                    <input type="number" value={data.quantity} placeholder="تعداد محصول" name="quantity" onChange={inputsHandler} />
                    <input type="number" value={data.salesPrice} placeholder="قیمت فروش" name="salesPrice" onChange={inputsHandler} />
                    <input type="text" value={data.manufacturerPrice} placeholder=" تولید کننده" name="manufacturerPrice" onChange={inputsHandler} />
                    <input type="number" value={data.purchasePrice} placeholder="قیمت خرید" name="purchasePrice" onChange={inputsHandler} />
                    <input type="file" placeholder="فایل پی دی اف" name="pdffile" onChange={inputsHandler} />
                </section>
                <section className={styles.textEditor}>
                <CKEditor className={styles.editor}
                editor={ClassicEditor}
                config={{
                    language: 'fa',
                    placeholder: "متن خود را وارد کنید"
                }}
                onChange={(e,editor) => {editorHandler(e,editor)}}
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
                        <div className={styles.imgBox}>
                        <input style={{display:"none"}} name="thirdImg" onChange={fileuploadHandler} type="file" 
                        ref={thridFileUpload} />
                        <section onClick={() => thirdHandleUpload()} className={styles.divImg}>
                            <p>کلیک برای آپلود عکس</p>
                        </section>
                        </div>
                    }

                    
                </div>
                </section>
                <input name="submit3D" onClick={submit3DHandler} className={styles.submitBtn} type="submit" value=" ثبت محصول و سه بعدی  " />

            </form>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
            <ToastContainer />
        </div>
    )
}

export default AddProduct
