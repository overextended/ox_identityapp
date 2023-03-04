import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useShareIdentityDialogState } from '../../../atoms/dialogs';

export const IdentityDialog: React.FC = () => {
  const [identityDialog, setIdentityDialog] = useShareIdentityDialogState();

  return (
    <Dialog
      open={identityDialog}
      onClose={() => setIdentityDialog(false)}
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
        <Button onClick={() => setIdentityDialog(false)}>Cancel</Button>
        <Button onClick={() => setIdentityDialog(false)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IdentityDialog;
