import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../styles/AddCategory.module.css";
import { MainLink } from "../Link/MainLink";
import Sidebar from "../Sidebar";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
  const [data, setData] = useState({
    parent: "",
    subcategoryName: "",
  });
  const [category, setCategory] = useState([]);

  useEffect(async () => {
    await axios
      .get(`${MainLink}/api/v1/categories/`)
      .then((res) => setCategory(res.data));
  }, []);
  const categoryHandler = (e) => {
    setData({ ...data, parent: e.target.value });
    console.log(data);
  };
  const inputHandler = (event) => {
    setData({ ...data, subcategoryName: event.target.value });
  };
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(`${MainLink}/api/v1/category/create/`, {
        parent: data.parent,
        name: data.subcategoryName,
      },{ headers:{
        'Authorization': 'Token '+ localStorage.getItem('token'), 
    }})
      .then((res) => {
        if (res) {
          toast.success("دسته بندی با موفقیت ساخته شد")
          setTimeout(() => {
              history.push(`/Categories-List`)
          },5000)
        }
      }).catch((error) => {
        if(error.response){
        toast.error("موارد وارد شده صحیح نمیباشد")
        }
    });
  };
  return (
    <div className={styles.container}>
      <form className={styles.main} onSubmit={submitHandler}>
        <section className={styles.header}>
          <h3>ایجاد دسته بندی</h3>
        </section>
        <br />
        <section className={styles.inputs} dir="rtl">
          <select onChange={(e) => categoryHandler(e)}>
            <option selected value="">
              انتخاب دسته بندی{" "}
            </option>
            {category.map((item) => (
              <option
                name="category"
                key={item.id}
                defaultValue="null"
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={data.subcategoryName}
            placeholder="نام زیرشاخه را وارد کنید"
            name="subcategoryName"
            onChange={inputHandler}
          />
        </section>
        <br />
        <input
          className={styles.submitBtn}
          type="submit"
          value="ثبت دسته بندی "
        />
      </form>
      <section className={styles.sidebar}>
        <Sidebar />
      </section>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
