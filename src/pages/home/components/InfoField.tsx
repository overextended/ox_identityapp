import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  heading: string;
  value: string;
}

const InfoField: React.FC<Props> = ({ heading, value }) => {
  return (
    <Box sx={{ paddingBottom: 0.5, paddingTop: 0.5 }}>
      <Typography fontSize={12} color="#A6A7AB">
        {heading}
      </Typography>
      <Typography fontSize={20} fontFamily="Noto Sans">
        {value}
      </Typography>
    </Box>
  );
};

export default InfoField;
