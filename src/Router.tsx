import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TelaLoginCadastro from './screens/TelaLoginCadastro'
import TelaEntregas from './screens/TelaEntregas'
import TelaDetalhesEntrega from './screens/TelaDetalhesEntrega'
import ConfirmarEntrega from './screens/ConfirmarEntrega'
import { useSelector } from 'react-redux'
import TelaMapa from './screens/TelaMapa'


const Stack = createStackNavigator()

export default function App() {
    const store = useSelector(({ user }) => {
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
                        name="detalhesEntrega"
                        component={TelaDetalhesEntrega}
                    />
                    <Stack.Screen
                        name="mapa"
                        component={TelaMapa}
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