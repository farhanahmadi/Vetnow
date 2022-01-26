import React,{useState , useEffect} from 'react'
import styles from "../styles/EditUser.module.css"
import Sidebar from '../Sidebar'
import axios
 from 'axios'
const EditUser = (props) => {
    // const avatar = useRef(null);
    // set kardan data baraye ersal be database
    const [photo , setPhoto] = useState(null)
    const [data , setData] = useState({
            username: null,
            email: null,
            first_name : null,
            last_name : null,
            national_code : null,
            job : null,
            graduate : null,
            experience : null,
            is_admin: false,
            is_doctor: false,
            doctorDescreption : null,
            doctorId : null,
            state : null,
            city : null,
            address : null,
            plate : null,
            zip_code : null,
            full_name : null,
            phone_number : null,
    })
    // 
    // gereftan api input ha baraye namayesh value gabli
    useEffect( async () =>  {
        const URL = `https://545e5c1b9c3616.lhr.life/api/v1/user/update/${props.match.params.id}/`
        const inputValue = await axios.get(URL);
        setData(await {...data , 
            username: inputValue.data.username,
            email: inputValue.data.email,
            first_name : inputValue.data.first_name,
            last_name : inputValue.data.last_name,
            national_code : inputValue.data.national_code,
            job : inputValue.data.job,
            graduate : inputValue.data.graduate,
            experience : inputValue.data.experience,
            is_admin: inputValue.data.is_admin,
            is_doctor: inputValue.data.is_doctor,
            doctorDescreption : inputValue.data.doctorDescreption,
            doctorId : inputValue.data.doctorId,
            state : inputValue.data.state,
            city : inputValue.data.city,
            address : inputValue.data.address,
            plate : inputValue.data.plate,
            zip_code : inputValue.data.zip_code,
            full_name : inputValue.data.full_name,
            phone_number : inputValue.data.phone_number,
        })
        setPhoto(await inputValue.data.avatar)
        await console.log(inputValue);
    }, [])
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
        formD.append('is_admin' , JSON.stringify(data.is_admin))
        formD.append('is_doctor' ,JSON.stringify(data.is_doctor))
        formD.append('doctorDescreption' , data.doctorDescreption)
        formD.append('doctorId' , data.doctorId)
        formD.append('state' , data.state)
        formD.append('city' , data.city)
        formD.append('address' , data.address)
        formD.append('plate' , data.plate)
        formD.append('zip_code' , data.zip_code)
        formD.append('full_name' , data.full_name)
        formD.append('phone_number' , data.phone_number)
        fetch(`https://545e5c1b9c3616.lhr.life/api/v1/user/update/${props.match.params.id}/`,{
            method:"PUT",
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
                        <input id="is_admin" name="is_admin" type="checkbox" checked={data.is_admin} value={data.is_admin} onChange={checkBoxHandler} /> 
                        <label htmlFor="is_doctor" >کاربر ادمین</label>
                        <input id="is_doctor" name="is_doctor" type="checkbox" checked={data.is_doctor} value={data.is_doctor} onChange={checkBoxHandler} /> 
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

export default EditUser
