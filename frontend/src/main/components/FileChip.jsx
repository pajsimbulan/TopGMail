import * as React from 'react';
import { Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import getFileIcon from '../../utils/FileIcons';

function FileChip({files, onClick, onDelete }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 1 }}>
      {files.map((file, index) => (
        <Chip
          icon={getFileIcon(file.type)}
          label={file.name}
          deleteIcon={
            <CloseIcon sx={{ width: 15, '&:hover': { color: 'red' } }} />
          }
          onClick={() => onClick(index)}
          onDelete={() => onDelete(index)}
          sx={{
            bgcolor: 'transparent',
            color: 'grey',
            boxShadow: '1',
            fontSize: 10,
            m: 0.5,
          }}
        />
      ))}
    </Box>
  );
}

export default FileChip;
