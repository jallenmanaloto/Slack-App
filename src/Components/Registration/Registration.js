import { useRef, useState, } from 'react';
/* import {callAPI} from '../callAPI'; */ 
import validator from 'validator' 


const Registration = () => {
    const emailInput = useRef()
    const passInput = useRef()
    const confirmPassInput = useRef()

    const [errorPass, setErrorPass] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    const PasswordStrength = (v) => {
        if (validator.isStrongPassword(v, { minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1,}))
        {
            setErrorPass('Strong Password')
            console.log('Input Accepted (STRONG)')
        } else {
            setErrorPass('Weak Password')
            console.log('Input Accepted (WEAK)')
        }
    }

   const handleRegister = (e) => {
        if (passInput.current.value !== confirmPassInput.current.value) {
            e.preventDefault();
            console.log('pass mismatch');
            setErrorMsg('Passwords do not match');
            return;
        } else {
            e.preventDefault();
            console.log('pass matching');
            setErrorMsg('Accepted');
            handleCreateAcct();
        }
    }  

    const handleCreateAcct = (e) => {
       /* const data =  {
            method: 'post',
            url: 'auth',
            email: emailInput.current.value,
            password: passInput.current.value,
            password_confirmation: confirmPassInput.current.value
        }
        
        callAPI(data);   */  
        console.log('calls API')
    }


    return (
        <div>
            <form>
                <label>Email</label>
                <input type='email' ref={emailInput}></input>
                <label>Password</label>
                <input type='password' ref={passInput} onChange={(e) => PasswordStrength(e.target.value)}></input>
                <span style={{fontWeight: 'bold', color: 'red',}}>{errorPass}</span>
                <label>Confirm Password</label>
                <input type='password' ref={confirmPassInput}></input>
                <button onClick={(e) => handleRegister(e)}>Submit</button>

                <span style={{fontWeight: 'bold', color: 'red',}}>{errorMsg}</span>
            </form>
        </div>
    )
}

export default Registration;