import React, { useState } from 'react';
import { NuiProvider, useNuiEvent } from 'react-fivem-hooks';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import {
  Theme,
  StyledEngineProvider,
  Paper,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import ThemeSwitchProvider from './ThemeSwitchProvider';
import { CreditCard, HomeRounded, InfoRounded, People, Person } from '@mui/icons-material';
import Header, { HEADER_HEIGHT } from './components/Header';
import { path } from '../npwd.config';
import './index.css';

const Container = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.5rem;
  max-height: calc(100% - 3.5rem - ${HEADER_HEIGHT});
  overflow: auto;
  font-family: 'Roboto', serif;
`;

interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(pathname);

  const handleChange = (_e: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeSwitchProvider mode={props.theme.palette.mode}>
        <Container square elevation={0}>
          <Header />
          <Content>
            <Typography fontSize={28} fontFamily="Noto Sans" mb={2}>
              Your Identity
            </Typography>
            <Card>
              <CardContent>
                <Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <Typography fontSize={12} color="#A6A7AB">
                        First name
                      </Typography>
                      <Typography fontSize={20} fontFamily="Noto Sans">
                        Michael
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize={12} color="#A6A7AB">
                        Last name
                      </Typography>
                      <Typography fontSize={20} fontFamily="Noto Sans">
                        Jordan
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize={12} color="#A6A7AB">
                        Date of birth
                      </Typography>
                      <Typography fontSize={20} fontFamily="Noto Sans">
                        01/01/1992
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontSize={12} color="#A6A7AB">
                        Gender
                      </Typography>
                      <Typography fontSize={20} fontFamily="Noto Sans">
                        Male
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Button variant="contained" startIcon={<People />} sx={{ marginTop: 2 }}>
              Share identity
            </Button>
          </Content>

          <BottomNavigation value={page} onChange={handleChange} showLabels>
            <BottomNavigationAction label={'Me'} value="/home" component={NavLink} icon={<Person />} to={path} />
            <BottomNavigationAction
              label={'Licenses'}
              value="/licenses"
              color="secondary"
              component={NavLink}
              icon={<CreditCard />}
              to={path}
            />
            <BottomNavigationAction
              label={'Shared'}
              value="/shared"
              color="secondary"
              component={NavLink}
              icon={<People />}
              to={path}
            />
          </BottomNavigation>
        </Container>
      </ThemeSwitchProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
