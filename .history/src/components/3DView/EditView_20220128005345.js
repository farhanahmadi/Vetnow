import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar";
import styles from "../../styles/EditView.module.css";
import axios from "axios";
import { MainLink } from "../Link/MainLink";

const EditView = (props) => {
  const FileUpload = useRef(null);
  const FileUpload2 = useRef(null);
  const FileUpload3 = useRef(null);
  const FileUpload4 = useRef(null);
  const FileUpload5 = useRef(null);
  const FileUpload6 = useRef(null);
  const FileUpload7 = useRef(null);
  const FileUpload8 = useRef(null);
  const FileUpload9 = useRef(null);
  const FileUpload10 = useRef(null);
  const FileUpload11 = useRef(null);
  const FileUpload12 = useRef(null);
  const FileUpload13 = useRef(null);
  const FileUpload14 = useRef(null);
  const FileUpload15 = useRef(null);
  const FileUpload16 = useRef(null);
  const FileUpload17 = useRef(null);
  const FileUpload18 = useRef(null);
  const FileUpload19 = useRef(null);
  const FileUpload20 = useRef(null);
  const FileUpload21 = useRef(null);
  const FileUpload22 = useRef(null);
  const FileUpload23 = useRef(null);
  const FileUpload24 = useRef(null);
  const FileUpload25 = useRef(null);
  const FileUpload26 = useRef(null);
  const FileUpload27 = useRef(null);
  const FileUpload28 = useRef(null);
  const FileUpload29 = useRef(null);
  const FileUpload30 = useRef(null);
  // set kardan data baraye ersal be database
  const [data, setData] = useState({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
    photo6: null,
    photo7: null,
    photo8: null,
    photo9: null,
    photo10: null,
    photo11: null,
    photo12: null,
    photo13: null,
    photo14: null,
    photo15: null,
    photo16: null,
    photo17: null,
    photo18: null,
    photo19: null,
    photo20: null,
    photo21: null,
    photo22: null,
    photo23: null,
    photo24: null,
    photo25: null,
    photo26: null,
    photo27: null,
    photo28: null,
    photo29: null,
    photo30: null,
  });
  //
  // set kardan aks ha baraye ersal be database
  const [photo, setPhoto] = useState({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
    photo6: null,
    photo7: null,
    photo8: null,
    photo9: null,
    photo10: null,
    photo11: null,
    photo12: null,
    photo13: null,
    photo14: null,
    photo15: null,
    photo16: null,
    photo17: null,
    photo18: null,
    photo19: null,
    photo20: null,
    photo21: null,
    photo22: null,
    photo23: null,
    photo24: null,
    photo25: null,
    photo26: null,
    photo27: null,
    photo28: null,
    photo29: null,
    photo30: null,
  });
  // set kardan img ha dar state ha
  const fileuploadHandler = async (event) => {
    setData({
      ...data,
      [event.target.name]: URL.createObjectURL(event.target.files[0]),
    });
    setPhoto({ ...photo, [event.target.name]: event.target.files[0] });
  };
  //

  useEffect(async () => {
    const getImg = await axios
      .get(
        `${MainLink}/api/v1/threed/update/${props.match.params.slug}`
      )
      .then((res) =>
        setData({
          ...data,
          photo1: res.data.image1,
          photo2: res.data.image2,
          photo3: res.data.image3,
          photo4: res.data.image4,
          photo5: res.data.image5,
          photo6: res.data.image6,
          photo7: res.data.image7,
          photo8: res.data.image8,
          photo9: res.data.image9,
          photo10: res.data.image10,
          photo11: res.data.image11,
          photo12: res.data.image12,
          photo13: res.data.image13,
          photo14: res.data.image14,
          photo15: res.data.image15,
          photo16: res.data.image16,
          photo17: res.data.image17,
          photo18: res.data.image18,
          photo19: res.data.image19,
          photo20: res.data.image20,
          photo21: res.data.image21,
          photo22: res.data.image22,
          photo23: res.data.image23,
          photo24: res.data.image24,
          photo25: res.data.image25,
          photo26: res.data.image26,
          photo27: res.data.image27,
          photo28: res.data.image28,
          photo29: res.data.image29,
          photo30: res.data.image30,
        })
      );
  }, []);

  // baraye inke input hide shode az tarig div karkone
  const uploadHandler = (ref) => {
    console.log(ref);
    ref.current.click();
  };
  //
  // in baxsh baraye btn hazf mibashad ke aks preview pakshode va div nemayesh dade shavad
  const clickHandler = (event) => {
    setData({ ...data, [event.target.id]: null });
  };

  //
  // ersal data be database
  const submitHandler = async (event) => {
    event.preventDefault();
    const formD = new FormData();
    formD.append("product", props.match.params.id);
    data.photo1 && photo.photo1
      &&  formD.append("image1", photo.photo1, photo.photo1.name)
    
    data.photo2 && photo.photo2
      &&  formD.append("image2", photo.photo2, photo.photo2.name)
  
    data.photo3 && photo.photo3
      &&  formD.append("image3", photo.photo3, photo.photo3.name)
    
    data.photo4 && photo.photo4
      &&  formD.append("image4", photo.photo4, photo.photo4.name)
    
    data.photo5 && photo.photo5
      &&  formD.append("image5", photo.photo5, photo.photo5.name)
    
    data.photo6 && photo.photo6
      &&  formD.append("image6", photo.photo6, photo.photo6.name)
    
    data.photo7 && photo.photo7
      &&  formD.append("image7", photo.photo7, photo.photo7.name)
    
    data.photo8 && photo.photo8
      &&  formD.append("image8", photo.photo8, photo.photo8.name)
    
    data.photo9 && photo.photo9
      &&  formD.append("image9", photo.photo9, photo.photo9.name)
    
    data.photo10 && photo.photo10
      && formD.append("image10", photo.photo10, photo.photo10.name)
      
    data.photo11 && photo.photo11
      && formD.append("image11", photo.photo11, photo.photo11.name)
      
    data.photo12 && photo.photo12
      && formD.append("image12", photo.photo12, photo.photo12.name)
      
    data.photo13 && photo.photo13
      && formD.append("image13", photo.photo13, photo.photo13.name)
      
    data.photo14 && photo.photo14
      && formD.append("image14", photo.photo14, photo.photo14.name)
      
    data.photo15 && photo.photo15
      && formD.append("image15", photo.photo15, photo.photo15.name)
      
    data.photo16 && photo.photo16
      && formD.append("image16", photo.photo16, photo.photo16.name)
      
    data.photo17 && photo.photo17
      && formD.append("image17", photo.photo17, photo.photo17.name)
      
    data.photo18 && photo.photo18
      && formD.append("image18", photo.photo18, photo.photo18.name)
      
    data.photo19 && photo.photo19
      && formD.append("image19", photo.photo19, photo.photo19.name)
      
    data.photo20 && photo.photo20
      && formD.append("image20", photo.photo20, photo.photo20.name)
      
    data.photo21 && photo.photo21
      && formD.append("image21", photo.photo21, photo.photo21.name)
      
    data.photo22 && photo.photo22
      && formD.append("image22", photo.photo22, photo.photo22.name)
      
    data.photo23 && photo.photo23
      && formD.append("image23", photo.photo23, photo.photo23.name)
      
    data.photo24 && photo.photo24
      && formD.append("image24", photo.photo24, photo.photo24.name)
      
    data.photo25 && photo.photo25
      && formD.append("image25", photo.photo25, photo.photo25.name)
      
    data.photo26 && photo.photo26
      && formD.append("image26", photo.photo26, photo.photo26.name)
      
    data.photo27 && photo.photo27
      && formD.append("image27", photo.photo27, photo.photo27.name)
      
    data.photo28 && photo.photo28
      && formD.append("image28", photo.photo28, photo.photo28.name)
      
    data.photo29 && photo.photo29
      && formD.append("image29", photo.photo29, photo.photo29.name)
      
    data.photo30 && photo.photo30
      && formD.append("image30", photo.photo30, photo.photo30.name)
      
    fetch(
      `${MainLink}/api/v1/threed/update/${props.match.params.slug}/`,
      {
        method: "put",
        body: formD,
      }
    ).then((res) => console.log(res));
  };
  //
  return (
    <div className={styles.container}>
      <form className={styles.main} onSubmit={submitHandler}>
        <div className={styles.imageContainer} dir="rtl">
          {data.photo1 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo1} alt="Thumb" />
              <button id="photo1" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo1"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload}
              />
              <section
                onClick={() => uploadHandler(FileUpload)}
                className={styles.divImg}
              >
                <p> 1 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo2 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo2} alt="Thumb" />
              <button id="photo2" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo2"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload2}
              />
              <section
                onClick={() => uploadHandler(FileUpload2)}
                className={styles.divImg}
              >
                <p> 2 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo3 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo3} alt="Thumb" />
              <button id="photo3" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo3"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload3}
              />
              <section
                onClick={() => uploadHandler(FileUpload3)}
                className={styles.divImg}
              >
                <p> 3 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo4 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo4} alt="Thumb" />
              <button id="photo4" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo4"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload4}
              />
              <section
                onClick={() => uploadHandler(FileUpload4)}
                className={styles.divImg}
              >
                <p> 4 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo5 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo5} alt="Thumb" />
              <button id="photo5" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo5"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload5}
              />
              <section
                onClick={() => uploadHandler(FileUpload5)}
                className={styles.divImg}
              >
                <p> 5 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo6 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo6} alt="Thumb" />
              <button id="photo6" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo6"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload6}
              />
              <section
                onClick={() => uploadHandler(FileUpload6)}
                className={styles.divImg}
              >
                <p> 6 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo7 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo7} alt="Thumb" />
              <button id="photo7" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo7"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload7}
              />
              <section
                onClick={() => uploadHandler(FileUpload7)}
                className={styles.divImg}
              >
                <p> 7 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo8 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo8} alt="Thumb" />
              <button id="photo8" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo8"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload8}
              />
              <section
                onClick={() => uploadHandler(FileUpload8)}
                className={styles.divImg}
              >
                <p> 8 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo9 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo9} alt="Thumb" />
              <button id="photo9" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo9"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload9}
              />
              <section
                onClick={() => uploadHandler(FileUpload9)}
                className={styles.divImg}
              >
                <p> 9 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo10 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo10} alt="Thumb" />
              <button id="photo10" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo10"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload10}
              />
              <section
                onClick={() => uploadHandler(FileUpload10)}
                className={styles.divImg}
              >
                <p> 10 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo11 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo11} alt="Thumb" />
              <button id="photo11" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo11"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload11}
              />
              <section
                onClick={() => uploadHandler(FileUpload11)}
                className={styles.divImg}
              >
                <p> 11 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo12 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo12} alt="Thumb" />
              <button id="photo12" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo12"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload12}
              />
              <section
                onClick={() => uploadHandler(FileUpload12)}
                className={styles.divImg}
              >
                <p> 12 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo13 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo13} alt="Thumb" />
              <button id="photo13" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo13"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload13}
              />
              <section
                onClick={() => uploadHandler(FileUpload13)}
                className={styles.divImg}
              >
                <p> 13 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo14 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo14} alt="Thumb" />
              <button id="photo14" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo14"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload14}
              />
              <section
                onClick={() => uploadHandler(FileUpload14)}
                className={styles.divImg}
              >
                <p> 14 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo15 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo15} alt="Thumb" />
              <button id="photo15" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo15"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload15}
              />
              <section
                onClick={() => uploadHandler(FileUpload15)}
                className={styles.divImg}
              >
                <p> 15 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo16 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo16} alt="Thumb" />
              <button id="photo16" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo16"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload16}
              />
              <section
                onClick={() => uploadHandler(FileUpload16)}
                className={styles.divImg}
              >
                <p> 16 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo17 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo17} alt="Thumb" />
              <button id="photo17" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo17"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload17}
              />
              <section
                onClick={() => uploadHandler(FileUpload17)}
                className={styles.divImg}
              >
                <p> 17 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo18 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo18} alt="Thumb" />
              <button id="photo18" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo18"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload18}
              />
              <section
                onClick={() => uploadHandler(FileUpload18)}
                className={styles.divImg}
              >
                <p> 18 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo19 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo19} alt="Thumb" />
              <button id="photo19" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo19"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload19}
              />
              <section
                onClick={() => uploadHandler(FileUpload19)}
                className={styles.divImg}
              >
                <p> 19 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo20 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo20} alt="Thumb" />
              <button id="photo20" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo20"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload20}
              />
              <section
                onClick={() => uploadHandler(FileUpload20)}
                className={styles.divImg}
              >
                <p> 20 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo21 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo21} alt="Thumb" />
              <button id="photo21" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo21"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload21}
              />
              <section
                onClick={() => uploadHandler(FileUpload21)}
                className={styles.divImg}
              >
                <p> 21 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo22 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo22} alt="Thumb" />
              <button id="photo22" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo22"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload22}
              />
              <section
                onClick={() => uploadHandler(FileUpload22)}
                className={styles.divImg}
              >
                <p> 22 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo23 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo23} alt="Thumb" />
              <button id="photo23" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo23"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload23}
              />
              <section
                onClick={() => uploadHandler(FileUpload23)}
                className={styles.divImg}
              >
                <p> 23 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo24 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo24} alt="Thumb" />
              <button id="photo24" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo24"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload24}
              />
              <section
                onClick={() => uploadHandler(FileUpload24)}
                className={styles.divImg}
              >
                <p> 24 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo25 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo25} alt="Thumb" />
              <button id="photo25" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo25"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload25}
              />
              <section
                onClick={() => uploadHandler(FileUpload25)}
                className={styles.divImg}
              >
                <p> 25 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo26 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo26} alt="Thumb" />
              <button id="photo26" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo26"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload26}
              />
              <section
                onClick={() => uploadHandler(FileUpload26)}
                className={styles.divImg}
              >
                <p> 26 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo27 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo27} alt="Thumb" />
              <button id="photo27" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo27"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload27}
              />
              <section
                onClick={() => uploadHandler(FileUpload27)}
                className={styles.divImg}
              >
                <p> 27 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo28 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo28} alt="Thumb" />
              <button id="photo28" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo28"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload28}
              />
              <section
                onClick={() => uploadHandler(FileUpload28)}
                className={styles.divImg}
              >
                <p> 28 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo29 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo29} alt="Thumb" />
              <button id="photo29" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo29"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload29}
              />
              <section
                onClick={() => uploadHandler(FileUpload29)}
                className={styles.divImg}
              >
                <p> 29 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
          {data.photo30 /* <button onClick={fileuploadclickHandler}>upload</button> */ ? (
            <div className={styles.photoBox}>
              <img src={data.photo30} alt="Thumb" />
              <button id="photo30" onClick={clickHandler}>
                حدف عکس
              </button>
            </div>
          ) : (
            <div className={styles.imgBox}>
              <input
                style={{ display: "none" }}
                name="photo30"
                onChange={fileuploadHandler}
                type="file"
                ref={FileUpload30}
              />
              <section
                onClick={() => uploadHandler(FileUpload30)}
                className={styles.divImg}
              >
                <p> 30 کلیک برای آپلود عکس</p>
              </section>
            </div>
          )}
        </div>
        <input className={styles.submitBtn} type="submit" value="ثبت محصول " />
      </form>
      <section className={styles.sidebar}>
        <Sidebar />
      </section>
    </div>
  );
};

export default EditView;
