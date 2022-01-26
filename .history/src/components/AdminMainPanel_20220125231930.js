import React, { useEffect, useState }  from 'react'
import styles from '../styles/Reports.module.css'
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from './Link/MainLink';


const AdminMainPanel = () => {
 
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
    const [categorySell , setCategorySell] = useState({
        gains: '',

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
        if (data.startDate.length > 0) {
            setCategorySell({...categorySell , gains: ''})
            axios.post(`${MainLink}/api/v1/gains/` ,{
                slug: data.category,
                date_start: data.startDate,
                date_end: data.endDate
            }).then(response => setReport({...report , 
                gains: response.data.gains,
                total_sells_per_month: response.data.total_sells_per_month,
            }))
        }else{
            axios.get(`${MainLink}/api/v1/gains/${data.category}/`).then(response => setCategorySell({...data, gains: response.data.gains}))
        }
    }   

    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section></section>
            </section>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}
export default AdminMainPanel;
