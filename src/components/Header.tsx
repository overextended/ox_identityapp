import React, { ReactNode } from 'react';
import { APP_PRIMARY_COLOR } from '../app.theme';
import { Typography, Box, useTheme, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';

export const HEADER_HEIGHT = '4rem';
const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;

  min-height: ${HEADER_HEIGHT};
  margin-left: 1rem;
`;

const Header = () => {
  const theme = useTheme();
  return (
    <Container backgroundColor={theme.palette.primary.main}>
      <IconButton>
        <ArrowBack />
      </IconButton>
    </Container>
  );
};

export default Header;
