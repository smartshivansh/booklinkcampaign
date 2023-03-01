import React, {useState} from "react";

import classes from "./WaitListScreen.module.css"

import image from "../../assets/website.svg"
import xicon from "../../assets/XCircle.svg"
import loader from "../../assets/CircleNotch.svg"
import checkCircle from "../../assets/CheckCircle.svg"

export default function WaitListScreen(){

    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState("");
    const [mobileError, setMobileError] = useState("We will contact you with further information.");
    const [modalDisplay, setModalDisplay] = useState("flex")

    const [submitWidth, setSubmitWidth] = useState(null);
    const [inputWidth, setInputWidth] = useState(null);
    const [inputBorder, setInputBorder] = useState(null);
    const [sucessMsg, setSucessMsg] = useState("Submit");
    const [errorColor, setErrorColor] = useState("white")
    const [checkDisplay, setCheckDisplay] = useState("none")

    const focusHandler = ()=> {
        setErrorColor(p=>"white")
        setMobileError(p=>"We will contact you with further information.")
    }


    function formSubmitHandler(e){
        e.preventDefault();

        setLoading(p => true);

        if(mobile.length != 10){
            setMobileError(p => "Please enter a valid mobile No");
            setErrorColor(p => "red")
            setLoading(false)
            return;
        }

        try {fetch("http://localhost:8080/waitlist", {
            method: "POST",
            body: JSON.stringify({mobile}),
            headers: {
                "content-type": "application/json",
            }
        }).then(res => res.json())
        .then(res => {
            if(res.sucess){
                console.log("saved")
                setMobile(p => "")
                setLoading(p => false);
                setInputWidth(p => 0);
                setSubmitWidth(p => "16rem")
                setTimeout(()=>{
                    setErrorColor(p => "black")
                    setInputBorder(p => "none")
                },500)
                setTimeout(()=>{
                    setSucessMsg(p => "You have been added to the waitlist")
                    setMobileError(p => "We will contact you with further information.")
                    setCheckDisplay(p => "block")
                },600)
                
            }
            else{
                console.log("error")
                setLoading(false)
            }
        })
    }
    catch(error){
        console.log(error)
    }
    }

    return <div className={classes.container} style={{display: modalDisplay}}>

        <div className={classes.subContainer}>
          
          <div className={classes.formContainer}>

            <p className={classes.heading}>Owning a website <br />has never been easy</p>
            <p className={classes.heading}>Join the waitlist today.</p>

            <form className={classes.form} onSubmit={formSubmitHandler}>
                <input type='tel' value={mobile} className={classes.input} style={{width:inputWidth, transition: "all 0.5s", padding:`${inputWidth == 0 ? 0 : "1rem"}`, border: inputBorder}} onFocus={focusHandler} onChange={(e)=> {setMobile(p => e.target.value)}} />
                
                <button type='submit' className={classes.submit} style={{width:submitWidth, transition: "all 0.5s"}} > {
                    loading ? <img src={loader} alt="loading..." className={classes.loader} /> : <span className={classes.checkCont}><img src={checkCircle} style={{display: checkDisplay}} className={classes.check} />{sucessMsg}</span>
                } </button>
            </form>
            <p className={classes.error} style={{color: errorColor}}>{mobileError}</p>
        
          </div>

          <div>
            <img src={image} alt="image" className={classes.image} />
          </div>

          <img src={xicon} alt="cancel" className={classes.xicon} onClick={()=> {setModalDisplay("none")}} />
        </div>
        
    </div>
}