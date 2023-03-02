import React from 'react';
import { useTheme, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

export const HEADER_HEIGHT = '4rem';
const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;

  min-height: ${HEADER_HEIGHT};
  margin-left: 1rem;
`;

const Header = () => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Container backgroundColor={theme.palette.primary.main}>
      <IconButton onClick={() => history.push('/')}>
        <ArrowBack />
      </IconButton>
    </Container>
  );
};

export default Header;
