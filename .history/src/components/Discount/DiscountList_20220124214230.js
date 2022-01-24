import React, { useEffect, useState }  from 'react'
import styles from '../../styles/DiscaountProductsList.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'



export default function DiscountList() {
  
    const [data , setData] = useState([])
    const [paginateBtn , setPaginateBtn] = useState([])
    const [count , setCount] = useState()
    const [paginate , setPaginate] = useState(1);
    const [id , setId] = useState(1);


    let URL = `https://545e5c1b9c3616.lhr.life/api/v1/users/list/?page=${paginate}`;
    useEffect( async () => {
        await axios.get(URL).then(res => setData(res.data.results))
        await axios.get(URL).then(res => setCount(res.data.count))

        for (let index = 0; index < count/2; index++) {
           paginateBtn.length < count/2 && setPaginateBtn((prevstate) => [...prevstate , index])   
        }
    },[paginate , count ])
    
    const clickHandler = (number) =>{
        setPaginate(number.target.id);
        setId(number.target.id);
        console.log(id);
    }
    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <Link to="/Add-User" >+ افزردن کاربر </Link>
                    <h3>کاربران</h3>
               </section>
               <table dir="rtl">
                    <tr>
                        <th>ID</th>
                        <th>نام کاربری</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>ایمیل</th>
                        <th>عملیات</th>
                    </tr>
                    {data.map(item => <tr key={item.id}> 
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td><Link to={`/Edit-User/${item.id}`}>ویرایش</Link></td>
                     </tr>)}
                </table>
                <div className={styles.pagination}>
                <a onClick={clickHandler} href="#" className={styles.arrows}>&laquo;</a>
                {paginateBtn.map(item => <a className={id == item+1 ? styles.active : null} onClick={clickHandler} key={item} id={item + 1} >{item + 1}</a>)}
                <a onClick={clickHandler} href="#" className={styles.arrows}>&raquo;</a>
                </div>
            </section>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}
