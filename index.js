import { AppRegistry } from 'react-native';
import App from './src/Router';
import { name as appName } from './app.json';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/screens/PopUpErroGenerico'
const Redux = () => {
    return (
        <>
         <App />
        <Toast config={toastConfig}/> 
        </>
    )
}

AppRegistry.registerComponent(appName, () => Redux);
