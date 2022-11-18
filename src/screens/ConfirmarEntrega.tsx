import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {config, cores, estilos} from '../styles/Estilos';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../apis/AuthContext';
import img from '../../assets/imgs/qrcode.jpg';

type navigation = {
  props: {
    dadosEntrega: any;
  };
};

export default function ConfirmarEntrega() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<navigation, 'props'>>();
  const imagem = Image.resolveAssetSource(img);
  const {completeDelivery} = useContext(AuthContext);

  const complete = (id: string) => {
    const object = {deliveryId: id, file: imagem};
    completeDelivery(object);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.containerAlert}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faXmark}
            size={config.windowWidth / 12}
            color={cores.fontePadrao}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              width: config.windowWidth / 1.5,
              height: config.windowWidth / 1.5,
              backgroundColor: cores.disabled,
            }}
            source={{
              uri: 'https://br.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              complete(route.params.dadosEntrega?.id);
            }}
            style={styles.btnConfirmarEntrega}>
            <Text style={styles.txtBtn}>Confirmar Entrega</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAlert: {
    width: config.windowWidth / 1.5,
    borderRadius: 7,
    backgroundColor: cores.backgroundPadrao,
    padding: 10,
    overflow: 'hidden',
  },
  btnConfirmarEntrega: {
    backgroundColor: cores.azul,
    padding: 10,
    borderRadius: 20,
  },
  txtBtn: {
    color: cores.backgroundPadrao,
    fontWeight: 'bold',
  },
});
