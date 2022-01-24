import React, { useEffect, useState }  from 'react'
import styles from '../../styles/Reports.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from '../Link/MainLink';


export default function Reports() {
  
    const [category , setCategory] = useState([])
    const [sells , setSells] = useState({
        order_count: '',
        
    })
    const [data , setData] = useState({
        category: '',
        startDate: '',
        endDate: '',
    })


    
    useEffect( async () => {
        await axios.get(`${MainLink}/api/v1/categories/`).then(res => setCategory(res.data))
        const order_count =  await axios.get(`${MainLink}/api/v1/categories/`)
        const total_gains =  await axios.get(`${MainLink}/api/v1/orders_count/`)

    },[])

    const categoryHandler = (event) =>{

    }

    const inputsHandler = (event) =>{
        setData({...data , [event.target.name] : event.target.value})
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
                        {}
                    </div>
                    <div className={styles.orders}>
                        <p>کل سفارشات پرداخت شده</p>
                        {}
                    </div>
                    <div className={styles.categoryAllSell}>
                        <p>سود تمام دسته بندی ها</p>
                        {}
                    </div>
                </section>
                <br />
                <section className={styles.sectionBox} dir='rtl'>
                    <select  onChange={e => categoryHandler(e)}>
                        <option value="null">دسته بندی</option>
                        {category.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <input type="number" value={data.startDate} placeholder="مثال 10-10-1400" name="startDate" onChange={inputsHandler} />
                    <input type="number" value={data.endDate} placeholder="مثال 10-12-1400" name="endDate" onChange={inputsHandler} />
                </section>
            </section>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}