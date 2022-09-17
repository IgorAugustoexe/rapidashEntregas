import React, { useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { config, cores, estilos } from '../styles/Estilos'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'

type navigation = {
    props: {
        dadosEntrega: object,
    }
}

export default function TelaDetalhesEntrega() {
    const navigation = useNavigation<any>()
    const route = useRoute<RouteProp<navigation, 'props'>>()

    const infoEntrega = useRef<any>(route.params.dadosEntrega).current

    const confirmarEntrega = () => {
        navigation.navigate('confirmarEntrega')
    }

    const abrirMapa = () => {
        console.log('mapinha')
    }

    // COMPONENTES

    const DetalhesEntrega = () => (
        <View style={styles.containerDetalhesEntrega}>
            <View style={styles.containerCodPedido}>
                <Text style={styles.txtAzul}>#{infoEntrega.codPedido}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '70%' }}>
                    <Text style={styles.txtAzul}>Destinatário</Text>
                    <Text style={styles.txtPadrao} numberOfLines={1}>{infoEntrega.destinatario}</Text>
                </View>
                <TouchableOpacity style={styles.btnMapa} onPress={() => abrirMapa()}>
                    <FontAwesomeIcon icon={faMapLocationDot} size={config.windowWidth / 12} color={cores.azul} />
                    <Text style={[styles.txtPadrao, { fontSize: 10, color: cores.azul }]}>Ver no Mapa</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.txtAzul}>Endereco</Text>
            <Text style={styles.txtPadrao}>{infoEntrega.logradouro}, {infoEntrega.numero}, {infoEntrega.bairro}</Text>
            <Text style={styles.txtPadrao}>{infoEntrega.cidade} / {infoEntrega.uf}</Text>
            <TouchableOpacity style={styles.btnConfirmar} activeOpacity={0.9} onPress={() => confirmarEntrega()}>
                <Text style={styles.txtBtn}>Confirmar Entrega</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={estilos.containerPrincipal}>
            <NavBar titulo={'Encomenda'} icone={faArrowLeft} />
            <ScrollView>
                <DetalhesEntrega />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerDetalhesEntrega: {
        marginVertical: config.windowWidth / 10,
        marginHorizontal: config.windowWidth / 20,
        backgroundColor: 'rgba(255, 156, 24, 0.7)',
        padding: config.windowWidth / 15,
        borderRadius: 10
    },
    txtAzul: {
        fontSize: 16,
        color: cores.azul,
        fontWeight: 'bold'
    },
    txtPadrao: {
        fontSize: 14,
        color: cores.fontePadrao,
        fontWeight: '700'
    },
    containerCodPedido: {
        position: 'absolute',
        backgroundColor: cores.laranjaSecundario,
        padding: 7,
        top: -20,
        left: 15,
        borderRadius: 5
    },
    btnMapa: {
        width: '30%',
        alignItems: 'center',
        backgroundColor: cores.laranjaSecundario,
        padding: 5,
        borderRadius: 10,
    },
    btnConfirmar: {
        position: 'absolute',
        backgroundColor: cores.azul,
        padding: 10,
        bottom: -25,
        right: 15,
        borderRadius: 10
    },
    txtBtn: {
        fontSize: 16,
        color: cores.backgroundPadrao,
        fontWeight: 'bold'
    }
})