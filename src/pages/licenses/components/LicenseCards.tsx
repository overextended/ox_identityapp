import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Share } from '@mui/icons-material';
import { useSetShareLicenseDialog } from '../../../atoms/dialogs';
import { useLicensesValue } from '../../../atoms/licenses';

const LicenseCards: React.FC = () => {
  const setDialog = useSetShareLicenseDialog();
  const licenses = useLicensesValue();

  return (
    <>
      {licenses && licenses.length > 0 ? (
        licenses.map((license) => (
          <Card key={license[0]}>
            <CardContent>
              <Typography fontSize={20}>{license[1].label}</Typography>
              <Typography fontSize={14} color="#A6A7AB">
                Issued: {license[1].issued}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => setDialog({ license: license[0], visible: true })} startIcon={<Share />}>
                Share
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography>No licenses found.</Typography>
      )}
    </>
  );
};

export default LicenseCards;
