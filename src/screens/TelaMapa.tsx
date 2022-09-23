import React, { useState, useEffect } from 'react'
import { StyleSheet, View, PermissionsAndroid } from 'react-native'
import { cores } from '../styles/Estilos'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import MapViewDirections from 'react-native-maps-directions'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

const options = {
    enableVibrateFallBack: true,
    ignoreAndroidSystemSettings: true
}

export default function TelaMapa() {

    const [regiao, setRegiao] = useState<any>({})

    const [origem, setOrigem] = useState<any>({
        latitude: -21.977346,
        longitude: -46.798710
    })

    const [destino, setDestino] = useState<any>({
        latitude: -21.964768,
        longitude: -46.791870
    })

    useEffect(() => {
        pegarLocalizacaoUser()
    }, [])

    const pegarLocalizacaoUser = () => {
        Geolocation.getCurrentPosition(info => {
            setRegiao({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        },
            () => { console.log('erro') }, {
            enableHighAccuracy: true,
            timeout: 2000
        })
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                onMapReady={() => {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                        .then(() => {
                            console.log('aceitou')
                        })
                }} // função chamada ao renderizar o mapa
                initialRegion={regiao} // região inicial
                //minZoomLevel={14} // minimo de zoom no mapa
                showsUserLocation // mostrar localização do user
                showsMyLocationButton // precisa do Shows userLocation
                userLocationPriority='high' // precisão da localização
                showsCompass // mostra bússola canto superiror esquerdo
                //showsTraffic // mostrar tráfego na região
                loadingEnabled
                zoomEnabled
            >
                <Marker
                    coordinate={origem}
                    draggable
                    //onDragStart={() => ReactNativeHapticFeedback.trigger("impactMedium", options)}
                    onDragEnd={(event) => setOrigem(event.nativeEvent.coordinate)}
                />
                <Marker
                    coordinate={destino}
                    draggable
                    //onDragStart={() => ReactNativeHapticFeedback.trigger("impactMedium", options)}
                    onDragEnd={(event) => setDestino(event.nativeEvent.coordinate)}
                    pinColor={'pink'}
                />

                <MapViewDirections
                    apikey={'AIzaSyCff_T9kaWmUkjKtS37Me0ypoIL--Nxksg'}
                    origin={origem}
                    destination={destino}
                    strokeColor="#3399CC" // cor da linha
                    strokeWidth={3} // grossura da linha
                />
            </MapView>
        </View >
    )
}


const styles = StyleSheet.create({
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