import React, { useEffect, useState }  from 'react'
import styles from '../../styles/Reports.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from '../Link/MainLink';


export default function Reports() {
  
    const [category , setCategory] = useState([])
    const [report , setReport] = useState({
        gains: '',
        total_sells_per_month: '',

    })
    const [sells , setSells] = useState({
        order_count: '',
        total_gain: '',
        total_sells: '',

    })
    const [data , setData] = useState({
        category: '',
        startDate: '',
        endDate: '',
    })


    
    useEffect( async () => {
        await axios.get(`${MainLink}/api/v1/categories/`).then(res => setCategory(res.data))
        const total_gains =  await axios.get(`${MainLink}/api/v1/total_gains/`)
        const order_count =  await axios.get(`${MainLink}/api/v1/orders_count/`)
        setSells({...sells , order_count: order_count.data.all ,
            total_gain: total_gains.data.total_gain ,
            total_sells: total_gains.data.total_sells})
        
    },[])

    const categoryHandler = (event) =>{
        setData({...data , category: event.target.value})
    }

    const inputsHandler = (event) =>{
        setData({...data , [event.target.name] : event.target.value})
        console.log(data);
    }
    

    const submitHandler = (event) =>{
        event.preventDefault()
        if (data.category.length > 0) {
            axios.post(`${MainLink}/api/v1/gains/` ,{
                slug: data.category,
                date_start: data.startDate,
                date_end: data.endDate
            }).then(response => setReport({...report , 
                
            }))
        }
    }   

    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <h3>صفحه اعمال تخفیف</h3>
               </section>
               <br />
                <section className={styles.box}>
                    <div className={styles.Profit}>
                        <p>سود تمام دسته بندی</p>
                        {sells.total_gain}
                    </div>
                    <div className={styles.orders}>
                        <p>کل سفارشات پرداخت شده</p>
                        {sells.order_count}
                    </div>
                    <div className={styles.categoryAllSell}>
                        <p>سود تمام دسته بندی ها</p>
                        {sells.total_sells}
                    </div>
                </section>
                <br />
                <form className={styles.form} onSubmit={submitHandler}>
                <section className={styles.sectionBox} dir='rtl'>
                    <select  onChange={e => categoryHandler(e)}>
                        <option value="null">دسته بندی</option>
                        {category.map(item => <option key={item.id} value={item.slug}>{item.name}</option>)}
                    </select>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <input type="text" value={data.startDate} placeholder="مثال 10-10-1400" name="startDate" onChange={inputsHandler} />
                    <input type="text" value={data.endDate} placeholder="مثال 10-12-1400" name="endDate" onChange={inputsHandler} />
                    {report.gains && <p> کل فروش از این دسته بندی {report.total_sells_per_month}</p>}
                    {report.total_sells_per_month && <p>سود از فروش {report.gains}</p>}
                </section>
                <input type="submit" className={styles.submitBtn} value="دریافت گزارش" />
                </form>
            </section>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}