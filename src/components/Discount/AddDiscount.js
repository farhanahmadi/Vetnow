import React,{useEffect , useState} from 'react';
import styles from "../../styles/Discount.module.css"
import { MainLink } from '../Link/MainLink';
import Sidebar from '../Sidebar'
import axios from 'axios'
import Multiselect from 'multiselect-react-dropdown';
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
    const [number , setNumber] = useState();


    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1/products/`).then(res => setProducts(res.data))
    },[])
    const categoryHandler = (e) =>{
        data.product.push(...e.map(item => item.id))
        setNumber(Math.random())

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
            products: data.product.length > 0 ? [...new Set(data.product)] : ['0']
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
                <Multiselect 
                    options={products}
                    onSelect={categoryHandler} 
                    displayValue="name"
                    />
                <input type="text" value={data.discountPercent} placeholder="درصد تخفیف را وارد کنید" name="discountPercent" onChange={inputHandler} />
                <input type="text" value={data.valid_from} placeholder="تاریخ شروع مثال (10-10-1401)" name="valid_from" onChange={inputHandler} />
                <input type="text" value={data.valid_to} placeholder="تاریخ پایان مثال (10-10-1402)" name="valid_to" onChange={inputHandler} />
            </section>
            <br />
            <input className={styles.submitBtn} type="submit" value="ثبت تخفیف " />
        </form>
        <section className={styles.sidebar}>
         <Sidebar  />
        </section>
        <ToastContainer />
    </div>
    )
}
