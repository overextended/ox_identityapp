import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useShareIdentityDialogState } from '../../../atoms/dialogs';
import fetchNui from '../../../utils/fetchNui';
import { useSnackbar } from '../../../snackbar/useSnackbar';
import { useDisableControls } from 'react-fivem-hooks';

export const IdentityDialog: React.FC = () => {
  const [identityDialog, setIdentityDialog] = useShareIdentityDialogState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const snackbar = useSnackbar();
  const { controls } = useDisableControls({ resourceName: 'ox_identityapp' });

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
        <TextField {...controls} inputRef={inputRef} autoFocus variant="standard" label="Player ID" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIdentityDialog(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setIdentityDialog(false);
            const success = await fetchNui('shareIdentity', inputRef.current ? +inputRef.current.value : null, true);
            snackbar.addAlert({
              type: success ? 'success' : 'error',
              message: success ? 'Identity successfully shared.' : 'An error occurred while trying to share identity.',
            });
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IdentityDialog;
