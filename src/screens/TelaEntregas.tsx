import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { config, cores, estilos } from '../styles/Estilos'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import { FlatList } from 'react-native-gesture-handler'

const ARRAY_PEDIDOS = [
    {
        codPedido: '40029022BR',
        destinatario: 'Senhor Igu Supremo',
        logradouro: 'Rua Thomas Turbano',
        numero: 24,
        bairro: 'centro',
        cidade: 'São João da Boa Vista',
        uf: 'SP'
    },
    {
        codPedido: '40029022BR',
        destinatario: 'Senhor Igu Supremo',
        logradouro: 'Rua Thomas Turbano',
        numero: 24,
        bairro: 'centro',
        cidade: 'São João da Boa Vista',
        uf: 'SP'
    },
    {
        codPedido: '40029022BR',
        destinatario: 'Senhor Igu Supremo',
        logradouro: 'Rua Thomas Turbano',
        numero: 24,
        bairro: 'centro',
        cidade: 'São João da Boa Vista',
        uf: 'SP'
    },
]

export default function TelaEntregas() {
    const navigation = useNavigation<any>()

    const sairApp = () => {
        console.log('saiu do app')
        navigation.goBack()
    }

    // COMPONENTES

    const ListaPedidos = () => (
        <FlatList
            style={{ height: config.windowHeight }}
            data={ARRAY_PEDIDOS}
            //ListEmptyComponent={RenderListaVazia}
            //initialNumToRender={7}
            //onEndReached={() => (!loaderPaginacao && !loaderReq && !loaderRefresh) && fazerPaginacao(idFiltro.current)}
            //onEndReachedThreshold={0.2}
            //onRefresh={() => !loaderReq && didMount(true)}
            //refreshing={loaderRefresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity>
                        <Text>{item.destinatario}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )

    return (
        <View style={estilos.containerPrincipal}>
            <NavBar titulo={'Lista de Entregas'} icone={faArrowRightFromBracket} funcBtn={() => sairApp()} />
            {ListaPedidos()}
        </View>
    )
}

const styles = StyleSheet.create({

})