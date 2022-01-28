import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/NewsList.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import { MainLink } from '../Link/MainLink'

const NewsList = () => {
  const [data , setData] = useState([])
  const [paginateBtn , setPaginateBtn] = useState([])
  const [count , setCount] = useState()
  const [paginate , setPaginate] = useState(1);
  const [id , setId] = useState(1);
  let URL = `${MainLink}/api/v1/news/?page=${paginate}`;


  useEffect( async () => {
      await axios.get(URL).then(res => setData(res.data.results))
      await axios.get(URL).then(res => setCount(res.data.count))

      for (let index = 0; index < count/2; index++) {
         paginateBtn.length < count/2 && setPaginateBtn((prevstate) => [...prevstate , index])   
      }

      

}, [paginate , count ])

const clickHandler = (number) =>{
  setPaginate(number.target.id);
  setId(number.target.id);
  console.log(id);
}
  return (
      <div className={styles.container}>
          <section className={styles.main}>
             <section className={styles.tableHeader}>
                  <Link to="/Add-Product">+ ایجاد محصول </Link>
                  <h3>محصولات صفحه {paginate}</h3>
             </section>
             <table dir="rtl">
                  <tr>
                      <th>ID</th>
                      <th>نویسنده</th>
                      <th>تیتر اخبار</th>
                      <th>تاریخ</th>
                      <th>عملیات</th>
                  </tr>
                  {data.map(rows => <tr key={rows.id}> 
                      <td>{rows.id}</td>
                      <td>{rows.author.username}</td>
                      <td>{rows.title}</td>
                      <td>{rows.created_at}</td>
                      <td>
                        <Link to={`/Edit-Product/${rows.categories.map(item => item.id)}/${rows.slug}`}>ویرایش</Link>
                        <button></button>
                        </td>
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
export default NewsList;
