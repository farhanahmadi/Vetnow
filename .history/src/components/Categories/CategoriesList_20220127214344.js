import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/CategoriesList.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'

const CategoriesList = () => {
    const [data , setData] = useState([])
    const [paginateBtn , setPaginateBtn] = useState([])
    const [count , setCount] = useState()
    const [paginate , setPaginate] = useState(1);
    const [id , setId] = useState(1);
    let URL = `${}/api/v1/pagination/categories/?page=${paginate}`;


    useEffect( async () => {
        await axios.get(URL).then(res => setData(res.data.results))
        await axios.get(URL).then(res => setCount(res.data.count))

        for (let index = 0; index < count/2; index++) {
           paginateBtn.length < count/2 && setPaginateBtn((prevstate) => [...prevstate , index])   
        }
        console.log(data);

}, [paginate , count ])

const clickHandler = (number) =>{
    setPaginate(number.target.id);
    setId(number.target.id);
    console.log(id);
}

const deleteHandler = (slug) =>{
    axios.delete(`${}/api/v1/category/delete/${slug}/`)
}
    return (
        <div className={styles.container}>
            <section className={styles.main}>
               <section className={styles.tableHeader}>
                    <Link to="/Add-category">+ ایجاد دسته بندی </Link>
                    <h3>دسته بندی ها صفحه {paginate}</h3>
               </section>
               <table dir="rtl">
                    <tr>
                        <th>ID</th>
                        <th> دسته بندی</th>
                        <th> زیر شاخه</th>
                        <th>عملیات</th>
                    </tr>
                    {data.map(rows => rows.parent.length > 0 ?
                    rows.parent.map(item =>
                    <tr key={item.id}> 
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{rows.name}</td>
                        <td>
                        <Link to={`Edit-Category/${item.slug}`}> ویرایش دسته بندی</Link>
                        <button onClick={() => deleteHandler(item.slug)}>حذف دسته بندی</button>
                        </td>
                    </tr>
                 )
                 :
                 data.map(item =>
                    <tr key={item.id}> 
                        <td>{item.name}</td>
                        <td>{item.id}</td>
                        <td>
                        {/* <Link to={`/Edit-Product/${rows.categories.map(item => item.id)}/${rows.slug}`}>ویرایش</Link> */}
                        {/* <button onClick={deleteHandler(rows.slug)}>حذف دسته بندی</button> */}
                        </td>
                    </tr>

                    ))}
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
