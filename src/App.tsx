import React from 'react';
import { NuiProvider } from 'react-fivem-hooks';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { IPhoneSettings } from '@npwd/types';
import { i18n } from 'i18next';
import { Theme, StyledEngineProvider, Paper } from '@mui/material';
import ThemeSwitchProvider from './ThemeSwitchProvider';
import Home from './pages/home/Home';
import Header, { HEADER_HEIGHT } from './components/Header';
import { path } from '../npwd.config';
import './index.css';
import Footer from './components/Footer';
import Licenses from './pages/licenses/Licenses';
import { RecoilRoot } from 'recoil';
import { RecoilEnv } from 'recoil';
import Shared from './pages/shared/Shared';
import SnackbarProvider from './snackbar/SnackbarProvider';
import { PhoneSnackbar } from './snackbar/PhoneSnackbar';
import LoadingCircle from './components/LoadingCircle';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

// Disable atom warnings due to HMR
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

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
  return (
    <SnackbarProvider>
      <StyledEngineProvider injectFirst>
        <ThemeSwitchProvider mode={props.theme.palette.mode}>
          <PhoneSnackbar />
          <Container square elevation={0} id="modalContainer">
            <Header />
            <Content>
              <Route exact path={path}>
                <React.Suspense fallback={<LoadingCircle />}>
                  <Home />
                </React.Suspense>
              </Route>
              <Route path={`${path}/licenses`}>
                <React.Suspense fallback={<LoadingCircle />}>
                  <Licenses />
                </React.Suspense>
              </Route>
              <Route path={`${path}/shared`}>
                <Shared />
              </Route>
            </Content>
            <Footer />
          </Container>
        </ThemeSwitchProvider>
      </StyledEngineProvider>
    </SnackbarProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <RecoilRoot>
    <NuiProvider>
      <App {...props} />
    </NuiProvider>
  </RecoilRoot>
);

export default WithProviders;
