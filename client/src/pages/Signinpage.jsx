import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router';
import { useContext, useState, useRef } from 'react';
import { UserContext } from '../App';
import SuccessActionAlert from '../components/SuccessAlert';
import ErrorActionAlert from '../components/ErrorAlert';

const theme = createTheme({
  palette: {
    colors: {
      bg_default:'#FFFFFF',
      color2:'#F1F5F9',
      text: '#334155',
      button: '#0F172A'
    }
  },
});
export default function Signinpage() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [renderSignIn, setRenderSignIn] = useState(true);
  const [renderSignUp, setRenderSignUp] = useState(false);
  const [renderForgot, setRenderForgot] = useState(false);
  const openSuccessAlert = useRef(false);
  const openErrorAlert = useRef(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  function openSucess(message) {
    openSuccessAlert.current = true;
    openErrorAlert.current = false;
    setAlertMessage(message);
  }
  function openError(message) {
    openSuccessAlert.current = false;
    openErrorAlert.current = true;
    setAlertMessage(message);
  }



  const submitSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
    });
    let statusCode;
    fetch('http://localhost:4000/v0/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'email': data.get('email'),
      'password': data.get('password'),
      'firstName': data.get('firstName'),
      'lastName': data.get('lastName'),
    }),
    })
    .then((res) => {
      statusCode = res.status;
      setRenderSignIn(true);
      setRenderSignUp(false);
      setRenderForgot(false); 
      openSucess("Account Created");
      return res.json();
  }).catch((error) => {
    if(statusCode === 403) {
      openError("Error: Email already exists");
    }
    else {
      openError("Error: Make sure to fill up the form correctly.  Forms with '  *  ' are required");
    }
  }); 
  };

  const submitForgot = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let statusCode;
    fetch('http://localhost:4000/v0/changepassword', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "firstName" :   data.get('firstName'),
      "email" : data.get('email'),
      "newPassword" : data.get('password'),
    }),
  }).then((res) => {
    statusCode = res.status;
    return res.json();})
  .then((jsondata) => {
    alert(`password for the account ${jsondata.email} has been succesfully changed`);
    setRenderSignIn(true);
    setRenderSignUp(false);
    setRenderForgot(false);
    openSucess("Password Changed");
})
  .catch((error) => {
    console.log(error);
    if(statusCode === 404) {
      openError("Error: Account doesn't exist");
    }
    else {
      openError("Error: Invalid Input.  Make sure to fill up the form correctly.  Forms with '  *  ' are required");
    }
  }); 
  }

  const submitLogin = (event) => {
    console.log('got here');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let statusCode;
    fetch('http://localhost:4000/v0/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email" :   data.get('email'),
      "password" : data.get('password'),
    }),
  })
  .then((res) => {
    statusCode = res.status;
    return res.json();})
  .then((jsondata) => {
    user.accessToken = jsondata.accessToken;
    user.userInfo.email = jsondata.email;
    user.userInfo.firstName = jsondata.firstName;
    user.userInfo.lastName = jsondata.lastName;
    user.userInfo.gender = jsondata.gender;
    user.userInfo.birthDate = jsondata.birthDate;
    user.userInfo.createdAt = jsondata.createdAt;
    navigate('/main'); 
  }).catch((error) => {
    console.log(error);
    openError("Error: Invalid Input");
  }); 
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorActionAlert openAlert={openErrorAlert.current} message={alertMessage} closeAlert={() => {openErrorAlert.current = (!openErrorAlert.current)}}/>
      <SuccessActionAlert openAlert={openSuccessAlert.current} message={alertMessage} closeAlert={() => {openSuccessAlert.current = (!openSuccessAlert.current)}}/>
      <Box sx = {{width: "100%", height: '100vh',display: 'flex',flexDirection:'column', alignItems:'center'}}>
        <Box component="form" onSubmit={(event) => {
          if(renderSignIn) {submitLogin(event);}
          if(renderSignUp) {submitSignUp(event);}
          if(renderForgot) {submitForgot(event);}
          }} noValidate sx = {{width: "100%", height: '100vh',display: 'flex', flexDirection:'column', alignItems:'center'}}>
          <Box sx={{display: 'flex', flexDirection:'row',  alignItems:'center', marginY:8}}>
          <Typography sx={{fontWeight:'bold', fontSize:'30px', color:'colors.text'}}>MAIL</Typography>
          <Avatar src='postman.jpg' sx={{width:200, height:200, border:'solid', borderWidth:'3px', borderColor: 'colors.color2'}}/>
          <Typography sx={{fontWeight:'bold', fontSize:'30px', color:'colors.text'}}>MAN</Typography>
          </Box>
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
              height: 'auto',
              boxShadow: '1',
              borderRadius: 3,
              border: 'solid',
              borderWidth:'4px',
              borderColor: 'colors.color2',
            }}>
              <Grid2 container sx={{backgroundColor:'colors.button',height:'auto',display:'flex start',borderRadius: 1,borderColor:'colors.color2', borderWidth:'4px'}}>
                <Grid2 item xs={12} md={3.5} sx={{marginLeft:1,marginY:1, display:'flex'}}>
                  <Button  
                  type="button"
                  onClick={() => {setRenderSignIn(true);setRenderSignUp(false);setRenderForgot(false);}} 
                  sx={{color:(renderSignIn?'colors.button':'white'), borderRadius:1, bgcolor:(renderSignIn?'white':'') ,textTransform: 'none', fontWeight:'bold', margin:'auto'}}
                  >
                  Sign In
                </Button> </Grid2>
                <Grid2 item xs={12} md={3.5} sx={{marginLeft:1, marginY:1, display:'flex'}}><Button
                  type="button"
                  onClick={() => {setRenderSignIn(false);setRenderSignUp(true);setRenderForgot(false);}} 
                  sx={{color:(renderSignUp?'colors.button':'white'), borderRadius:1,bgcolor:(renderSignUp?'white':'') ,textTransform: 'none', fontWeight:'bold', margin:'auto'}}
                >
                  Sign Up
                </Button> </Grid2>
                <Grid2 item xs={12} md={3.5} sx={{marginLeft:1, marginY:1, display:'flex'}}><Button
                  type="button"
                  onClick={() => {setRenderSignIn(false);setRenderSignUp(false);setRenderForgot(true);}} 
                  sx={{color:(renderForgot?'colors.button':'white'), borderRadius:1,bgcolor:(renderForgot?'white':'') ,textTransform: 'none', fontWeight:'bold', margin:'auto'}}
                >
                  Forgot Password
                </Button> </Grid2>
              </Grid2>
              {/**Sign In Block */}
              {renderSignIn?<Box sx={{marginX:5, mt:5}} >
                <Typography sx={{fontWeight:'bold', color:'colors.text'}}>Email Address</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={{mt:2, fontWeight:'bold', color:'colors.text'}}>Password</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Box sx={{display:'flex', justifyContent:'flex-end', marginY:'auto'}}>
                    <Button type="submit" sx={{marginY:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:90, height:55}} onSubmit={(event) => {submitForgot(event);}}> Submit </Button>
                </Box>
                </Box>:<Box/>}
                {/**End of Sign In Block */}

                {/**Sign Up Block */}
                {renderSignUp?<Box sx={{marginX:5, mt:5}}>
                <Grid2 container sx={{justifyContent:'space-between'}}>
                  <Grid2 item xs={5.5} >
                    <Typography sx={{fontWeight:'bold', color:'colors.text'}}>First Name*</Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    type="text"
                  /> 
                  </Grid2>
                  <Grid2 item xs={5.5}>  <Typography sx={{fontWeight:'bold', color:'colors.text'}}>Last Name</Typography>
                  <TextField
                  margin="normal"
                  fullWidth
                  name="lastName"
                  type="text"
                  id="lastName"
                /></Grid2>
                </Grid2>
                <Typography sx={{fontWeight:'bold', color:'colors.text'}}>Email Address*</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={{mt:2, fontWeight:'bold', color:'colors.text'}}>Password*</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Box sx={{display:'flex', justifyContent:'flex-end', marginY:'auto'}}>
                    <Button type="submit" sx={{marginY:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:90, height:55}} onSubmit={(event) => {submitForgot(event);}}> Submit </Button>
                </Box>
                </Box>:<Box/>}
                {/**End of Sign Up Block */}

                {/**Forgot Password Block */}
                {renderForgot?<Box sx={{marginX:5, mt:5}} >
                <Typography sx={{fontWeight:'bold', color:'colors.text'}}>First Name*</Typography>
                <TextField
                    margin="normal"
                    required
                    id="firstName"
                    name="firstName"
                    type="text"
                  /> 
                <Typography sx={{fontWeight:'bold', color:'colors.text'}}>Email Address*</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={{mt:2, fontWeight:'bold', color:'colors.text'}}>New Password*</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Box sx={{display:'flex', justifyContent:'flex-end', marginY:'auto'}}>
                    <Button type="submit" sx={{marginY:3, bgcolor:'grey', color:'white', borderRadius:1, bgcolor:'colors.button', textTransform: 'none', width:90, height:55}} onSubmit={(event) => {submitForgot(event);}}> Submit </Button>
                </Box>
                </Box>:<Box/>}
                {/**End of Forgot Password Block */}
            </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
