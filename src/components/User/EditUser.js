import React,{useState , useEffect , useRef} from 'react'
import styles from "../../styles/EditUser.module.css"
import Sidebar from '../Sidebar'
import axios from 'axios'
import { MainLink } from '../Link/MainLink'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const EditUser = (props) => {


    const [photo , setPhoto] = useState(null)
    const [photo1 , setPhoto1] = useState(null)
    const [photo2 , setPhoto2] = useState(null)
    const firstFileUpload = useRef(null);
    const secoundFileUpload = useRef(null);
    const thridFileUpload = useRef(null);
    // const avatar = useRef(null);
    // set kardan data baraye ersal be database
    const [avatar , setAvatar] = useState(null)
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
            firstImg: null ,
            secoundImg: null,
            thirdImg: null,
    })
    // 
    // gereftan api input ha baraye namayesh value gabli
    useEffect( async () =>  {
        const URL = `${MainLink}/api/v1/user/update/${props.match.params.id}/`
        const inputValue = await axios.get(URL , {
            headers:{
              'Authorization': 'Token '+ localStorage.getItem('token'), 
          },
          });
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
            firstImg : inputValue.data.national_code_image,
            secoundImg : inputValue.data.Incubation_license,
            thirdImg : inputValue.data.other,
            
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
            avatar(event.target.files[0])
         }
         console.log(data);
        }
    // 
    const checkBoxHandler = (event) => {
        setData({...data , [event.target.name] : event.target.checked})
        console.log(data);
       }


        // set kardan img ha dar state ha 
    const fileuploadHandler = async (event) =>{
        if(event.target.name === "firstImg"){
            setData({...data , firstImg: URL.createObjectURL(event.target.files[0])})
            setPhoto(event.target.files[0])
        }else if(event.target.name === "secoundImg"){
            setData({...data ,secoundImg: URL.createObjectURL(event.target.files[0])})
            setPhoto1(event.target.files[0])
        }else if(event.target.name === "thirdImg"){
            setData({...data ,thirdImg: URL.createObjectURL(event.target.files[0])})
            setPhoto2(event.target.files[0])
        }
    }
    // 
   
    // baraye inke input hide shode az tarig div karkone
        const firstHandleUpload = () => {
        firstFileUpload.current.click();
        };
        const secoundHandleUpload = () => {
        secoundFileUpload.current.click();
        };
        const thirdHandleUpload = () => {
        thridFileUpload.current.click();
        };
    // 
    // in baxsh baraye btn hazf mibashad ke aks preview pakshode va div nemayesh dade shavad
    const clickHandler = (event) =>{
        if(event.target.id === "firstImgBtn"){
        setData({...data , firstImg: null})
        }else if(event.target.id === "secoundImgBtn"){
        setData({...data , secoundImg: null})
        }else if(event.target.id === "thirdImgBtn"){
        setData({...data , thirdImg: null})
        }
    }
    // 


    // ersal data be database
    const history = useHistory();
    const submitHandler = async (event) =>{
        event.preventDefault();
        const formD = new FormData()
        data.firstImg  && photo && formD.append('national_code_image' , photo , photo.name)
        data.secoundImg  && photo1 && formD.append('Incubation_license' , photo1 , photo1.name)
        data.thirdImg  && photo2 && formD.append('other' , photo2 , photo2.name)
        formD.append('username' , data.username)
        formD.append('email' , data.email)
        formD.append('first_name' , data.first_name)
        formD.append('last_name' , data.last_name)
        avatar && formD.append('avatar' , avatar , avatar.name)
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
        fetch(`${MainLink}/api/v1/user/update/${props.match.params.id}/`,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            },
            method:"PUT",
            body:formD
        }).then(res =>{
            if(res.status !== 401 & res.status !== 400 ){
                res.json().then(json => {
                    toast.success("کاربر با موفقیت ویرایش شد")
                    setTimeout(() => {
                        history.push(`/Users`)
                    },5000)
                  });
            }else{
                toast.error("موارد وارد شده صحیح نمیباشد")
            }
      })
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
                        <label htmlFor="is_doctor" >کاربر دکتر</label>
                        <input id="is_doctor" name="is_doctor" type="checkbox" checked={data.is_doctor} value={data.is_doctor} onChange={checkBoxHandler} /> 
                    </section>
                </section>
                <section className={styles.productsImg}>
                    <h5>: عکس محصول</h5>
                   
                <div className={styles.imageContainer} dir="rtl">
                    {data.firstImg ?/* <button onClick={fileuploadclickHandler}>upload</button> */ 
                        <div className={styles.firstImg}>
                            <img
                            src={data.firstImg}
                            alt="Thumb"
                            />
                            <button id="firstImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div>
                        :
                        <div className={styles.imgBox}>
                            <input style={{display:"none"}} name="firstImg" onChange={fileuploadHandler} type="file" 
                            ref={firstFileUpload} />
                            <section onClick={() => firstHandleUpload()} className={styles.divImg}>
                                <p>عکس کارت ملی</p>
                            </section>
                        </div>
                    }
                    {data.secoundImg ?/* <button onClick={fileuploadclickHandler}>upload</button> */ 
                        <div className={styles.secoundImg}>
                           
                        <img
                            src={data.secoundImg}
                            alt="Thumb"
                            />
                            <button id="secoundImgBtn" onClick={clickHandler}>حدف عکس</button>
                            
                        </div>
                        :
                        <div className={styles.imgBox}>
                        <input style={{display:"none"}} name="secoundImg" onChange={fileuploadHandler} type="file" 
                        ref={secoundFileUpload} />
                        <section onClick={() => secoundHandleUpload()} className={styles.divImg}>
                            <p>عکس مجوز جوجه ریزی</p>
                        </section>
                        </div>
                    }
                    {data.thirdImg ?/* <button onClick={fileuploadclickHandler}>upload</button> */ 
                        <div className={styles.thirdImg}>
                            <img
                            src={data.thirdImg}
                            alt="Thumb"
                            />
                            <button id="thirdImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div>
                        :
                        <div className={styles.imgBox}>
                        <input style={{display:"none"}} name="thirdImg" onChange={fileuploadHandler} type="file" 
                        ref={thridFileUpload} />
                        <section onClick={() => thirdHandleUpload()} className={styles.divImg}>
                            <p>سایر</p>
                        </section>
                        </div>
                    }

                    
                </div>
                </section>
                <section style={{textAlign: 'center' , marginTop: '10px'}}>
                 <input type="submit" value="ثبت تغییرات" className={styles.submitBtn} />
                </section>
            </form>
            <section className={styles.sidebar}>
             <Sidebar  />
            </section>
            <ToastContainer />
        </div>
    )
}

export default EditUser
