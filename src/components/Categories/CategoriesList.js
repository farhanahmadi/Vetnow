import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/CategoriesList.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import { MainLink } from '../Link/MainLink'
import { FaSearch  } from 'react-icons/fa';


const CategoriesList = () => {
    const [data , setData] = useState([])
    const [paginateBtn , setPaginateBtn] = useState([])
    const [count , setCount] = useState()
    const [paginate , setPaginate] = useState(1);
    const [id , setId] = useState(1);
    const [extraPaginateBtn , setExtraPaginateBtn] = useState(false)
    const [search , setSearch] = useState("");

    
    let URL = `${MainLink}/api/v1/pagination/categories/?page=${paginate}&search=${search}`;
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
                for (let index = 0; index < count/2; index++) {
                    paginateBtn.length < count/2 && setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])
            }}else{
                if (count === 1) {
                    setPaginateBtn([0])
                }
                else{
                    !extraPaginateBtn && setPaginateBtn([])
                    paginateBtn.length == 0 && setExtraPaginateBtn(true)
                    for (let index = 0; index < count/2; index++) {
                        setPaginateBtn((prevstate) => [...new Set([...prevstate , index])])
                    console.log(count);

            }}
            
    }
    },[paginate , count , search ])

    const clickHandler = (number) =>{
        setPaginate(number.target.id);
        setId(number.target.id);
        console.log(id);
    }
    const searchHandler = (event) =>{
        setSearch(event.target.value)
    }

    const deleteHandler = (slug) =>{
        axios.delete(`${MainLink}/api/v1/category/delete/${slug}/`,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            }})
    }
    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <Link to="/Add-category">+ ایجاد دسته بندی </Link>
                    <h3>دسته بندی ها صفحه {paginate}</h3>
               </section>
               <section className={styles.searchTableHeader}>
                   <div className={styles.searchBox}>
                   <li style={{position: 'absolute' , padding: '10px' , minWidth: '40px' , listStyleType: 'none' , marginLeft: '10px' , cursor: 'pointer'}}><FaSearch /></li>
                    <input onChange={searchHandler} className={styles.searchInput} value={search} placeholder="جستجو ..." />
                   </div>
                   <div className={styles.textBox}>
                    <h3>جستجو در دسته بندی ها</h3>
                   </div>
               </section>
               <table dir="rtl" className={styles.CategoriesListTable}>
                   <thead>
                    <tr>
                        <th>ID</th>
                        <th> دسته بندی</th>
                        <th> زیر شاخه</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                   {data.map(item => 
                     <tr key={item.id}> 
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.name}</td>
                        <td>
                        <button className={styles.editButton}><Link to={`Edit-Category/${item.slug}`}> ویرایش دسته بندی</Link></button>
                        <button className={styles.deleteButton} onClick={() => deleteHandler(item.slug)}>حذف دسته بندی</button>
                        </td>
                     </tr>
                    )}
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

export default CategoriesList
