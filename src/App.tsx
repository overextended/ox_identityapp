import React, { useEffect } from 'react';
import { NuiProvider } from 'react-fivem-hooks';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import { Theme, StyledEngineProvider, Paper } from '@mui/material';
import ThemeSwitchProvider from './ThemeSwitchProvider';
import Home from './pages/home/Home';
import Header, { HEADER_HEIGHT } from './components/Header';
import { path } from '../npwd.config';
import './index.css';
import fetchNui from './utils/fetchNui';
import { Character, useSetCharacter } from './atoms/character';
import Footer from './components/Footer';
import Licenses from './pages/licenses/Licenses';

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

  useEffect(() => {
    fetchNui<Character>('getCharacter', null, {
      firstName: 'Michael',
      lastName: 'Jordan',
      gender: 'Male',
      dob: '01/09/1991',
    }).then((data: Character) => {
      setCharacter(data);
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
          </Content>
          <Footer />
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
