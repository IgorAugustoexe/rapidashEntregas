import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthProvider } from './apis/AuthContext'
import TelaLoginCadastro from './screens/TelaLoginCadastro'
import TelaEntregas from './screens/TelaEntregas'


const Stack = createStackNavigator()

export default function App() {
    //Usar o token guardado na store para validar o usuario
    //Caso logado, ir para home
    //Caso deslogado, ir para login/registrar
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="loginCadastro"
                        component={TelaLoginCadastro}
                    />
                    <Stack.Screen
                        name="entregas"
                        component={TelaEntregas}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}