import { useRef, useState, } from 'react';
/* import {callAPI} from '../callAPI'; */ 
import validator from 'validator';
import { Dialog } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'; 
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import TMiBot from '../../assets/images/TMiBot.svg';
import Sample from '../../assets/images/sample.jpg';

const useStyles = makeStyles((theme) => ({
    avatarOne: {
        height: '56px',
        width: '56px'
    },

    headerCreate: {
        fontSize: '40px',
        fontFamily: 'Roboto',
        fontWeight: 'bolder',
        fontStyle: 'normal',
        margin: '15px'
    },

    inputEmail: {
        width: '70%',
        margin: '10px'

    },

    inputPassword:{
        width: '70%'
    },

    inputConfirmPassword: {
        width: '70%',
    },
    
    newsletter: {
        margin: '10px',
    },

    buttonSignUp:{
        margin: '10px',
    },

    errorMsg:{

    },

    errorPass: {

    },
}));

const Registration = () => {
    const classes = useStyles()

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
        <Grid container>
            <Grid
                container
            >
               <Dialog className={classes.errorMsg} >HELLO{errorMsg}</Dialog>
               <Dialog className={classes.errorPass} >{errorPass}</Dialog>
            </Grid>
            <Grid 
                container 
                direction='row'
                justifyContent='center' 
                alignItems='center' 
                sx={{ height: '100vh' }}
                
            >
                <Grid 
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{ }}
                >
                    <img src={Sample} alt='sample' height='800' width='870'/>  
                </Grid>

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
                    <Avatar  className={classes.avatarOne}>
                        <img src={TMiBot} alt='sample' />
                    </Avatar>
                    <Typography className={classes.headerCreate}>Create Account</Typography>
                        
                        <TextField 
                            margin='normal'
                            size='small'
                            required
                            variant='outlined'
                            id='email-register'
                            name='email'
                            label='Email'
                            type='email' 
                            ref={emailInput}
                            className={classes.inputEmail}
                        />

                       {/*  <Grid 
                        container
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                            }}
                        > */}

                        <TextField 
                            margin='normal'
                            size='small'
                            required
                            variant='outlined'
                            id='password-register'
                            name='password'
                            label="Password" 
                            type='password' 
                            ref={passInput} 
                            onChange={(e) => PasswordStrength(e.target.value)}
                            className={classes.inputPassword}
                        />

                        <TextField 
                            margin='normal'
                            size='small'
                            required
                            variant='outlined'
                            id='password-register'
                            name='password'
                            label="Confirm Password" 
                            type='password' 
                            ref={confirmPassInput} onSubmit={(e) => handleRegister(e)}
                            className={classes.inputConfirmPassword}
                        />

                        {/* </Grid> */}
                        <FormControlLabel
                            control={<Checkbox/>}
                            label="I want to receive updates via email."
                            className={classes.newsletter}
                        />

                        <Button 
                            type='submit'
                            variant='contained'
                            className={classes.buttonSignUp}
                        > SIGN UP </Button>
                       
                   </Box>
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

        {/* <div>
            <form>
                <label>Email</label>
                <input type='email' ref={emailInput}></input>
                <label>Password</label>
                <input type='password' ref={passInput} onChange={(e) => PasswordStrength(e.target.value)}></input>
                <span style={{fontWeight: 'bold', color: 'red',}}>{errorPass}</span>
                <label>Confirm Password</label>
                <input type='password' ref={confirmPassInput} onChange={(e) => handleRegister(e)}></input> 
                <Button onClick={(e) => handleCreateAcct(e)}>Submit</Button>

                <span style={{fontWeight: 'bold', color: 'red',}}>{errorMsg}</span>
            </form>
        </div> */}

    </Grid>
    )
}

export default Registration;