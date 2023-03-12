import React from 'react';
import PageHeading from '../../components/PageHeading';
import { Box } from '@mui/material';
import DocumentList from './components/DocumentList';
import SearchField from './components/SearchField';
import LoadingCircle from '../../components/LoadingCircle';

export const Shared: React.FC = () => {
  return (
    <>
      <PageHeading heading="Shared documents" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingRight: '2px' }}>
        <SearchField />
        <React.Suspense fallback={<LoadingCircle />}>
          <DocumentList />
        </React.Suspense>
      </Box>
    </>
  );
};

export default Shared;
