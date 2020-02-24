/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';

import App from './src/routes';

import './src/config/ReactotronConfig';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
