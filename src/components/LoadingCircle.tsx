import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingCircle: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <CircularProgress sx={{ color: 'primary.main' }} />
    </Box>
  );
};

export default LoadingCircle;
