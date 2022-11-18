import React, {useContext, useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {config, cores} from '../styles/Estilos';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPen, faBroom} from '@fortawesome/free-solid-svg-icons';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {AuthContext} from '../apis/AuthContext';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import BtnVoltar from '../components/BtnVoltar';

type navigation = {
  props: {
    dadosEntrega: any;
    local: any;
  };
};

const options = {
  enableVibrateFallBack: true,
  ignoreAndroidSystemSettings: true,
};

export default function TelaMapaTrajeto() {
  const store: any = useSelector<any>(({user}) => {
    return {
      user: user,
    };
  });
  const route = useRoute<RouteProp<navigation, 'props'>>();
  const [traject, setTraject] = useState<any>(route.params.dadosEntrega);

  const [regiao, setRegiao] = useState<any>(
    route.params.local
      ? route.params.local
      : {
          latitude: -21.96981,
          latitudeDelta: 0.0922,
          longitude: -46.79850499999999,
          longitudeDelta: 0.0421,
        },
  );
  const [pontos, setPontos] = useState<any>([]);
  const [origem, setOrigem] = useState<any>({
    latitude: -21.969815466912234,
    longitude: -46.793406003040985,
  });
  const [destino, setDestino] = useState<any>({
    latitude: -21.964652345070213,
    longitude: -46.791549417993124,
  });
  const unifae = {
    latitude: -21.964652345070213,
    longitude: -46.791549417993124,
  };
  const unifeob = {
    latitude: -21.969815466912234,
    longitude: -46.793406003040985,
  };

  useEffect(() => {
    pegarLocalizacaoUser();
    recuperaPontos();
  }, []);

  const recuperaPontos = async () => {
    setOrigem({
      latitude: route.params.local.latitude,
      longitude: route.params.local.longitude,
    });
    if (Object.keys(traject).length) {
      setPontos([
        {
          latitude: route.params.local.latitude,
          longitude: route.params.local.longitude,
        },
        ...traject,
      ]);
    } else {
      setPontos(traject);
    }

    setDestino(traject[traject.length - 1]);
  };
  console.log(route.params.local);
  const pegarLocalizacaoUser = () => {
    Geolocation.getCurrentPosition(
      info => {
        setRegiao({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      () => {
        console.log('erro');
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      },
    );
  };

  const Mapa = () => (
    <MapView
      style={styles.map}
      onMapReady={() => {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(() => {
          console.log('aceitou');
        });
      }} // função chamada ao renderizar o mapa
      initialRegion={
        Object.keys(regiao).length !== 0
          ? regiao
          : {
              latitude: -21.96981,
              latitudeDelta: 0.0922,
              longitude: -46.79850499999999,
              longitudeDelta: 0.0421,
            }
      } // região inicial
      //minZoomLevel={14} // minimo de zoom no mapa
      showsUserLocation // mostrar localização do user
      showsMyLocationButton // precisa do Shows userLocation
      userLocationPriority="high" // precisão da localização
      showsCompass // mostra bússola canto superiror esquerdo
      //showsTraffic // mostrar tráfego na região
      // customMapStyle={mapaNoite}// estilo do mapa
      loadingEnabled
      zoomControlEnabled>
      {pontos.length > 0 &&
        pontos.map((item: any, index: number) => {
          return <Marker key={index} coordinate={item} />;
        })}

      {pontos.length >= 2 && (
        <Fragment>
          <Marker
            coordinate={
              Object.keys(origem).length !== 0
                ? origem
                : {
                    latitude: -21.964652345070213,
                    longitude: -46.791549417993124,
                  }
            }
            draggable
            onDragStart={() =>
              ReactNativeHapticFeedback.trigger('impactMedium', options)
            }
            onDragEnd={event => setOrigem(event.nativeEvent.coordinate)}
            image={require('../../assets/imgs/onibusImage.png')}
          />
          <Marker
            coordinate={
              Object.keys(destino).length !== 0
                ? destino
                : {
                    latitude: -21.96981,
                    longitude: -46.79850499999999,
                  }
            }
            draggable
            onDragStart={() =>
              ReactNativeHapticFeedback.trigger('impactMedium', options)
            }
            onDragEnd={event => setDestino(event.nativeEvent.coordinate)}
            pinColor={'pink'}
          />

          <MapViewDirections
            apikey={'AIzaSyCff_T9kaWmUkjKtS37Me0ypoIL--Nxksg'}
            origin={origem}
            waypoints={pontos}
            destination={destino}
            strokeColor="#3399CC" // cor da linha
            strokeWidth={3} // grossura da linha
          />
        </Fragment>
      )}
    </MapView>
  );

  return (
    <View style={{flex: 1}}>
      <BtnVoltar />
      {Mapa()}
    </View>
  );
}

const styles = StyleSheet.create({
  // mapa
  map: {
    width: config.windowWidth,
    height: config.windowHeight,
  },
  // EdicaoMarcadores
  // EdicaoMarcadores
  btnEditarMarcadores: {
    position: 'absolute',
    zIndex: 2,
    top: config.windowWidth / 6,
    right: 10,
  },
  hitSlopPadrao: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
