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

const useStyles = makeStyles(() => ({
    containerBackground: {
        overflow: 'hidden',
        backgroundColor:'#F2ebdd',
        height: '100vh',
    },

    sideImage: {
        height: '100vh',
        width: '100%',
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
            method: 'post',
            url: 'auth/sign_in',
            email: email,
            password: password,
        }

        callAPI(data)
            .then((res) => setHeaders(res.headers))
            .catch((err) => console.err) 
    }

    console.log(headers) 

    return (
    
            <Grid container className={classes.containerBackground}>
                
                <Grid 
                    container 
                    direction='row'
                    justifyContent='center' 
                    alignItems='center' 
                    sx={{ height: '100vh' }}
                >

                    <Grid item xs={12} sm={8} md={5} square>
                        <Box 
                            sx={{
                            my: 8,
                            mx: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                            }}
                        >

                            <Typography className={classes.headerCreate}>Login Account</Typography>
                                
                            <TextField 
                                margin='normal'
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
                            > SIGN UP </Button>
                        
                    </Box>
                    </Grid>

                    <Grid 
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{ }}
                    >
                        <img src={Sample} alt='sample' className={classes.sideImage}/>  
                    </Grid>

                </Grid>

                <Grid
                    container
                >
                    <Grid 
                        item
                    >
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