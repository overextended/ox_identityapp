import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  heading: string;
}

export const PageHeading: React.FC<Props> = ({ heading }) => {
  return (
    <Typography fontSize={28} mb={3}>
      {heading}
    </Typography>
  );
};

export default PageHeading;
