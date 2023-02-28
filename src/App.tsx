import React, { useState } from 'react';
import { NuiProvider, useNuiEvent } from 'react-fivem-hooks';
import { NavLink, useLocation, Route } from 'react-router-dom';
import styled from 'styled-components';
import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import { Theme, StyledEngineProvider, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import ThemeSwitchProvider from './ThemeSwitchProvider';
import { CreditCard, HomeRounded, InfoRounded, People, Person } from '@mui/icons-material';
import Home from './pages/home';
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
        <Container square elevation={0} id="modalContainer">
          <Header />
          <Content>
            <Route exact path={path}>
              <Home />
            </Route>
          </Content>

          <BottomNavigation value={page} onChange={handleChange} showLabels>
            <BottomNavigationAction label={'Me'} value={path} component={NavLink} icon={<Person />} to={path} />
            <BottomNavigationAction
              label={'Licenses'}
              value="licenses"
              color="secondary"
              component={NavLink}
              icon={<CreditCard />}
              to={`${path}/licenses`}
            />
            <BottomNavigationAction
              label={'Shared'}
              value="shared"
              color="secondary"
              component={NavLink}
              icon={<People />}
              to={`${path}/shared`}
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
