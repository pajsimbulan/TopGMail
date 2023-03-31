import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MailAppBar from '../components/MailAppBar';
import MailNavBar from '../components/MailNavBar';
import MailBody from '../components/MailBody';
import MailDrawerNavigation from '../components/MailDrawerNavigation';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 800,
      lg: 1024,
      xl: 1280,
    },
  },
});

function Mainpage() {
  const [inbox, setSelectedInbox] = React.useState('inbox');
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  console.log(`main page render inbpx: ${inbox}`);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', minHeight: '100vh', background: 'repeating-radial-gradient(#EBF5FF,#FCFDFE)' }}>
        <Grid2 container>
          <Grid2 xs={0} md={2}>
            {isSmallScreen ? null : <MailNavBar currentInbox={inbox} selectedInbox={(selectedInbox) => { setSelectedInbox(selectedInbox); }} />}
          </Grid2>
          <Grid2 xs={12} md={10}>
            <MailAppBar currentInbox={inbox} selectedInbox={(selectedInbox) => { setSelectedInbox(selectedInbox); }} />
            <MailBody selectedInbox={inbox} />
          </Grid2>
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}

export default Mainpage;
