import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useShareLicenseDialogState } from '../../../atoms/dialogs';

export const LicenseDialog: React.FC = () => {
  const [dialog, setDialog] = useShareLicenseDialogState();

  return (
    <Dialog
      open={dialog.visible}
      onClose={() => setDialog((ps) => ({ ...ps, visible: false }))}
      container={() => document.getElementById('modalContainer')}
      sx={{ position: 'absolute' }}
      hideBackdrop
    >
      <DialogTitle>Share license</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Share your ${dialog.license.toLowerCase()} license with someone.`}</DialogContentText>
        <TextField autoFocus variant="standard" label="Player ID" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog((ps) => ({ ...ps, visible: false }))}>Cancel</Button>
        <Button onClick={() => setDialog((ps) => ({ ...ps, visible: false }))}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LicenseDialog;
