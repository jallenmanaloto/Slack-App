import { useRef, useState, useContext } from "react";
import { useHistory } from "react-router";
import { callAPI } from "../API/callAPI.js";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { ContextAPI } from "../Context/ContextAPi.js";
import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography,
  TextField,
} from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Sample from "../../assets/images/sample.jpg";
import CatBG from "../../assets/images/CatBG.jpg";
import Logo from "../../assets/images/Logo.svg";
import axios from "axios";

const useStyles = makeStyles(() => ({
  containerBackground: {
    overflow: "hidden",
    backgroundColor: "#F2ebdd",
    height: "100vh",
  },

  containerDiv: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  errorMessage: {
    width: "100%",
  },

  sideImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },

  sideImage: {
    height: "100vh",
    width: "60vw",
  },

  headerLogin: {
    fontFamily: "Roboto",
    fontSize: "3.5em",
    fontWeight: "bolder",
    textAlign: "left",
    margin: "15px",
  },

  input: {
    width: "70%",
    margin: "10px",
  },

  buttonLogin: {
    margin: "10px",
    fontSize: "1.2em",
  },

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

const Login = () => {
  const classes = useStyles();

  const history = useHistory();

  const emailInput = useRef();
  const passInput = useRef();
  const {
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    auth,
    setAuth,
    channelData,
    setChannelData,
    channelMembers,
    setChannelMembers,
    channelMessage,
    setchannelMessage,
    setMessages,
    tokenValue,
    setTokenValue,
    userName,
    setUserName,
  } = useContext(ContextAPI);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const handleKeyDown = (evt) => {
    evt.key === "Enter" && handleLogin(evt);
  };

  const toRegister = () => {
    history.push("/register");
  };

  const handleErrorDisplay = () => {
    setErrorMsg(true);
    setTimeout(() => {
      setErrorMsg(false);
    }, 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://206.189.91.54/api/v1/auth/sign_in",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        const { "access-token": token } = res.headers;
        const { email } = res.data.data;
        const { uid } = res.data.data;
        const userDisplayName = email.split("@")[0];

        setUserName(userDisplayName);

        // if (!JSON.parse(localStorage.getItem("messages"))) {
        //   return;
        // } else {
        //   setMessages(JSON.parse(localStorage.getItem("message")));
        // }

        if (res.data.errors) {
          handleErrorDisplay();
        }

        const authData = {
          accessToken: token,
          accessClient: res.headers.client,
          accessExpiry: res.headers.expiry,
          accessUID: uid,
        };
        localStorage.setItem("userKey", JSON.stringify(authData));
        setAuth(true);
        history.push("/dashboard");
      })
      .then((res) => {
        const auth = JSON.parse(localStorage.getItem("userKey"));
      })
      .catch((err) => handleErrorDisplay());
  };

  return (
    <Grid container className={classes.containerBackground}>
      <Grid container className={classes.containerDiv}>
        <Grid item xs={12} sm={8} md={5} className={classes.containerLoginForm}>
          <Box
            sx={{
              my: 8,
              mx: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {errorMsg ? (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                open="true"
              >
                <Alert severity="error" variant="filled">
                  Invalid credentials. Try again.
                </Alert>
              </Snackbar>
            ) : null}
            <Typography className={classes.headerLogin}>Sign In</Typography>

            <TextField
              margin="normal"
              size="small"
              required
              variant="outlined"
              id="email-login"
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
              size="small"
              required
              variant="outlined"
              id="password-login"
              name="password"
              label="Password"
              type="password"
              ref={passInput}
              value={password}
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Keep me logged in"
              className={classes.remember}
            />

            <Button
              type="submit"
              variant="contained"
              className={classes.buttonLogin}
              onClick={(e) => handleLogin(e)}
            >
              {" "}
              LOGIN{" "}
            </Button>

            <Grid container className={classes.footerContainer}>
              <Typography className={classes.footerOne}>
                {" "}
                Don't have an account?{" "}
              </Typography>
              <Typography onClick={toRegister} className={classes.footerTwo}>
                {" "}
                Sign up
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{}}
          className={classes.sideImageContainer}
        >
          <img src={CatBG} alt="sample" className={classes.sideImage} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
