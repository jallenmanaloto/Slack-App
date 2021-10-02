import { useRef, useState, useContext} from 'react';
import { useHistory } from 'react-router';
import { callAPI } from '../API/callAPI.js';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { ContextAPI } from '../Context/ContextAPi.js';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'; 
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import Sample from '../../assets/images/sample.jpg';
import CatBG from '../../assets/images/CatBG.jpg';
import Logo from '../../assets/images/Logo.svg';

const useStyles = makeStyles(() => ({
    
    containerBackground: {
        overflow: 'hidden',
        backgroundColor:'#F2ebdd',
        height: '100vh',
    },

    containerDiv: {
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center' ,
        height: '100vh',
    },

    sideImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
    },

    sideImage: {
        height: '100vh',
        width: '60vw',
    },

    headerLogin: {
        fontFamily: 'Roboto',
        fontSize: '3.5em',
        fontWeight: 'bolder',
        textAlign: 'left',
        margin: '15px',
    },

    input: {
        width: '70%',
        margin: '10px',
    },

    buttonLogin: {
        margin: '10px',
        fontSize: '1.2em',
    },

    footerContainer: {
        margin: '10px',
        direction: 'row',
        justifyContent: 'center' ,
        alignItems: 'center' ,
    },

    footerOne: {
        marginTop: '10px',
        marginRight: '10px',
        fontSize: '1em',
    },

    footerTwo: {
        marginTop: '10px',
        fontSize: '1em',
    },

}));


const Login = () => {
    const classes = useStyles()

    const history = useHistory()

    const emailInput = useRef()
    const passInput = useRef()
    const {apiData, setApiData, apiHeaders, setApiHeaders, tokenValue, setTokenValue} = useContext(ContextAPI)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        const data =  {
            url: 'auth/sign_in',
            email: email,
            password: password,
        }

        callAPI(data)
            .then((res) => setHeaders(res.headers))
            .catch((err) => console.err) 

        const details = {
            email: email,
            password: password,
        // axios({
        //     method: 'POST',
        //     url:'http://206.189.91.54/api/v1/auth/sign_in',
        //     data: {
        //         email: emailInput.current.value,
        //         password: passInput.current.value
        //     }
        // })
        // .then(res => {
        //     const { headers } = res
        //     const { 'access-token': token} = res.headers
        //     setApiData(res)
        //     setApiHeaders(headers)
        //     setTokenValue(token)

            const data =  {
                method: 'POST',
                url: 'auth/sign_in',
                email: email,
                password: password,
        }
            callAPI(data)
                .then((res) => {
                    const { 'access-token': token } = res.headers
                    setTokenValue(token)
                    setApiHeaders(res.headers)
                    setApiData(res)
                    console.log(res)
                    history.push('dashboard')
                })
                .catch((err) => console.err) 


            const details = {
                email: email,
                password: password,
            }
       
            localStorage.setItem('user', JSON.stringify(details))
    }

      return (
            <Grid container className={classes.containerBackground}>
                <Grid 
                    container 
                    className={classes.containerDiv}
                >
                    <Grid item xs={12} sm={8} md={5} className={classes.containerLoginForm}>
                        <Box 
                            sx={{
                            my: 8,
                            mx: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                            }}
                        >
                           
                            <Typography className={classes.headerLogin}>Sign In</Typography>

                            <TextField 
                                margin='normal'
                                size='small'
                                required
                                variant='outlined'
                                id='email-login'
                                name='email'
                                label='Email'
                                type='email' 
                                ref={emailInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={classes.input}
                            />
                            <TextField 
                                margin='normal'
                                size='small'
                                required
                                variant='outlined'
                                id='password-login'
                                name='password'
                                label="Password" 
                                type='password' 
                                ref={passInput} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className={classes.input}
                            />

                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Keep me logged in"
                                className={classes.remember}
                            />

                            <Button 
                                type='submit'
                                variant='contained'
                                className={classes.buttonLogin}
                                onClick={(e) => handleLogin(e)}
                            > LOGIN </Button>
                       
                            <Grid container  className={classes.footerContainer}>
                                <Typography className={classes.footerOne}> Don't have an account? </Typography>
                                <Typography className={classes.footerTwo}> Sign up</Typography>
                            </Grid>
                            

                    </Box>
                    </Grid>
                    <Grid 
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{ }}
                        className={classes.sideImageContainer}
                    >
                        <img src={CatBG} alt='sample' className={classes.sideImage}/>  
                    </Grid>
                </Grid>
            </Grid> 

/*             <div>

            <form>
                <label>Email</label>
                <input type='email'
                    ref={emailInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>

                <label>Password</label>
                <input type='password'  
                    ref={passInput} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} ></input>

                <button onClick={(e) => handleLogin(e)}>Submit</button>
            </form>

            </div> */
    )
}


export default Login