import React,{useEffect , useState} from 'react';
import styles from "../../styles/Discount.module.css"
import { MainLink } from '../Link/MainLink';
import Sidebar from '../Sidebar'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddDiscount() {
 
    const [data , setData] = useState({
        product: [],
        discountPercent : '' ,
        valid_from : '' , 
        valid_to : '' , 
    })
    const [products , setProducts] = useState([]);

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/products/`).then(res => setProducts(res.data))
    },[])
    const categoryHandler = (e) =>{
        data.product.push(e.target.value)
        console.log(data.product);

    }
    const inputHandler =(event) =>{
        setData({...data , [event.target.name]: event.target.value})
    }
    const history = useHistory();
    const submitHandler = (event) =>{
        event.preventDefault()
        axios.post(`${MainLink}/api/v1/discount/create/` , {
            discount_percent: data.discountPercent,
            valid_from: data.valid_from,
            valid_to: data.valid_to,
            products: data.product,
        },{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            },
        }).then(res => {if (res) {
            toast.success("تخفیف با موفقیت اعمال شد")
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
                <h3>ایجاد تخفیف </h3>
            </section>
            <br />
            <section className={styles.inputs} dir='rtl'>
                <select  onChange={e => categoryHandler(e)}>
                   <option selected value="" >انتخاب محصول </option>
                   {products.map(item => <option name="category" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}
                </select>
                <input type="text" value={data.discountPercent} placeholder="درصد تخفیف را وارد کنید" name="discountPercent" onChange={inputHandler} />
                <input type="text" value={data.valid_from} placeholder="تاریخ شروع تاریخ" name="valid_from" onChange={inputHandler} />
                <input type="text" value={data.valid_to} placeholder="تاریخ پایان تخفیف" name="valid_to" onChange={inputHandler} />
            </section>
            <br />
            <input className={styles.submitBtn} type="submit" value="ثبت دسته تخفیف " />
        </form>
        <section className={styles.sidebar}>
         <Sidebar  />
        </section>
        <ToastContainer />
    </div>
    )
}
