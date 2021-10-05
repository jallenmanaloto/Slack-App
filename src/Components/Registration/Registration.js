import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { callAPI } from "../API/callAPI";
import validator from "validator";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import CatBG from "../../assets/images/CatBG.jpg";
import { FormControlLabel } from "@material-ui/core";
import TMiBot from "../../assets/images/TMiBot.svg";
import Sample from "../../assets/images/sample.jpg";

const useStyles = makeStyles(() => ({
  containerBackground: {
    overflow: "hidden",
    backgroundColor: "#F2ebdd",
    height: "100vh",
  },

  sideImage: {
    height: "100vh",
    width: "58vw",
  },

  TMiBot: {
    height: "100px",
    width: "100px",
  },

  avatarOne: {
    height: "100px",
    width: "100px",
  },

  headerCreate: {
    fontFamily: "Roboto",
    fontSize: "3.5em",
    fontWeight: "bolder",
    textAlign: "left",
    margin: "15px",
  },

  input: {
    width: "70%",
    margin: "10px",
    height: "100%",
  },

  newsletterContainer: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  newsletter: {
    margin: "10px",
    fontSize: "1.2em",
  },

  buttonSignUp: {
    margin: "10px",
    fontSize: "1.2em",
  },

  errorMsg: {},

  errorPass: {},

  footerContainer: {
    margin: "10px",
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerOne: {
    marginTop: "10px",
    marginRight: "10px",
    fontSize: "1em",
  },

  footerTwo: {
    marginTop: "10px",
    fontSize: "1em",
    cursor: "pointer",
  },
}));

const Registration = () => {
  const classes = useStyles();

  const emailInput = useRef();
  const passInput = useRef();
  const confirmPassInput = useRef();

  const [errorPass, setErrorPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const toLogin = () => {
    history.push("/");
  };

  const handlePasswordStrength = (password) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
    ) {
      setErrorPass("Strong Password");
      console.log("Input Accepted (STRONG)");
      setPassword(password);
    } else {
      setErrorPass("Weak Password");
      console.log("Input Accepted (WEAK)");
      setPassword(password);
    }
    console.log(password);
  };

  const handleRegister = () => {
    if (password.value !== confirmPassword.value) {
      console.log("pass mismatch");
      setErrorMsg("Passwords do not match");
      return;
    } else {
      console.log("pass matched");
      setErrorMsg("Accepted");
      handleCreateAcct();
    }
  };

  const handleCreateAcct = () => {
    const data = {
      url: "auth",
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    callAPI(data);

    console.log(data);
  };

  return (
    <Grid container className={classes.containerBackground}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={false} sm={4} md={7} sx={{}}>
          <img src={CatBG} alt="sample" className={classes.sideImage} />
        </Grid>

        <Grid item xs={12} sm={8} md={5} square>
          <Box
            sx={{
              my: 8,
              mx: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container>
              <Typography className={classes.errorMsg}>{errorMsg}</Typography>
              <Typography className={classes.errorPass}>
                {" "}
                {errorPass}
              </Typography>
            </Grid>

            <Avatar className={classes.avatarOne}>
              <img src={TMiBot} alt="sample" className={classes.TMiBot} />
            </Avatar>

            <Typography className={classes.headerCreate}>
              Create Account
            </Typography>

            <TextField
              margin="normal"
              required
              variant="outlined"
              id="email-register"
              name="email"
              label="Email"
              type="email"
              ref={emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input}
            />

            <TextField
              margin="normal"
              required
              variant="outlined"
              id="password-register"
              name="password"
              label="Password"
              type="password"
              value={password}
              ref={passInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
            />

            <TextField
              margin="normal"
              required
              variant="outlined"
              id="confpassword-register"
              name="password"
              label="Confirm Password"
              type="password"
              ref={confirmPassInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={classes.input}
            />

            <Grid container className={classes.newsletterContainer}>
              <FormControlLabel control={<Checkbox />} />
              <Typography className={classes.newsletter}>
                I want to receive updates via email.
              </Typography>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              className={classes.buttonSignUp}
              onClick={(e) => handleRegister(e)}
            >
              {" "}
              SIGN UP{" "}
            </Button>

            <Grid container className={classes.footerContainer}>
              <Typography className={classes.footerOne}>
                {" "}
                Already have an account?{" "}
              </Typography>
              <Typography
                onClick={toLogin}
                className={classes.footerTwo}
                href="#"
                rel=""
              >
                {" "}
                Sign in
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
};

export default Registration;
