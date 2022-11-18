import React, {useEffect, useState, useContext, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {config, cores, estilosGlobais} from '../styles/Estilos';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faLocationDot,
  faTreeCity,
  faTruck,
  faTruckFast,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../components/NavBar';
import ErroReq from '../components/ErroReq';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../apis/AuthContext';
import {Delivery} from '../types/types';

const PEDIDOS_ENTREGUES = [
  {
    destinatario: 'Igor Augusto',
    logradouro: 'Rua Pereira Machado',
    numero: 15,
    bairro: 'Centro',
    cidade: 'São João da Boa Vista',
    uf: 'SP',
  },
  {
    destinatario: 'Caio Soares',
    logradouro: 'Rua 1',
    numero: 20,
    bairro: 'Centro',
    cidade: 'Aguaí',
    uf: 'SP',
  },
  {
    destinatario: 'André Luiz',
    logradouro: 'Rua 10',
    numero: 10,
    bairro: 'Centro',
    cidade: 'Aguaí',
    uf: 'SP',
  },
];

export default function TelaEntregasDisponiveis() {
  const navigation = useNavigation<any>();

  const [loaderReq, setLoaderReq] = useState<boolean>(false);
  const [erroReq, setErroReq] = useState<boolean>(false);
  const [loaderBtnIndex, setLoaderBtnIndex] = useState<number>();
  const [listaPedidos, setListaPedidos] = useState<any>(PEDIDOS_ENTREGUES);
  const {logout, getData, assignDelivery} = useContext(AuthContext);
  const [load, setLoad] = useState(true);
  const [disponiveis, setDisponiveis] = useState<Delivery[]>([]);

  useEffect(() => {
    if (load) {
      didMount();
    }
  }, []);

  const didMount = async () => {
    try {
      const dt = await getData(`delivery/available`);
      setDisponiveis([]);
      setDisponiveis([...dt]);
    } catch (e) {
      console.log(e);
    }

    //console.log('Entregues ---- ', JSON.stringify(dtEntregues, null, 2))
    //console.log('Dispoíveis ---- ', JSON.stringify(dtDisponiveis, null, 2))

    pegarPedidos();
    pegarPedidosDisp();
  };

  const pegarPedidos = () => {
    // Implementar a requisição
    setLoaderReq(true);
    console.log('lista de pedidos');
    setLoaderReq(false);
  };

  const pegarPedidosDisp = () => {
    // Implementar requisição
    console.log('pedidos Disponiveis');
  };

  useEffect(() => {
    didMount();
    navigation.addListener('focus', () => setLoad(!load));
  }, [load, navigation]);

  const abrirModalConfirmacao = (index: number, id: string) => {
    navigation.navigate('modalerro', {
      icone: faTruck,
      texto: 'Deseja aceitar o pedido?',
      btnTxt: 'não',
      btn2Txt: 'sim',
      btn2Func: () => aceitarPedido(index, id),
    });
  };

  const aceitarPedido = (index: number, id: string) => {
    setLoaderBtnIndex(index);
    assignDelivery(id);
    didMount();
    setLoaderBtnIndex(undefined);
    // Implementar requisição
  };

  // COMPONENTES

  const ListaVazia = () => (
    <View style={{alignItems: 'center', marginTop: config.windowWidth / 2}}>
      {!loaderReq ? (
        <Text style={estilosGlobais.txtListaVazia}>
          Você não possui nenhum pedido
        </Text>
      ) : null}
    </View>
  );
  const ListaPedidos = () => (
    <FlatList
      style={{height: config.windowHeight}}
      data={disponiveis}
      ListFooterComponent={
        <View style={{marginBottom: config.windowWidth / 25}} />
      }
      ListEmptyComponent={ListaVazia}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <View style={styles.containerPedido}>
            <View style={{padding: 15}}>
              <View style={styles.divisorTxts}>
                <FontAwesomeIcon
                  icon={faUser}
                  size={config.windowWidth / 20}
                  color={cores.azul}
                />
                <Text
                  style={[
                    styles.txtInfoPedido,
                    {fontWeight: 'bold', fontSize: 20},
                  ]}>
                  {item.destiny}
                </Text>
              </View>
              <View style={styles.divisorTxts}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size={config.windowWidth / 20}
                  color={cores.azul}
                />
                <Text style={styles.txtInfoPedido}>
                  {item.address.street}, {item.address.number}
                </Text>
              </View>
              <View style={styles.divisorTxts}>
                <FontAwesomeIcon
                  icon={faTreeCity}
                  size={config.windowWidth / 20}
                  color={cores.azul}
                />
                <Text style={styles.txtInfoPedido}>
                  {item.address.district} - {item.address.city} /{' '}
                  {item.address.state}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnAceitarPedido}
              onPress={() => abrirModalConfirmacao(index, item.id)}
              disabled={loaderBtnIndex != null}>
              {loaderBtnIndex == index ? (
                <ActivityIndicator
                  size={'small'}
                  color={cores.backgroundPadrao}
                  style={{paddingVertical: 2}}
                />
              ) : (
                <Text style={styles.txtBtn}>ACEITAR PEDIDO</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );

  const ErroLoader = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {loaderReq ? (
        <ActivityIndicator color={cores.laranjaPrimario} size={'large'} />
      ) : (
        <ErroReq funcBtn={() => pegarPedidosDisp()} />
      )}
    </View>
  );

  return (
    <View style={estilosGlobais.containerPrincipal}>
      <NavBar titulo={'Entregas Disponíveis'} iconeEsq={faArrowLeft} />
      {erroReq || loaderReq ? (
        <ErroLoader />
      ) : (
        <Fragment>{ListaPedidos()}</Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerPedido: {
    marginTop: config.windowWidth / 15,
    marginHorizontal: config.windowWidth / 25,
    backgroundColor: 'rgba(255, 156, 24, 0.7)',
    borderRadius: 10,
  },
  divisorTxts: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  txtInfoPedido: {
    color: cores.fontePadrao,
    fontSize: 18,
    left: 10,
  },
  btnAceitarPedido: {
    alignItems: 'center',
    backgroundColor: cores.azul,
    paddingVertical: 7,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  txtBtn: {
    fontWeight: 'bold',
    fontSize: 18,
    color: cores.backgroundPadrao,
  },
});
