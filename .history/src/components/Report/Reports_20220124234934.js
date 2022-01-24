import React, { useEffect, useState }  from 'react'
import styles from '../../styles/Reports.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from '../Link/MainLink';


export default function Reports() {
  
    const [category , setCategory] = useState([])
    const [data , setData] = useState({
        category: '',
        startDate: '',
        endDate: '',
    })


    
    useEffect( async () => {
        await axios.get(`${MainLink}/api/v1/categories/`).then(res => setCategory(res.data))


        for (let index = 0; index < count/2; index++) {
           paginateBtn.length < count/2 && setPaginateBtn((prevstate) => [...prevstate , index])   
        }
    },[])
    
    const clickHandler = (number) =>{
        setPaginate(number.target.id);
        setId(number.target.id);
        console.log(id);
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
                    </div>
                    <div className={styles.orders}>
                        <p>کل سفارشات پرداخت شده</p>
                    </div>
                    <div className={styles.categoryAllSell}>
                        <p>سود تمام دسته بندی ها</p>
                    </div>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <select  onChange={e => categoryHandler(e)}>
                        <option value="null">دسته بندی</option>
                        {categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <select onChange={e => subCategoryHandler(e)}>
                        <option value="null">زیر شاخه</option>
                        {category.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <input type="number" value={data.startDate} placeholder="تاریخ شروع" name="startDate" onChange={inputsHandler} />
                    <input type="number" value={data.endDate} placeholder="تاریخ پایان" name="endDate" onChange={inputsHandler} />
                </section>
            </section>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}