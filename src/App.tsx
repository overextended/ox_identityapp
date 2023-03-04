import React, { useEffect } from 'react';
import { NuiProvider, useNuiEvent } from 'react-fivem-hooks';
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
import fetchNui from './utils/fetchNui';
import { Character, useSetCharacter } from './atoms/character';
import { RecoilEnv } from 'recoil';
import { useSetLicenses } from './atoms/licenses';
import Shared from './pages/shared/Shared';

// Disable atom warnings due to HMR
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

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
  const setCharacter = useSetCharacter();
  const setLicenses = useSetLicenses();

  useEffect(() => {
    fetchNui<{ character: Character; licenses: Record<string, { issued: string }> }>('openApp', null, {
      character: {
        firstName: 'Trevor',
        lastName: 'Phillips',
        dob: '01/02/1990',
        gender: 'Male',
      },
      licenses: {
        driving: {
          issued: '04/03/2023',
        },
        hunting: {
          issued: '23/01/2023',
        },
      },
    }).then((data) => {
      setCharacter(data.character);
      if (!data.licenses) return;
      setLicenses(Object.entries(data.licenses));
    });
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeSwitchProvider mode={props.theme.palette.mode}>
        <Container square elevation={0} id="modalContainer">
          <Header />
          <Content>
            <Route exact path={path}>
              <Home />
            </Route>
            <Route path={`${path}/licenses`}>
              <Licenses />
            </Route>
            <Route path={`${path}/shared`}>
              <Shared />
            </Route>
          </Content>
          <Footer />
        </Container>
      </ThemeSwitchProvider>
    </StyledEngineProvider>
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
