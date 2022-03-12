import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/NewsList.module.css'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'
import { MainLink } from '../Link/MainLink'
import { FaSearch  } from 'react-icons/fa';


const NewsList = () => {
  const [data , setData] = useState([])
  const [paginateBtn , setPaginateBtn] = useState([])
  const [count , setCount] = useState()
  const [paginate , setPaginate] = useState(1);
  const [id , setId] = useState(1);
  const [reload , setReload] = useState('');
  const [serach , setSearch] = useState("");
  const [extraPaginateBtn , setExtraPaginateBtn] = useState(false)
  
  let URL = `${MainLink}/api/v1/news/?page=${paginate}&search=${serach}`;


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

      

  const deleteHandler = (event) =>{
    setReload(false)
    axios.delete(`${MainLink}/api/v1/news/delete/${event}/`,{
      headers:{
        'Authorization': 'Token '+ localStorage.getItem('key'),  
    },
    })
    setReload(event)
  }

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
                  <Link to="/Add-News">+ ایجاد خبر </Link>
                  <h3>اخبار صفحه {paginate}</h3>
             </section>
             <section className={styles.searchTableHeader}>
                   <div className={styles.searchBox}>
                   <li style={{position: 'absolute' , padding: '10px' , minWidth: '40px' , listStyleType: 'none' , marginLeft: '10px' , cursor: 'pointer'}}><FaSearch /></li>
                    <input onChange={searchHandler} className={styles.searchInput} value={serach} placeholder="جستجو ...." />
                   </div>
                   <div className={styles.textBox}>
                    <h3>جستجو در اخبار</h3>
                   </div>
               </section>
             <table dir="rtl" className={styles.newsTable}>
                <thead>
                  <tr>
                      <th>ID</th>
                      <th>نویسنده</th>
                      <th>تیتر اخبار</th>
                      <th>تاریخ</th>
                      <th>عملیات</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.map(rows => <tr key={rows.id}> 
                      <td>{rows.id}</td>
                      <td>{rows.author.username}</td>
                      <td>{rows.title}</td>
                      <td>{rows.created_at}</td>
                      <td>
                        <button className={styles.editButton}><Link to={`/Edit-News/${rows.slug}`}>ویرایش</Link></button>
                        <button className={styles.deleteButton} onClick={() => deleteHandler(rows.slug)}>حذف</button>
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
export default NewsList;
