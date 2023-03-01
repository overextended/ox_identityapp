import { Box, Button, Card, CardContent } from '@mui/material';
import { Share } from '@mui/icons-material';
import React from 'react';
import InfoField from './components/InfoField';
import { useCharacterValue } from '../../atoms/character';
import PageHeading from '../../components/PageHeading';
import IdentityDialog from './components/IdentityDialog';
import { useSetShareIdentityDialog } from '../../atoms/dialogs';

const Home: React.FC = () => {
  const setIdentityDialog = useSetShareIdentityDialog();
  const character = useCharacterValue();

  return (
    <>
      <PageHeading heading="Your identity" />
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <InfoField heading="First name" value={character.firstName} />
            <InfoField heading="Last name" value={character.lastName} />
            <InfoField heading="Date of birth" value={character.dob} />
            <InfoField heading="Gender" value={character.gender} />
          </Box>
        </CardContent>
      </Card>
      <Button
        disableElevation
        onClick={() => setIdentityDialog(true)}
        variant="contained"
        startIcon={<Share />}
        sx={{ marginTop: 2 }}
      >
        Share identity
      </Button>
      <IdentityDialog />
    </>
  );
};

export default Home;
