import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useShareLicenseDialogState } from '../../../atoms/dialogs';
import fetchNui from '../../../utils/fetchNui';
import { useSnackbar } from '../../../snackbar/useSnackbar';
import { useDisableControls } from 'react-fivem-hooks';

export const LicenseDialog: React.FC = () => {
  const [dialog, setDialog] = useShareLicenseDialogState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const snackbar = useSnackbar();
  const { controls } = useDisableControls({ resourceName: 'ox_identityapp' });

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
        <TextField {...controls} autoFocus variant="standard" label="Player ID" fullWidth inputRef={inputRef} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog((ps) => ({ ...ps, visible: false }))}>Cancel</Button>
        <Button
          onClick={async () => {
            setDialog((ps) => ({ ...ps, visible: false }));
            const success = await fetchNui<boolean>('shareDocument', {
              id: inputRef.current ? +inputRef.current.value : null,
              document: dialog.license.toLowerCase(),
            });
            snackbar.addAlert({
              type: success ? 'success' : 'error',
              message: success
                ? 'Document successfully shared.'
                : 'An error occurred while trying to share the document.',
            });
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LicenseDialog;
