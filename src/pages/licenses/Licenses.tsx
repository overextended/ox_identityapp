import React from 'react';
import PageHeading from '../../components/PageHeading';
import { Box } from '@mui/material';
import LicenseDialog from './components/LicenseDialog';
import LicenseCard from './components/LicenseCard';
import { useLicensesValue } from '../../atoms/licenses';

export const Licenses: React.FC = () => {
  return (
    <>
      <PageHeading heading="Your licenses" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <LicenseCard />
      </Box>
      <LicenseDialog />
    </>
  );
};

export default Licenses;
