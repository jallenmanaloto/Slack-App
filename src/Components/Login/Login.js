import { useRef, useState} from 'react';
import { callAPI } from '../API/callAPI.js';
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
import LogReg from '../../assets/images/LogReg.svg'

const useStyles = makeStyles(() => ({
    containerBackground: {
        overflow: 'hidden',
        /* backgroundColor:'#F2ebdd', */
        height: '100vh',
    },

    containerDiv: {
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center' ,
        height: '100vh',
    },

    containerLoginForm: {
        backgroundImage: `url(${LogReg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100VH',
    },

    sideImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#14106A'
    },

    img: {
        top: '50',
        height: '30vh',
        width: '30%',
    },

    headerLogin: {
        fontFamily: 'Roboto',
        fontSize: '40px',
        fontWeight: 'bolder',
        textAlign: 'left',
        margin: '15px',

    },


}));


const Login = () => {
    const classes = useStyles()

    const emailInput = useRef()
    const passInput = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [headers, setHeaders] = useState('')

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
        }
        
        localStorage.setItem('user', JSON.stringify(details))
        console.log(details)
    }

    console.log(headers) 
  

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
                            
                            <Typography className={classes.headerLogin}>Login Account</Typography>
                                
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
                                className={classes.inputEmail}
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
                                className={classes.inputPassword}
                            />

                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Remember Me"
                                className={classes.remember}
                            />

                            <Button 
                                type='submit'
                                variant='contained'
                                className={classes.buttonLogin}
                                onClick={(e) => handleLogin(e)}
                            > LOGIN </Button>
                        
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


export default Login;