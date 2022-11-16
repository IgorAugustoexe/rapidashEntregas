import React, {useEffect, useState, useContext, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {config, cores, estilosGlobais} from '../styles/Estilos';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRightFromBracket,
  faAngleRight,
  faFileCirclePlus,
  faUser,
  faLocationDot,
  faTreeCity,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../components/NavBar';
import {AuthContext} from '../apis/AuthContext';
import Geolocation from '@react-native-community/geolocation';
import ErroReq from '../components/ErroReq';
import {Delivery} from '../types/types';

const PEDIDOS_ENTREGAR = [
  {
    codPedido: '40029022BR',
    destinatario: 'Senhor Igu Supremo',
    logradouro: 'Rua Thomas Turbano',
    numero: 24,
    bairro: 'centro',
    cidade: 'São João da Boa Vista',
    uf: 'SP',
    lat: -21.9720627,
    lon: -46.7962414,
  },
  {
    codPedido: '40028923BR',
    destinatario: 'Dedé Rei Delas',
    logradouro: 'Rua Oliver Batista',
    numero: 40,
    bairro: 'Bairro Primavera',
    cidade: 'Aguaí',
    uf: 'SP',
    lat: -22.059324,
    lon: -46.974024,
  },
  {
    codPedido: '40028924BR',
    destinatario: 'Caio de Cria',
    logradouro: 'Avenida Dom Pedro II',
    numero: 55,
    bairro: 'Bairro Vila Nova',
    cidade: 'Águas da Prata',
    uf: 'SP',
    lat: -22.061227,
    lon: -46.985668,
  },
  {
    codPedido: '40028925BR',
    destinatario: 'Amelia Aparecida Magalhaes',
    logradouro: 'Rua Goiás',
    numero: 210,
    bairro: 'Itaguá',
    cidade: 'Ubatuba',
    uf: 'SP',
    lat: -21.976197,
    lon: -46.790555,
  },
  {
    codPedido: '40028926BR',
    destinatario: 'José Bonifácio',
    logradouro: 'Rua Dois Turbano',
    numero: 69,
    bairro: 'Santa Mônica',
    cidade: 'Bandeira do Sul',
    uf: 'MG',
    lat: -21.727999,
    lon: -46.388802,
  },
  {
    codPedido: '40028927BR',
    destinatario: 'Claudia Leite',
    logradouro: 'Avenida Brasil',
    numero: 99,
    bairro: 'Aphaville',
    cidade: 'Poços de Caldas',
    uf: 'MG',
    lat: -21.780426,
    lon: -46.564275,
  },
  {
    codPedido: '40028927BR',
    destinatario: 'Adriana Lanches',
    logradouro: 'Rua Nove',
    numero: 55,
    bairro: 'Na Fae Confia',
    cidade: 'Jundiaí',
    uf: 'SP',
    lat: -21.731234,
    lon: -46.38517,
  },
];

const PEDIDOS_DISPONIVEIS = [
  {
    codPedido: '42221425BR',
    destinatario: 'Senhor Dale',
    logradouro: 'Rua Nova',
    numero: 222,
    bairro: 'IF',
    cidade: 'São João da Boa Vista',
    uf: 'SP',
    lat: -21.966332,
    lon: -46.812034,
  },
  {
    codPedido: '41563255BR',
    destinatario: 'Renato Carvalho',
    logradouro: 'Rua Doze Treze',
    numero: 50,
    bairro: 'Bairro Nova Gertrudes',
    cidade: 'Poços de Caldas',
    uf: 'MG',
    lat: -22.059324,
    lon: -46.974024,
  },
  {
    codPedido: '2358322358732BR',
    destinatario: 'Teste Dale',
    logradouro: 'Avenida Dom Pedro I',
    numero: 1055,
    bairro: 'Bairro Vila Nova',
    cidade: 'Águas da Prata',
    uf: 'SP',
    lat: -21.938522,
    lon: -46.719006,
  },
  {
    codPedido: '4012515215BR',
    destinatario: 'Fatec São Paulo',
    logradouro: 'Rua Nova Vila',
    numero: 999,
    bairro: 'Luz',
    cidade: 'São Paulo',
    uf: 'SP',
    lat: -23.5295777,
    lon: -46.6347516,
  },
];

const PEDIDOS_ENTREGUES = [
  {
    codPedido: '42221425BR',
    destinatario: 'Senhor Dale',
    logradouro: 'Rua Nova',
    numero: 222,
    bairro: 'IF',
    cidade: 'São João da Boa Vista',
    uf: 'SP',
    lat: -21.966332,
    lon: -46.812034,
  },
];

export default function TelaEntregas() {
  const navigation = useNavigation<any>();

  const [localUser, setLocalUser] = useState<object>({});
  const [loaderReq, setLoaderReq] = useState<boolean>(false);
  const [erroReq, setErroReq] = useState<boolean>(false);
  const [listaPedidos, setListaPedidos] = useState<any>(PEDIDOS_ENTREGAR);
  const [listaSelecionada, setListaSelecionada] = useState<number>(0);

  const {logout, getData} = useContext(AuthContext);
  const [load, setLoad] = useState(true);
  const [entregues, setEntregues] = useState<Delivery[]>([]);
  const [disponiveis, setDisponiveis] = useState<Delivery[]>([]);

  useEffect(() => {
    didMount();
    navigation.addListener('focus', () => setLoad(!load));
  }, [load, navigation]);
  const didMount = async () => {
    if (load) {
      const dt = await getData(`delivery/all`);
      console.log(dt);

      const dtEntregues = dt.filter((d: Delivery) => {
        if (d.delivered) {
          return d;
        }
      });
      const dtDisponiveis = dt.filter((d: Delivery) => {
        if (!d.userId) {
          return d;
        }
      });
      setEntregues([]);
      setEntregues([...dtEntregues]);
      setDisponiveis([]);
      setDisponiveis([...dtDisponiveis]);

      //console.log('Entregues ---- ', JSON.stringify(dtEntregues, null, 2))
      //console.log('Dispoíveis ---- ', JSON.stringify(dtDisponiveis, null, 2))
    }
    pegarPedidos();
    pegarLocalizacaoUser();
  };

  const pegarPedidos = () => {
    // Implementar a requisição
    setLoaderReq(true);
    console.log('lista de pedidos');
    setLoaderReq(false);
  };

  const pegarLocalizacaoUser = () => {
    Geolocation.getCurrentPosition(
      info => {
        setLocalUser({
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

  const abrirDetalhesPedido = (dadosEntrega: object, local: object) => {
    navigation.navigate('detalhesEntrega', {dadosEntrega, local});
  };

  const alternarLista = (valor: number) => {
    switch (valor) {
      case 0:
        setListaSelecionada(0);
        setListaPedidos(PEDIDOS_ENTREGAR);
        break;
      case 1:
        setListaSelecionada(1);
        setListaPedidos(disponiveis);
        break;
      case 2:
        setListaSelecionada(2);
        setListaPedidos(entregues);
        break;
      default:
        break;
    }
  };

  const realizarLogout = () => {
    Alert.alert('Sair do Aplicativo', 'Você realmente deseja sair?', [
      {
        text: 'Sim',
        onPress: () => logout(),
      },
      {text: 'Não'},
    ]);
  };

  // COMPONENTES

  const ListaVazia = () => (
    <View style={{alignItems: 'center', marginTop: config.windowWidth / 2}}>
      {!loaderReq ? (
        <Text style={styles.txtListaVazia}>Você não possui nenhum pedido</Text>
      ) : null}
    </View>
  );

  const ListaPedidos = () => (
    <FlatList
      style={{height: config.windowHeight}}
      data={listaPedidos}
      ListFooterComponent={
        <View style={{marginBottom: config.windowWidth / 25}} />
      }
      ListEmptyComponent={ListaVazia}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            style={[
              styles.containerPedido,
              listaPedidos == PEDIDOS_ENTREGUES && {
                backgroundColor: 'rgba(115, 123, 131,0.5)',
              },
            ]}
            onPress={() => abrirDetalhesPedido(item, localUser)}
            activeOpacity={0.7}
            disabled={listaPedidos == PEDIDOS_ENTREGUES}>
            <View style={{width: '90%'}}>
              <View
                style={[
                  styles.containerIdPedido,
                  listaPedidos == PEDIDOS_ENTREGUES && {
                    backgroundColor: cores.cinzaEscuro,
                  },
                ]}>
                <Text
                  style={[
                    styles.txtIdPedido,
                    listaPedidos == PEDIDOS_ENTREGUES && {
                      color: cores.backgroundPadrao,
                    },
                  ]}>
                  #{item.codPedido ? item.codPedido : '42221425BR'}
                </Text>
              </View>
              <View style={styles.divisorTxts}>
                <FontAwesomeIcon
                  icon={faUser}
                  size={config.windowWidth / 20}
                  color={cores.azul}
                />
                <Text style={styles.txtInfoPedido}>
                  {item.destiny ? item.destiny : 'Glauco Souza'}
                </Text>
              </View>
              <View style={styles.divisorTxts}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size={config.windowWidth / 20}
                  color={cores.azul}
                />
                <Text style={styles.txtInfoPedido}>
                  {item?.address?.street ? item?.address?.street : 'Rua'},
                  {item?.address?.number ? item?.address?.number : ' 66'} -
                  {item?.address?.district ? item?.address?.district : 'Bairro'}
                </Text>
              </View>
              <View style={styles.divisorTxts}>
                <FontAwesomeIcon
                  icon={faTreeCity}
                  size={config.windowWidth / 20}
                  color={cores.azul}
                />
                <Text style={styles.txtInfoPedido}>
                  {item.city ? item.city : 'São João da Boa Vista'} /{' '}
                  {item.state ? item.state : 'SP'}
                </Text>
              </View>
            </View>
            {listaPedidos == PEDIDOS_ENTREGAR && (
              <View style={{width: '10%', alignSelf: 'center'}}>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size={config.windowWidth / 12}
                  color={cores.azul}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );

  const SelecaoPedidos = () => (
    <View style={styles.containerSelecaoPedidos}>
      <TouchableOpacity
        style={[
          styles.btnSelecao,
          listaSelecionada == 0 && {backgroundColor: cores.azul},
        ]}
        onPress={() => alternarLista(0)}
        disabled={listaSelecionada == 0}
        activeOpacity={0.8}>
        <Text style={styles.txtSelecao}>Entregar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btnSelecao,
          listaSelecionada == 2 && {backgroundColor: cores.azul},
        ]}
        onPress={() => alternarLista(2)}
        disabled={listaSelecionada == 2}
        activeOpacity={0.8}>
        <Text style={styles.txtSelecao}>Entregues</Text>
      </TouchableOpacity>
    </View>
  );

  const ErroLoader = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {loaderReq ? (
        <ActivityIndicator color={cores.laranjaPrimario} size={'large'} />
      ) : (
        <ErroReq funcBtn={() => pegarPedidos()} />
      )}
    </View>
  );

  return (
    <View style={estilosGlobais.containerPrincipal}>
      <NavBar
        titulo={'Lista de Entrega'}
        iconeEsq={faArrowRightFromBracket}
        funcBtnEsq={() => realizarLogout()}
        iconeDir={faFileCirclePlus}
        funcBtnDir={() => navigation.navigate('disponiveis')}
      />
      <SelecaoPedidos />
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
    flexDirection: 'row',
    marginTop: config.windowWidth / 10,
    marginHorizontal: config.windowWidth / 25,
    backgroundColor: 'rgba(255, 156, 24, 0.7)',
    paddingTop: config.windowWidth / 15,
    padding: 15,
    borderRadius: 10,
  },
  containerIdPedido: {
    position: 'absolute',
    backgroundColor: cores.laranjaSecundario,
    padding: 8,
    borderRadius: 10,
    top: -config.windowWidth / 9,
  },
  txtIdPedido: {
    color: cores.azul,
    fontWeight: '700',
    fontSize: 18,
  },
  divisorTxts: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  txtInfoPedido: {
    color: cores.fontePadrao,
    fontSize: 16,
    left: 10,
  },
  txtListaVazia: {
    fontSize: 14,
    color: cores.fontePadrao,
    fontWeight: 'bold',
  },
  //SelecaoPedidos
  containerSelecaoPedidos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: cores.laranjaPrimario,
    padding: 10,
  },
  btnSelecao: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '45%',
    backgroundColor: cores.cinzaEscuro,
    borderRadius: 20,
  },
  txtSelecao: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: cores.backgroundPadrao,
    fontSize: 15,
  },
});
