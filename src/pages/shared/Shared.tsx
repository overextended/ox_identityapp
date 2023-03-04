import React from 'react';
import PageHeading from '../../components/PageHeading';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import SharedCard from './components/SharedCard';

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

const CARDS: ISharedCard[] = [
  {
    firstName: 'Michael',
    lastName: 'Santa',
    documents: [
      { type: 'id', dob: '01/01/1999', gender: 'Male' },
      { type: 'license', name: 'Driving', issued: '01/01/2023' },
    ],
  },
  {
    firstName: 'Franklin',
    lastName: 'Clinton',
    documents: [
      { type: 'id', dob: '15/03/1889', gender: 'Male' },
      { type: 'license', name: 'Driving', issued: '02/02/2023' },
      { type: 'license', name: 'Weapons', issued: '23/05/2007' },
    ],
  },
];

export const Shared: React.FC = () => {
  return (
    <>
      <PageHeading heading="Shared documents" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingRight: '2px' }}>
        <TextField
          placeholder="Search"
          variant="standard"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {CARDS.map((card) => (
          <SharedCard key={`${card.firstName} ${card.lastName}`} data={card} />
        ))}
      </Box>
    </>
  );
};

export default Shared;
