import App from './src/App';
import { AppIcon } from './icon';

const defaultLanguage = 'en';
const localizedAppName = {
  en: 'Identity',
};

interface Settings {
  language: 'en';
}

export const path = '/ox_identityapp';
export default (settings: Settings) => ({
  id: 'ox_identityapp',
  path,
  nameLocale: localizedAppName[settings?.language ?? defaultLanguage],
  color: '#fff',
  backgroundColor: '#a6c8ff',
  icon: AppIcon,
  app: App,
});
