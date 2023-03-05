import React from 'react';
import SharedCard from './SharedCard';
import { useSharedDocumentsValue } from '../../../atoms/shared';
import { Typography } from '@mui/material';

const DocumentList: React.FC = () => {
  const documents = useSharedDocumentsValue();

  return (
    <>
      {documents.length > 0 ? (
        documents.map((card) => <SharedCard key={`${card.firstName} ${card.lastName}`} data={card} />)
      ) : (
        <Typography>No shared documents found</Typography>
      )}
    </>
  );
};

export default DocumentList;
