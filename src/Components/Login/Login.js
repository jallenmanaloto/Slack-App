import { useRef, useState} from 'react';
import {callAPI} from '../API/callAPI.js';


const Login = ({setHeaders, setData}) => {
    const emailInput = useRef()
    const passInput = useRef()

    const [errorMsg, setErrorMsg] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        const data =  {
            url: 'auth/sign_in',
            email: emailInput.current.value,
            password: passInput.current.value
        }

        callAPI(data)
            /* .then((res) => {
                setHeaders(res.headers);
                setData(res.data.data);
                console.log(res.headers);
                
                })

            .catch((err) => console.err) */

    }


    console.log()

    return (
        <div>

            <form>
                <label>Email</label>
                <input type='email' ref={emailInput}></input>
                <label>Password</label>
                <input type='password' ref={passInput}></input>
                <button onClick={(e) => handleLogin(e)}>Submit</button>
            </form>

        </div>
    )
}


export default Login;