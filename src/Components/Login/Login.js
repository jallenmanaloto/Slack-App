import { useRef, useState, useContext} from 'react';
import { useHistory } from 'react-router';
import {callAPI} from '../API/callAPI.js';
import { ContextAPI } from '../Context/ContextAPi.js';
import axios from 'axios';


const Login = ({setUser}) => {
    const history = useHistory();
    const emailInput = useRef()
    const passInput = useRef()
    const {apiData, setApiData, apiHeaders, setApiHeaders, tokenValue, setTokenValue} = useContext(ContextAPI);

    const [errorMsg, setErrorMsg] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url:'http://206.189.91.54/api/v1/auth/sign_in',
            data: {
                email: emailInput.current.value,
                password: passInput.current.value
            }
        })
        .then(res => {
            const { headers } = res
            const { 'access-token': token} = res.headers
            setApiData(res)
            setApiHeaders(headers)
            setTokenValue(token)

            console.log(apiData)
            console.log(emailInput.current.value)
            console.log(passInput.current.value)
            setUser(localStorage.setItem('user', apiData?.data?.data?.id))
            
            if(apiData === null) {
                console.log('empty data')
            }
            history.push('/dashboard')
        })
        .catch(err => {
            console.log(err)
            console.log('error on log in, possible undefined input values')
            history.push('/')
        })
    }   

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