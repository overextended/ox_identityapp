import App from './src/App';
import { AppIcon } from './icon';

const defaultLanguage = 'en';
const localizedAppName = {
  en: 'APP_NAME',
};

interface Settings {
  language: 'en';
}

export const path = '/npwd_app_template';
export default (settings: Settings) => ({
  id: 'APP_NAME',
  path,
  nameLocale: localizedAppName[settings?.language ?? defaultLanguage],
  color: '#fff',
  backgroundColor: '#333',
  icon: AppIcon,
  app: App,
});
