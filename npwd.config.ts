import App from './src/App';
import { AppIcon, NotificationIcon } from './icon';

const defaultLanguage = 'en';
const localizedAppName = {
  en: 'Identity',
};

interface Settings {
  language: 'en';
}

export const path = '/identity';
export const externalAppConfig = (settings: Settings) => ({
  id: 'IDENTITY',
  path,
  nameLocale: localizedAppName[settings?.language ?? defaultLanguage],
  color: '#00315f',
  backgroundColor: '#a6c8ff',
  icon: AppIcon,
  notificationIcon: NotificationIcon,
  app: App,
});

export default externalAppConfig;
