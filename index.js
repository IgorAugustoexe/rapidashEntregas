import { AppRegistry } from 'react-native';
import App from './src/Router';
import { name as appName } from './app.json';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/screens/PopUpErroGenerico'
import { AuthProvider } from './src/apis/AuthContext'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'


const Redux = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                    <Toast config={toastConfig} />
                </PersistGate>
            </AuthProvider>
        </Provider>

    )
}

AppRegistry.registerComponent(appName, () => Redux);
