import React, { useEffect, useState }  from 'react'
import styles from '../../styles/Users.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MainLink } from '../Link/MainLink'
import { FaSearch  } from 'react-icons/fa';


const Users = () => {

    const refreshPage = ()=>{
        window.location.reload();
     }


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

    const userDeleteHandler = (id) =>{
        const result = window.confirm("?????? ?????????? ?????????? ?? ")
        if (result) {
            axios.delete(`${MainLink}/api/v1/user/delete/${id}/`,{
                headers:{
                    'Authorization': 'Token '+ localStorage.getItem('token'), 
                }}).then(response => {if (response) {
                    refreshPage();
            }})
        }
    }
    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <Link to="/Add-User" >+ ???????????? ?????????? </Link>
                    <h3>??????????????</h3>
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
               <table dir="rtl" className={styles.usersTable}>
               <tbody>
                    <tr>
                        <th>ID</th>
                        <th>?????? ????????????</th>
                        <th>??????</th>
                        <th>?????? ????????????????</th>
                        <th>??????????</th>
                        <th>????????????</th>
                    </tr>
                    {data.map(item => <tr key={item.id}> 
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td>
                            <Link to={`/Edit-User/${item.id}`}><button className={styles.editButton}>????????????</button></Link>
                            <button onClick={() => userDeleteHandler(item.id)} className={styles.deleteButton}>??????</button>
                            </td>
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
