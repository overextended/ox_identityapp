import React from 'react';
import PageHeading from '../../components/PageHeading';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import DocumentList from './components/DocumentList';
import LoadingCircle from '../../components/LoadingCircle';

type IDCard = {
  type: 'id';
  dob: string;
  gender: string;
};

type LicenseCard = {
  type: 'license';
  name: string;
  issued: string;
};

export interface ISharedCard {
  firstName: string;
  lastName: string;
  documents: Array<IDCard | LicenseCard>;
}

export const Shared: React.FC = () => {
  return (
    <>
      <PageHeading heading="Shared documents" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingRight: '2px' }}>
        <TextField
          placeholder="Search"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <React.Suspense fallback={<LoadingCircle />}>
          <DocumentList />
        </React.Suspense>
      </Box>
    </>
  );
};

export default Shared;
