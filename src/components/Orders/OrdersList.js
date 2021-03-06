import React, { useEffect, useState }  from 'react'
import styles from '../../styles/Orderlist.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from '../Link/MainLink';
import * as shamsi from 'shamsi-date-converter';
import { FaSearch  } from 'react-icons/fa';


export default function OrdersList() {

    
 
    const [data , setData] = useState([])
    const [paginateBtn , setPaginateBtn] = useState([])
    const [count , setCount] = useState()
    const [paginate , setPaginate] = useState(1);
    const [id , setId] = useState(1);
    const [serach , setSearch] = useState("");
    const [extraPaginateBtn , setExtraPaginateBtn] = useState(false)


    let URL = `${MainLink}/api/v1/orders/?page=${paginate}&search=${serach}`;
    useEffect( async () => {
        await axios.get(URL , {
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            },
            }).then(res => setData(res.data.results))
            await axios.get(URL , {
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            },
            }).then(res => setCount(res.data.count))
            if (serach === "") {
                for (let index = 0; index < count/20; index++) {
                    paginateBtn.length < count/20 && setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])
            }}else{
                if (count === 1) {
                    setPaginateBtn([0])
                }
                else{
                    !extraPaginateBtn && setPaginateBtn([])
                    paginateBtn.length == 0 && setExtraPaginateBtn(true)
                    setExtraPaginateBtn(true)
                    for (let index = 0; index < Math.ceil(count/20); index++) {
                        setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])
                    console.log(count);

            }}
            
    }
    },[paginate , count , serach ])
    
    const clickHandler = (number) =>{
        setPaginate(number.target.id);
        setId(number.target.id);
        console.log(id);
    }
    const searchHandler = (event) =>{
        setSearch(event.target.value)
    }
    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <h3 style={{textAlign: 'right'}}>???????? ??????????????</h3>
               </section>
               <section className={styles.searchTableHeader}>
                   <div className={styles.searchBox}>
                   <li style={{position: 'absolute' , padding: '10px' , minWidth: '40px' , listStyleType: 'none' , marginLeft: '10px' , cursor: 'pointer'}}><FaSearch /></li>
                    <input onChange={searchHandler} className={styles.searchInput} value={serach} placeholder="?????????? ...." />
                   </div>
                   <div className={styles.textBox}>
                    <h3>?????????? ???? ??????????????</h3>
                   </div>
               </section>
               <table dir="rtl" className={styles.ordersTable}>
                   <thead>
                    <tr>
                        <th>ID</th>
                        <th>????????????</th>
                        <th>????????</th>
                        <th>?????????? ????????????</th>
                        <th>?????????? ????????</th>
                        <th>??????????</th>
                        <th>????????????</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => <tr key={item.id}> 
                        <td>{item.id}</td>
                        <td>{item.owner.username}</td>
                        <td>{item.amount}</td>
                        {item.payment_status === "p" && <td>???????????? ????????</td>}
                        {item.payment_status === "c" && <td>???????????? ????????????</td>}
                        {item.payment_status === "r" && <td>????????????</td>}
                        <td>{item.confirmation? "?????????? ??????" : "?????????? ????????"}</td>
                        {item.confirmation ? <td style={{color: 'green'}}>?????????? ??????</td> : <td style={{color: 'red'}}>?????????? ????????</td>}
                        <td>{shamsi.gregorianToJalali(item.created)}</td>
                        <td><Link to={`/Edit-Order/${item.id}/${item.order_id}`}><button className={styles.editButton}>????????????</button></Link></td>
                     </tr>)}
                     </tbody>
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
