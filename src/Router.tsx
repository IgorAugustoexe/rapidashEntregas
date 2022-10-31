import React from 'react'
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TelaLoginCadastro from './screens/TelaLoginCadastro'
import TelaEntregas from './screens/TelaEntregas'
import TelaDetalhesEntrega from './screens/TelaDetalhesEntrega'
import ConfirmarEntrega from './screens/ConfirmarEntrega'
import { useSelector } from 'react-redux'
import TelaEntregasDisponiveis from './screens/TelaEntregasDisponiveis'
import ModalErro from './components/ModalErro';

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notification by message

const Stack = createStackNavigator()

export default function App() {
    const store: any = useSelector<any>(({ user }) => {
        return {
            user: user
        }
    })
    //Usar o token guardado na store para validar o usuario
    //Caso logado, ir para home
    //Caso deslogado, ir para login/registrar
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {store.user.access_token ?
                    <>
                        <Stack.Screen
                            name="entregas"
                            component={TelaEntregas}
                        />
                        <Stack.Screen
                            name="disponiveis"
                            component={TelaEntregasDisponiveis}
                        />
                        <Stack.Screen
                            name="detalhesEntrega"
                            component={TelaDetalhesEntrega}
                        />
                        <Stack.Screen
                            name="confirmarEntrega"
                            component={ConfirmarEntrega}
                            options={{
                                presentation: 'transparentModal',
                                animationEnabled: true,
                                cardOverlayEnabled: true
                            }}
                        />
                        <Stack.Screen
                            name="modalerro"
                            component={ModalErro}
                            options={{
                                presentation: 'transparentModal',
                                animationEnabled: true,
                                cardOverlayEnabled: true
                            }}
                        />
                    </>
                    :
                    <>
                        <Stack.Screen
                            name="loginCadastro"
                            component={TelaLoginCadastro}
                        />
                    </>

                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}