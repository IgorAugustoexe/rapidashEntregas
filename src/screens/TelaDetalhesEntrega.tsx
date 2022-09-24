import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { config, cores, estilos } from '../styles/Estilos'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

type navigation = {
    props: {
        dadosEntrega: object,
    }
}

const options = {
    enableVibrateFallBack: true,
    ignoreAndroidSystemSettings: true
}


export default function TelaDetalhesEntrega() {
    const navigation = useNavigation<any>()
    const route = useRoute<RouteProp<navigation, 'props'>>()

    const infoEntrega = useRef<any>(route.params.dadosEntrega).current

    const [regiao, setRegiao] = useState<any>({})
    const [origem, setOrigem] = useState<any>({ latitude: -21.964768, longitude: -46.791870 })
    const [destino, setDestino] = useState<any>({ latitude: -21.977346, longitude: -46.798710 })

    const confirmarEntrega = () => {
        navigation.navigate('confirmarEntrega')
    }

    const atualizarPosicao = (coordenada: any) => {
        console.log(coordenada)
    }

    // COMPONENTES

    const DetalhesEntrega = () => (
        <View style={styles.containerDetalhesEntrega}>
            <View style={styles.containerCodPedido}>
                <Text style={styles.txtAzul}>#{infoEntrega.codPedido}</Text>
            </View>
            <Text style={styles.txtAzul}>Destinatário</Text>
            <Text style={styles.txtPadrao} numberOfLines={1}>{infoEntrega.destinatario}</Text>
            <Text style={styles.txtAzul}>Endereco</Text>
            <Text style={styles.txtPadrao} numberOfLines={1}>{infoEntrega.logradouro}, {infoEntrega.numero}, {infoEntrega.bairro}</Text>
            <Text style={styles.txtPadrao} numberOfLines={1}>{infoEntrega.cidade} / {infoEntrega.uf}</Text>
            <TouchableOpacity style={styles.btnConfirmar} activeOpacity={0.9} onPress={() => confirmarEntrega()}>
                <Text style={styles.txtBtn}>Confirmar Entrega</Text>
            </TouchableOpacity>
        </View>
    )

    const Mapa = () => (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -21.9650757,
                    longitude: -46.7915971,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} // região inicial
                minZoomLevel={14} // minimo de zoom no mapa
                showsUserLocation // mostrar localização do user
                showsMyLocationButton // precisa do Shows userLocation
                userLocationPriority='high' // precisão da localização
                showsCompass // mostra bússola canto superiror esquerdo
                //showsTraffic // mostrar tráfego na região
                //loadingEnabled
                //onUserLocationChange={(e) => setOrigem(e.nativeEvent.coordinate)}
                zoomEnabled
            >
                <Marker
                    coordinate={origem}
                />
                <Marker
                    coordinate={destino}
                />
                <MapViewDirections
                    apikey={'AIzaSyCff_T9kaWmUkjKtS37Me0ypoIL--Nxksg'}
                    origin={origem}
                    destination={destino}
                    strokeColor="#3399CC" // cor da linha
                    strokeWidth={2} // grossura da linha
                />
            </MapView>
        </View >
    )

    return (
        <View style={estilos.containerPrincipal}>
            <NavBar titulo={'Encomenda'} icone={faArrowLeft} />
            <DetalhesEntrega />
            <Mapa />
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
    },

    container: {
        flex: 1,
        backgroundColor: cores.backgroundPadrao,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    }
})