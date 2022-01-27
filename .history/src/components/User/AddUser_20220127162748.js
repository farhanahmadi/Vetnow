import React,{useState , useRef} from 'react'
import styles from "../../styles/AddUser.module.css"
import { MainLink } from '../Link/MainLink'
import Sidebar from '../Sidebar'



const AddUser = () => {

    // const avatar = useRef(null);
    // set kardan data baraye ersal be database
    const [photo , setPhoto] = useState(null)
    const [data , setData] = useState({
            username: '',
            email: '',
            first_name : '',
            last_name : '',
            national_code : '',
            job : '',
            graduate : '',
            experience : '',
            is_admin: false,
            is_doctor: false,
            doctorDescreption : '',
            doctorId : '',
            state : '',
            city : '',
            address : '',
            plate : '',
            zip_code : '',
            full_name : '',
            phone_number : '',
    })
    // 
     // set state kardan input ha
     const inputsHandler = (event) => {
         if (event.target.name !== "avatar") {
            setData({...data , [event.target.name] : event.target.value})
         }else{
            setPhoto(event.target.files[0])
         }
         console.log(data);
        }
    // 
    const checkBoxHandler = (event) => {
        setData({...data , [event.target.name] : event.target.checked})
        console.log(data);
       }

    // ersal data be database
    const submitHandler = async (event) =>{
        event.preventDefault();
        const formD = new FormData()
        formD.append('username' , data.username)
        formD.append('email' , data.email)
        formD.append('first_name' , data.first_name)
        formD.append('last_name' , data.last_name)
        photo && formD.append('avatar' , photo , photo.name)
        formD.append('national_code' , data.national_code)
        formD.append('job' , data.job)
        formD.append('graduate' , data.graduate)
        formD.append('experience' , data.experience)
        formD.append('is_admin' , JSON.stringify(da))
        formD.append('is_doctor' ,JSON.stringify(true))
        formD.append('doctorDescreption' , data.doctorDescreption)
        formD.append('doctorId' , data.doctorId)
        formD.append('state' , data.state)
        formD.append('city' , data.city)
        formD.append('address' , data.address)
        formD.append('plate' , data.plate)
        formD.append('zip_code' , data.zip_code)
        formD.append('full_name' , data.full_name)
        formD.append('phone_number' , data.phone_number)
        fetch(`${MainLink}/api/v1/user/create/`,{
            method:"POST",
            body:formD
        }).then(res => console.log(res))
    }
    // 

    return (
        <div className={styles.container}>
             <form className={styles.main} onSubmit={submitHandler}>
                <section className={styles.header}>
                    <h3>ایجاد کاربر</h3>
                </section>
                <section className={styles.inputs} dir='rtl'>
                    <input type="text" value={data.username} placeholder="نام کاربری" name="username" onChange={inputsHandler} />
                    <input type="email" value={data.email} placeholder="ایمیل" name="email" onChange={inputsHandler} />
                    <input type="text" value={data.first_name} placeholder="نام" name="first_name" onChange={inputsHandler} />
                    <input type="text" value={data.last_name} placeholder="نام خانوادگی" name="last_name" onChange={inputsHandler} />
                    <input type="file" defaultValue={data.avatar} placeholder="عکس کاربر" name="avatar" onChange={inputsHandler} />
                    <input type="number" value={data.national_code} placeholder="کد ملی" name="national_code" onChange={inputsHandler} />
                    <input type="text" value={data.job} placeholder="شغل" name="job" onChange={inputsHandler} />
                    <input type="text" value={data.graduate} placeholder="رشته فارغ التحصیل" name="graduate" onChange={inputsHandler} />
                    <input type="text" value={data.experience} placeholder="تجربه کاری" name="experience" onChange={inputsHandler} />
                    <input type="text" value={data.doctorDescreption} placeholder="توضیحات کاربر دکتر" name="doctorDescreption" onChange={inputsHandler} />
                    <input type="number" value={data.doctorId} placeholder="شماره ای دی دکتر" name="doctorId" onChange={inputsHandler} />
                    <input type="text" value={data.state} placeholder="استان" name="state" onChange={inputsHandler} />
                    <input type="text" value={data.city} placeholder="شهر" name="city" onChange={inputsHandler} />
                    <input type="text" value={data.address} placeholder="آدرس" name="address" onChange={inputsHandler} />
                    <input type="number" value={data.plate} placeholder="پلاک" name="plate" onChange={inputsHandler} />
                    <input type="number" value={data.zip_code} placeholder="کد پستی" name="zip_code" onChange={inputsHandler} />
                    <input type="text" value={data.full_name} placeholder="نام کامل کاربر" name="full_name" onChange={inputsHandler} />
                    <input type="number" value={data.phone_number} placeholder="شماره همراه" name="phone_number" onChange={inputsHandler} />
                    <section className={styles.checkBox}>
                        <label htmlFor="is_admin" >کاربر ادمین</label>
                        <input id="is_admin" name="is_admin" type="checkbox" value={data.is_admin} onChange={checkBoxHandler} /> 
                        <label htmlFor="is_doctor" >کاربر ادمین</label>
                        <input id="is_doctor" name="is_doctor" type="checkbox" value={data.is_doctor} onChange={checkBoxHandler} /> 
                    </section>
                </section>
                <input type="submit" className={styles.submitBtn} />
            </form>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
        </div>
    )
}

export default AddUser
