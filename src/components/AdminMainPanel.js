import React, { useEffect, useState }  from 'react'
import styles from '../styles/AdminMainPanel.module.css'
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from './Link/MainLink';
import BarChart from './Chart/BarChart'

const AdminMainPanel = () => {

    const [sells , setSells] = useState({
        refunds_count: '',
        pending_orders: '',
        total_gain: '',
        total_sells: '',

    })
    const [users , setUsers] = useState({
        users_count: '',

    })


    
    useEffect( async () => {
        const total_gains =  await axios.get(`${MainLink}/api/v1/total_gains/`,{ headers:{
            'Authorization': 'Token '+ localStorage.getItem('token'), 
        }})
        const order_count =  await axios.get(`${MainLink}/api/v1/orders/status/count/`,{ headers:{
            'Authorization': 'Token '+ localStorage.getItem('token'), 
        }})
        const user =  await axios.get(`${MainLink}/api/v1/users/count/`,{ headers:{
            'Authorization': 'Token '+ localStorage.getItem('token'), 
        }})
        setSells({...sells , pending_orders: order_count.data.pending_orders , refunds_count: order_count.data.refunds_count ,
            total_gain: total_gains.data.total_gain ,
            total_sells: total_gains.data.total_sells})
        setUsers({...users , users_count: user.data.users_count})
    
    },[])

    return (
        <div className={styles.container}>
            <section className={styles.main}>
            <section className={styles.Boxes}>
               <div className={styles.topBoxDiv}>
                    <div>
                        <p>تعداد کل کاربران</p>
                        {users.users_count}
                    </div>
                    <div>
                        <p>سود کل</p>
                        {sells.total_gain}
                        
                    </div>
                    <div>
                        <p>فروش کل</p>
                        {sells.total_sells}
                    </div>
               </div>
               <div className={styles.bottomBoxDiv}>
                    <div>
                       
                    </div>
                    <div>
                        <p>تعداد سفارشات باز</p>
                        {sells.pending_orders}
                    </div>
                    <div>
                        <p>سفارشات مرجوعی</p>
                        {sells.refunds_count}
                    </div>
               </div>
               </section>
               <section className={styles.chart}>
                
            </section>
            <div className={styles.barChart}>
            <BarChart

            />
            </div>
            </section>
            <section className={styles.sidebar}>
            <Sidebar  />
            </section>
        </div>
    )
}
export default AdminMainPanel;
