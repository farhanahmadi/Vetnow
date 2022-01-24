import React from 'react';
import styles from "../../styles/Discount.module.css"
import { MainLink } from '../Link/MainLink';
import Sidebar from './Sidebar'
import axios from 'axios'


export default function AddDiscount() {
 
    const [data , setData] = useState({
        product: '',
        discountPercent : '' ,
        subcategoryName : '' , 
    })
    const [products , setProducts] = useState([]);

    useEffect( async () =>{
        await axios.get(`${MainLink}/api/v1//products/`).then(res => setProducts(res.data))
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
        axios.post("https://139216de0c3f23.lhr.life/api/v1/category/create/" , {
            parent: data.parent,
            name: data.subcategoryName
        }).then(res => console.log(res))
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
                   <option selected value="" >انتخاب دسته بندی </option>
                   {products.map(item => <option name="category" key={item.id} defaultValue="null" value={item.id}>{item.name}</option>)}
                </select>
                <input type="text" value={data.subcategoryName} placeholder="درصد تخفیف را وارد کنید" name="subcategoryName" onChange={inputHandler} />
                <input type="text" value={data.subcategoryName} placeholder="تاریخ شروع تاریخ" name="subcategoryName" onChange={inputHandler} />
                <input type="text" value={data.subcategoryName} placeholder="تاریخ پایان تخفیف" name="subcategoryName" onChange={inputHandler} />
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
