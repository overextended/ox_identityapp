import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Share } from '@mui/icons-material';
import { useSetShareLicenseDialog } from '../../../atoms/dialogs';

interface Props {
  license: string;
}

const LicenseCard: React.FC<Props> = ({ license }) => {
  const setDialog = useSetShareLicenseDialog();

  return (
    <Card>
      <CardContent>
        <Typography fontSize={20}>{license} license</Typography>
        <Typography fontSize={14} color="#A6A7AB">
          Issued: 01/01/1992
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setDialog({ license, visible: true })} startIcon={<Share />}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default LicenseCard;
