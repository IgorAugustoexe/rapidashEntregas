import React from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import { cores } from '../styles/Estilos'

export default function TelaTeste() {

    const ComponenteAux = () => (
        <View style={styles.container}>
            <Text style={{ color: '#f00', fontSize: 15 }}>Componente Auxiliar</Text>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.textoPadrao}>Dale</Text>
                <ComponenteAux />
            </View>
        </SafeAreaView>
    )
}

const estilosPrincipais = StyleSheet.create({
    container: {
        backgroundColor: cores.backgroundPadrao
    }
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoPadrao: {
        fontSize: 20,
        color: '#000'
    }
})