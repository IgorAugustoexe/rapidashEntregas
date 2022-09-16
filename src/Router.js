import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TelaLoginCadastro from './screens/TelaLoginCadastro'
import { AuthProvider } from './apis/AuthContext'

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
            </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
    )
}