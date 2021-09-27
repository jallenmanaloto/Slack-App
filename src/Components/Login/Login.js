import { useRef } from 'react';
import {callAPI} from '../callAPI';

const Login = () => {
    const emailInput = useRef()
    const passInput = useRef()


    const handleLogin = (e) => {
        e.preventDefault();

        const data =  {
            method: 'post',
            url: 'auth/sign_in',
            email: emailInput.current.value,
            password: passInput.current.value
        }
        callAPI(data);
    }

    return (
        <div>

            <form>
                <label>Email</label>
                <input type='email' ref={emailInput}></input>
                <label>Password</label>
                <input type='password' ref={passInput}></input>
                <button onClick={handleLogin}>Submit</button>
            </form>

        </div>
    )
}


export default Login;