import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  heading: string;
  value: string;
}

const DocumentField: React.FC<Props> = ({ heading, value }) => {
  return (
    <Box>
      <Typography fontSize={12} color="#A6A7AB">
        {heading}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default DocumentField;
