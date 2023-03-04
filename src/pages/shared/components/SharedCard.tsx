import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { ISharedCard } from '../Shared';
import DocumentField from './DocumentField';

interface Props {
  data: ISharedCard;
}

export const SharedCard: React.FC<Props> = ({ data }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Card>
      <CardHeader
        title={`${data.firstName} ${data.lastName}`}
        subheader="Now"
        action={
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <ExpandMore />
          </IconButton>
        }
      />
      <Collapse in={collapsed}>
        <CardContent>
          {data.documents.map((document) => (
            <Accordion
              sx={{ backgroundColor: 'grey.900' }}
              key={document.type === 'id' ? document.type : document.name}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{document.type === 'id' ? 'Identification' : `${document.name} License`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {document.type === 'id' ? (
                    <>
                      <DocumentField heading="First name" value={data.firstName} />
                      <DocumentField heading="Last name" value={data.lastName} />
                      <DocumentField heading="Date of birth" value={document.dob} />
                      <DocumentField heading="Gender" value={document.gender} />
                    </>
                  ) : (
                    <DocumentField heading="Issued" value={document.issued} />
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SharedCard;
