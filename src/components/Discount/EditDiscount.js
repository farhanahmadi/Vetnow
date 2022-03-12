import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/EditDiscount.module.css"
import Sidebar from '../Sidebar'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';
import Multiselect from 'multiselect-react-dropdown';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditDiscount(props) {
    const [products , setProducts] = useState([]);
    const [number , setNumber] = useState();
    const [options , setOptions] = useState([]);


    const [data , setData] = useState({
        product: [],
        productId: [],
        discountPercent : '' ,
        valid_from : '' , 
        valid_to : '' , 
    })

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/products/`).then(res => setProducts(res.data))
        await axios.get(`${MainLink}/api/v1/discount_detail/${props.match.params.id}/`).then(res => setData({...data , 
            product: res.data.products,
            productId: res.data.products.map(item => item.id),
            discountPercent: res.data.discount_percent,
            valid_from: shamsi.gregorianToJalali(res.data.valid_from.split("-")).join("-"),
            valid_to: shamsi.gregorianToJalali(res.data.valid_from.split("-")).join("-")
            }))

           
        },[])
    const AddProductHandler = (e) =>{
        data.productId.push(...e.map(item => item.id))
        setNumber(Math.random())
        console.log(data.productId);

    }
    const DeleteProductHandler = (e) =>{
        const newListProducts = data.product.filter(item => item.id != e.target.value)
        const newListProductsId = data.productId.filter(item => item != e.target.value)
        setData({...data , product: newListProducts , productId: newListProductsId})

    }
    const inputHandler =(event) =>{
        setData({...data ,[event.target.name]: event.target.value})
    }
    const history = useHistory();
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.put(`${MainLink}/api/v1/discount_update/${props.match.params.id}/` , {
            discount_percent: data.discountPercent,
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            products: data.productId.length > 0 ? [...new Set(data.productId)] : ['0']
        },{ headers:{
            'Authorization': 'Token '+ localStorage.getItem('token'), 
        }}).then(res => {if (res) {
            toast.success("تخفیف با موفقیت ویراش شد")
            setTimeout(() => {
                history.push(`/Discount-Products-List`)
            },5000)
            }}).catch((error) => {
                if(error.response){
                toast.error("موارد وارد شده صحیح نمیباشد")
                }
        });
    }

    
    return (
        <div className={styles.container}>
        <form className={styles.main} onSubmit={submitHandler}>
            <section className={styles.header}>
                <h3>ویرایش دسته بندی</h3>
            </section>
            <br />
            <section className={styles.inputs} dir='rtl'>
                {/* <select  onChange={e => AddProductHandler(e)}>
                    <option selected >افزردن محصول برای تخفیف</option>
                    {products.map(item => <option name="products" key={item.id} value={item.id}>{item.name}</option> )}
                    {data.productId.length > 0 && console.log(data.productId)}
                </select> */}
               <Multiselect 
                    options={products} // Options to display in the dropdown
                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={AddProductHandler} // Function will trigger on select event
                    // onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    // onChange={(e) => {AddProductHandler(e)}}
                    />
                <select  onChange={e => DeleteProductHandler(e)}>
                    <option selected >حذف محصول از تخفیف ها</option>
                   {data.product.map(item => <option name="products" key={item.id}  value={item.id}>{item.name}</option>)}


                </select>
                
                <input type="text" value={data.discountPercent} placeholder="درصد تخفیف" name="discountPercent" onChange={inputHandler} />
                <input type="text" value={data.valid_from} placeholder="تاریخ شروع تخفیف" name="valid_from" onChange={inputHandler} />
                <input type="text" value={data.valid_to} placeholder="تاریخ پایان تخفیف" name="valid_to" onChange={inputHandler} />
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

