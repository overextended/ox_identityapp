import React from 'react';
import PageHeading from '../../components/PageHeading';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import DocumentList from './components/DocumentList';

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
        <DocumentList />
      </Box>
    </>
  );
};

export default Shared;
