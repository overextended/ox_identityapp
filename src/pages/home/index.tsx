import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { People, Share } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import InfoField from './components/InfoField';

const Home: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <Typography fontSize={28} fontFamily="Noto Sans" mb={3}>
        Your Identity
      </Typography>
      <Card>
        <CardContent>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <InfoField heading="First name" value="Michael" />
              <InfoField heading="Last name" value="Jordan" />
              <InfoField heading="Date of birth" value="01/01/1992" />
              <InfoField heading="Gender" value="Male" />
            </Box>
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
          <TextField autoFocus variant="standard" label="Player server id" fullWidth />
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
