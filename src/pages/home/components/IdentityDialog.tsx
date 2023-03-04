import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useShareIdentityDialogState } from '../../../atoms/dialogs';
import fetchNui from '../../../utils/fetchNui';

export const IdentityDialog: React.FC = () => {
  const [identityDialog, setIdentityDialog] = useShareIdentityDialogState();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
        <TextField inputRef={inputRef} autoFocus variant="standard" label="Player ID" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIdentityDialog(false)}>Cancel</Button>
        <Button
          onClick={() => {
            setIdentityDialog(false);
            fetchNui('shareIdentity', inputRef.current ? +inputRef.current.value : null);
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IdentityDialog;
