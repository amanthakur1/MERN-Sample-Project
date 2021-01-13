import  React     , {useRef, useState} from 'react'
import  M                              from 'materialize-css'  ;
import {useHistory}                    from 'react-router-dom';

const SubmitForm = () => {

    const history  = useHistory(  )
    const nameRef  = useRef    ("");
    const emailRef = useRef    ("");
    const phoneRef = useRef    ("");
    const dobRef   = useRef    ("");
    


    const submitForm = ()=>{

    let [name,email,phone,dob] = [
      nameRef .current.value,
      emailRef.current.value,
      phoneRef.current.value,
      dobRef  .current.value
    ]

    

    name = name.replace(/^\s+|\s+$/g, '');

    const userdob = new Date(dob);
    const date= new Date();
    const curDate = `${date.getFullYear()}`+ `-${date.getMonth() + 1}` + `-${date.getDate()}`
    // console.log(name,email,phone,dob);

    if(!name || !email || !phone || !dob){ // -----------------Fill all the fields----------------------------------------
      M.toast({html: "Please fill all the Fields...", classes:"#ff5252 red accent-2"})
      return;
    }  

    // --------------------------------------------------------Email Validation -------------------------------------------------------------------------------------
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(email)){
      M.toast({html: "Invalid Email Format...", classes:"#ff5252 red accent-2"})
      return;
    }

    // ---------------------------------------------------------Phone validation -------------------------------------------------------------------------------------
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!phoneRegex.test(phone)){
      M.toast({html: "Invalid Phone Format...", classes:"#ff5252 red accent-2"})
      return;
    }
    
    // ---------------------------------------------------------Date And Age Validation ------------------------------------------------------------------------------
    if(date.getFullYear() - userdob.getFullYear() < 18){
      M.toast({html: "Age must be 18 or Above...", classes:"#ff5252 red accent-2"})
      return;
    } 

    // console.log("All passed.....");
    // ---------------------------------------------------------Submit Request To Server -----------------------------------------------------------------------------
    fetch("/submit",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            phone,
            dob
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error, classes:"#ff5252 red accent-2" })
        }
        else{
            M.toast({html: data.message, classes:"#43a047 green darken-1" })
            history.push('/view')
        }
        console.log(data);
    }).catch(err=>{
        console.log(err);
    })

    // nameRef .current.value = "";
    // emailRef.current.value = "";
    // phoneRef.current.value = "";
    // dobRef  .current.value = "";


}



    return (
        <div>
        
            <div className="card auth-card input-field" >
                <h2>Submit Form</h2>
                <input 
                type="text"
                placeholder="Name"
                ref={nameRef}
                
                />
                <input 
                type="email"
                placeholder="Email"
                ref={emailRef}
                
                />
                <input 
                type="tel"
                placeholder="Phone"
                ref={phoneRef}
                
                />
                <input 
                type="date"
                placeholder="Date Of Birth"
                ref={dobRef}
                
                />
            
                <button 
                    className="waves-effect waves-light btn" 
                    onClick={()=>submitForm()}
                > Submit
                </button>
                
            </div>
        </div>
    )
}

export default SubmitForm;
