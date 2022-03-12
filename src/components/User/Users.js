import React, { useEffect, useState }  from 'react'
import styles from '../../styles/Users.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from '../Link/MainLink'
import { FaSearch  } from 'react-icons/fa';


const Users = () => {

    const [data , setData] = useState([])
    const [paginateBtn , setPaginateBtn] = useState([])
    const [count , setCount] = useState()
    const [paginate , setPaginate] = useState(1);
    const [id , setId] = useState(1);
    const [serach , setSearch] = useState("");
    const [extraPaginateBtn , setExtraPaginateBtn] = useState(false)


    let URL = `${MainLink}/api/v1/users/list/?page=${paginate}&search=${serach}`;
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
                for (let index = 0; index < count/2; index++) {
                    paginateBtn.length < count/2 && setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])
            }}else{
                if (count === 1) {
                    setPaginateBtn([0])
                }
                else{
                    !extraPaginateBtn && setPaginateBtn([])
                    paginateBtn.length == 0 && setExtraPaginateBtn(true)
                    setExtraPaginateBtn(true)
                    for (let index = 0; index < Math.ceil(count/2); index++) {
                        setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])
                    console.log(count);

            }}
            
    }
    },[paginate , count , serach ])
    
    const clickHandler = async (number) =>{
        setPaginate(number.target.id);
        setId(number.target.id);
    }

    const searchHandler = (event) =>{
        setSearch(event.target.value)
    }
    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <Link to="/Add-User" >+ افزردن کاربر </Link>
                    <h3>کاربران</h3>
               </section>
               <section className={styles.searchTableHeader}>
                   <div className={styles.searchBox}>
                   <li style={{position: 'absolute' , padding: '10px' , minWidth: '40px' , listStyleType: 'none' , marginLeft: '10px' , cursor: 'pointer'}}><FaSearch /></li>
                    <input onChange={searchHandler} className={styles.searchInput} value={serach} placeholder="جستجو ...." />
                   </div>
                   <div className={styles.textBox}>
                    <h3>جستجو در کاربران</h3>
                   </div>
               </section>
               <table dir="rtl" className={styles.usersTable}>
               <tbody>
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
                        <td><button className={styles.editButton}><Link to={`/Edit-User/${item.id}`}>ویرایش</Link></button></td>
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

export default Users
