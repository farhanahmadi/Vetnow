import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/AdminProduct.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import { MainLink } from '../Link/MainLink'
import { FaSearch  } from 'react-icons/fa';


const AdminProduct = () => {

    const refreshPage = ()=>{
        window.location.reload();
     }

    const [data , setData] = useState([])
    const [paginateBtn , setPaginateBtn] = useState([])
    const [count , setCount] = useState()
    const [paginate , setPaginate] = useState(1);
    const [id , setId] = useState(1);
    const [extraPaginateBtn , setExtraPaginateBtn] = useState(false)
    const [search , setSearch] = useState("");



    let URL = `${MainLink}/api/v1/pagination/products/?page=${paginate}&search=${search}`;
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
            if (search === "") {
                for (let index = 0; index < count/20; index++) {
                    paginateBtn.length < count/20 && setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])
            }}else{
                if (count === 1) {
                    setPaginateBtn([0])
                }
                else{
                    !extraPaginateBtn && setPaginateBtn([])
                    paginateBtn.length == 0 && setExtraPaginateBtn(true)
                    for (let index = 0; index < count/20; index++) {
                        setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])

            }}
            
    }
    },[paginate , count , search ])

    const clickHandler = (number) =>{
        setPaginate(number.target.id);
        setId(number.target.id);
    }
    const searchHandler = (event) =>{
        setSearch(event.target.value)
    }
    const productDeleteHandler =(slug) =>{
        axios.delete(`${MainLink}/api/v1/product/delete/${slug}/`,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }}).then(response => {if (response) {
                refreshPage();
        }})
    }
    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <Link to="/Add-Product">+ ?????????? ?????????? </Link>
                    <h3>?????????????? ???????? {paginate}</h3>
               </section>
               <section className={styles.searchTableHeader}>
                   <div className={styles.searchBox}>
                   <li style={{position: 'absolute' , padding: '10px' , minWidth: '40px' , listStyleType: 'none' , marginLeft: '10px' , cursor: 'pointer'}}><FaSearch /></li>
                    <input onChange={searchHandler} className={styles.searchInput} value={search} placeholder="?????????? ..." />
                   </div>
                   <div className={styles.textBox}>
                    <h3>?????????? ???? ??????????????</h3>
                   </div>
               </section>
               <table dir="rtl" className={styles.productsTable}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>?????? ??????????</th>
                        <th>???????? ????????</th>
                        <th>????????</th>
                        <th>?????????? ??????????</th>
                        <th>????????????</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(rows => <tr key={rows.id}> 
                        <td>{rows.id}</td>
                        <td>{rows.name}</td>
                        <td>{rows.categories.map(item => item.name + " / ")}</td>
                        <td>{rows.price}</td>
                        <td>{rows.quantity}</td>
                        <td>
                            <Link to={`/Edit-Product/${rows.categories.map(item => item.id)}/${rows.slug}`}><button className={styles.editButton}>????????????</button></Link>
                            <button onClick={() => productDeleteHandler(rows.slug)} className={styles.deleteButton}>??????</button>
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

export default AdminProduct
