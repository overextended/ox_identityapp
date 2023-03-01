import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Share } from '@mui/icons-material';
import React, { useState } from 'react';
import InfoField from './components/InfoField';
import { useCharacterValue } from '../../atoms/character';
import PageHeading from '../../components/PageHeading';

const Home: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
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
        onClick={() => setDialogVisible(true)}
        variant="contained"
        startIcon={<Share />}
        sx={{ marginTop: 2 }}
      >
        Share identity
      </Button>

      <Dialog
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        container={() => document.getElementById('modalContainer')}
        sx={{ position: 'absolute' }}
        hideBackdrop
      >
        <DialogTitle>Share identity</DialogTitle>
        <DialogContent>
          <DialogContentText>Share the details of your person to someone else.</DialogContentText>
          <TextField autoFocus variant="standard" label="Player ID" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogVisible(false)}>Cancel</Button>
          <Button disableElevation onClick={() => setDialogVisible(false)} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
