import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import DocumentField from './DocumentField';
import type { SharedDocument } from '../../../../typings/documents';
import dayjs from 'dayjs';

interface Props {
  data: SharedDocument;
}

export const SharedCard: React.FC<Props> = ({ data }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
            {data.firstName.charAt(0) + data.lastName.charAt(0)}
          </Avatar>
        }
        title={`${data.firstName} ${data.lastName}`}
        subheader={dayjs(data.shareTime).fromNow()}
        action={
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <ExpandMore
              sx={(theme) => ({
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest }),
              })}
            />
          </IconButton>
        }
      />
      <Collapse in={collapsed}>
        <CardContent>
          {data.documents.map((document, index) => (
            <Accordion
              TransitionProps={{ unmountOnExit: true }}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={(theme) => ({ backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100' })}
              key={document.type === 'id' ? document.type : document.name}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{document.type === 'id' ? 'Identification' : document.label}</Typography>
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
