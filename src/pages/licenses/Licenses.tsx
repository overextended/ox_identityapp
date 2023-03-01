import React from 'react';
import PageHeading from '../../components/PageHeading';
import { Box } from '@mui/material';
import LicenseDialog from './components/LicenseDialog';
import LicenseCard from './components/LicenseCard';

const LICENSES = ['Weapons', 'Hunting', "Driver's"];

export const Licenses: React.FC = () => {
  return (
    <>
      <PageHeading heading="Your licenses" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {LICENSES.map((license) => (
          <LicenseCard license={license} />
        ))}
      </Box>
      <LicenseDialog />
    </>
  );
};

export default Licenses;
