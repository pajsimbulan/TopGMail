import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FirstNameModal from '../components/EditFirstNameModal';

function FirstNameRow({ firstName, update }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(firstName);

  const updateFirstName = (newFirstName) => {
    if (newFirstName !== value) {
      setValue(newFirstName);
      update(newFirstName);
    }
  };

  return (
    <Box sx={{
      width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
    }}
    >
      <Box sx={{ marginY: 'auto' }}>
        <FirstNameModal edit={edit} closeModal={() => { setEdit(false); }} oldValue={firstName} setFirstName={(newFirstName) => { updateFirstName(newFirstName); }} />
        <Typography sx={{ fontWeight: 'light', color: 'colors.text' }}>{value}</Typography>
      </Box>
      <Button
        type="button"
        size="small"
        sx={{
          marginTop: 3, bgcolor: 'grey', color: 'white', borderRadius: 10, bgcolor: 'colors.button', textTransform: 'none', marginY: 'auto',
        }}
        onClick={() => { setEdit(true); }}
      >
        {' '}
        Edit
      </Button>
    </Box>
  );
}

export default FirstNameRow;
