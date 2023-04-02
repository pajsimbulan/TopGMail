import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorActionAlert from '../../components/ErrorAlert';
import PasswordChangedSuccesful from '../components/PasswordChangeSuccessful';
import { emailRegex } from '../../utils/MailRegex';
import { useMediaQuery } from '@mui/material';

const theme = createTheme({
  palette: {
    colors: {
      bg_default: '#FFFFFF',
      bg_2: '#CFCCCC',
      color2: '#F1F5F9',
      text: '#2E3D54',
      button: '#0F172A',
      bc: '#E9E9E9',
    },
  },
});
function Signuppage() {
  const navigate = useNavigate();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function openError(message) {
    setOpenErrorAlert(true);
    setAlertMessage(message);
  }

  const submitForgot = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!emailRegex.test(data.get('email'))) {
      openError('Error: Invalid Email Address.  Make sure the email consists of at least 1 alphabet and ends with *@mailman.com*');
      return;
    }
    if (data.get('password') !== data.get('confirmPassword')) {
      console.log('here');
      openError("Error: Passwords don't match");
      return;
    }
    let statusCode;
    fetch('http://localhost:4000/v0/changePassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.get('firstName'),
        email: data.get('email'),
        newPassword: data.get('password'),
      }),
    }).then((res) => {
      statusCode = res.status;
      setSuccessful(true);
    })
      .catch((error) => {
        console.log(error);
        if (statusCode === 404) {
          openError("Error: Account doesn't exist");
        } else {
          openError("Error: Invalid Input.  Make sure to fill up the form correctly.  Forms with '  *  ' are required");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', minHeight: '100vh', background: 'repeating-radial-gradient(#B3BDC9,#FCFDFE)' }}>
        <ErrorActionAlert openAlert={openErrorAlert} message={alertMessage} closeAlert={() => { setOpenErrorAlert(!openErrorAlert); }} />
        <Box sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, ml: 3,
        }}
        >
          <Avatar onClick={() => { navigate('/'); }} src="postman.jpg" sx={{ width: 50, height: 50, background: 'transparent' }} />
          <Typography
            onClick={() => { navigate('/'); }}
            sx={{
              fontWeight: 'bold', fontSize: '15px', color: '#2E3D54', mx: 2,
            }}
          >
            Mailman
          </Typography>
        </Box>
        <Box sx={{
          width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
        >
          <Box
            component="form"
            onSubmit={(event) => { submitForgot(event); }}
            sx={{
              marginTop: '3%',
              width: 'auto',
              height: 'auto',
              borderRadius: 3,
              bgcolor: 'white',
              border: 'solid',
              borderWidth: 1,
              borderColor: 'colors.bc',
              mx: 2,
              mb: 10,
            }}
          >
            {successful ? <PasswordChangedSuccesful onButtonPress={() => { navigate('/'); }} />
              : (
                <Box sx={{ marginX: 10, mt: 5, mb: 10,
                  '@media (max-width: 800px)': { mx:8 },
                  '@media (max-width: 500px)': { mx:6 } }}>
                  <Typography sx={{ fontSize: '30px',
                '@media (max-width: 800px)': { fontSize: '26px', },
                '@media (max-width: 500px)': { fontSize: '22px' } }}>Forgot Password</Typography>
                  <Divider sx={{ marginY: 3,
                  '@media (max-width: 800px)': { my:2.5 },
                  '@media (max-width: 500px)': { my:2, } }} />
                  <Typography sx={{ color: 'colors.text',
                '@media (max-width: 800px)': { fontSize: '14px', mt:1.5 },
                '@media (max-width: 500px)': { fontSize: '12px', mt:1 } }}>First Name*</Typography>
                  <TextField
                    sx={{ width: 180 }}
                    required
                    id="firstName"
                    name="firstName"
                    type="text"
                    inputProps={{
                      style: { fontSize: useMediaQuery('(max-width:500)') ? '10px' : (useMediaQuery('(max-width:800px)') ? '12px' : '14px') },
                    }}
                  />
                  <Typography sx={{ mt: 2, color: 'colors.text',
                '@media (max-width: 800px)': { fontSize: '14px',mt:1.5 },
            '@media (max-width: 500px)': { fontSize: '12px', mt:1 } }}>Email Address*</Typography>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    inputProps={{
                      style: { fontSize: useMediaQuery('(max-width:500)') ? '10px' : (useMediaQuery('(max-width:800px)') ? '12px' : '14px') },
                    }}
                  />
                  <Typography sx={{ mt: 2, color: 'colors.text',
                  '@media (max-width: 800px)': { fontSize: '14px',mt:1.5 },
                  '@media (max-width: 500px)': { fontSize: '12px', mt:1 }
                 }}>New Password*</Typography>
                  <OutlinedInput
                  inputProps={{
                    style: { fontSize: useMediaQuery('(max-width:500)') ? '10px' : (useMediaQuery('(max-width:800px)') ? '12px' : '14px') },
                  }}
                    required
                    fullWidth
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  )}
                  />
                  <Typography sx={{ mt: 2, color: 'colors.text',
                '@media (max-width: 800px)': { fontSize: '14px',mt:1.5 },
                '@media (max-width: 500px)': { fontSize: '12px', mt:1 } }}>Confirm Password*</Typography>
                  <OutlinedInput
                  inputProps={{
                    style: { fontSize: useMediaQuery('(max-width:500)') ? '10px' : (useMediaQuery('(max-width:800px)') ? '12px' : '14px') },
                  }}
                    required
                    fullWidth
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  )}
                  />
                  <Button
                    type="submit"
                    sx={{
                      marginY: 3, marginTop: 6, color: 'white', borderRadius: 1, bgcolor: '#338FEB', textTransform: 'none', width: '100%', height: 55, fontWeight: 'bold',
                      '@media (max-width: 800px)': { fontSize: '14px', height: 50, my: 2.5, mt:4.5 },
            '@media (max-width: 500px)': { fontSize: '12px', height: 45, my: 1.5, mt:3 }
                    }}
                    onSubmit={(event) => { submitForgot(event); }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{
                      borderRadius: 1, textTransform: 'none', width: '100%', height: 55, fontWeight: 'bold', width: '100%',
                      '@media (max-width: 800px)': { fontSize: '14px', height: 50 },
            '@media (max-width: 500px)': { fontSize: '12px', height: 45 }
                    }}
                    onClick={() => { navigate('/'); }}
                  >
                    Back to Sign In
                  </Button>
                </Box>
              )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Signuppage;
