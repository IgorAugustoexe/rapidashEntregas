import React, { Fragment, useState, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { config, cores, estilos } from '../styles/Estilos'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightFromBracket, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import { AuthContext } from '../apis/AuthContext'

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
        codPedido: '40028923BR',
        destinatario: 'Dedé Rei Delas',
        logradouro: 'Rua Oliver Batista',
        numero: 40,
        bairro: 'Bairro Primavera',
        cidade: 'Aguaí',
        uf: 'SP'
    },
    {
        codPedido: '40028924BR',
        destinatario: 'Caio de Cria',
        logradouro: 'Avenida Dom Pedro II',
        numero: 55,
        bairro: 'Bairro Vila Nova',
        cidade: 'Águas da Prata',
        uf: 'SP'
    },
    {
        codPedido: '40028925BR',
        destinatario: 'Amelia Aparecida Magalhaes',
        logradouro: 'Rua Goiás',
        numero: 210,
        bairro: 'Itaguá',
        cidade: 'Ubatuba',
        uf: 'SP'
    },
    {
        codPedido: '40028926BR',
        destinatario: 'José Bonifácio',
        logradouro: 'Rua Dois Turbano',
        numero: 69,
        bairro: 'Santa Mônica',
        cidade: 'Bandeira do Sul',
        uf: 'MG'
    },
    {
        codPedido: '40028927BR',
        destinatario: 'Claudia Leite',
        logradouro: 'Avenida Brasil',
        numero: 99,
        bairro: 'Aphaville',
        cidade: 'Poços de Caldas',
        uf: 'MG'
    },
    {
        codPedido: '40028927BR',
        destinatario: 'Adriana Lanches',
        logradouro: 'Rua Nove',
        numero: 55,
        bairro: 'Na Fae Confia',
        cidade: 'Jundiaí',
        uf: 'SP'
    }
]

export default function TelaEntregas() {
    const navigation = useNavigation<any>()

    const [loaderReq, setLoaderReq] = useState<boolean>(false)
    const [erroReq, setErroReq] = useState<boolean>(false)

    const { logout} = useContext(AuthContext)


    const sairApp = () => {
        console.log('saiu do app')
        logout()
    }

    const abrirDetalhesPedido = (dadosEntrega: object) => {
        navigation.navigate('detalhesEntrega', { dadosEntrega })
    }

    // COMPONENTES

    const ListaVazia = () => (
        <View style={{ alignItems: 'center', marginTop: config.windowWidth / 2 }}>
            {!loaderReq ? <Text style={styles.txtListaVazia}>Você não possui nenhuma entrega</Text>
                :
                null
            }
        </View>
    )

    const ListaPedidos = () => (
        <FlatList
            style={{ height: config.windowHeight }}
            data={ARRAY_PEDIDOS}
            ListFooterComponent={<View style={{ marginBottom: config.windowWidth / 25 }} />}
            ListEmptyComponent={ListaVazia}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity style={styles.containerPedido} onPress={() => abrirDetalhesPedido(item)}>
                        <View style={{ width: '90%' }}>
                            <Text style={{ color: cores.azul, fontWeight: '700' }}>#{item.codPedido}</Text>
                            <Text style={{ color: cores.fontePadrao }}>{item.destinatario}</Text>
                            <Text style={{ color: cores.fontePadrao }}>{item.logradouro}, {item.numero}</Text>
                            <Text style={{ color: cores.fontePadrao }}>{item.bairro} - {item.cidade} / {item.uf}</Text>
                        </View>
                        <View style={{ width: '10%', alignSelf: 'center' }}>
                            <FontAwesomeIcon icon={faAngleRight} size={config.windowWidth / 12} color={cores.fontePadrao} />
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )

    const ErroLoader = () => (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {loaderReq ?
                <ActivityIndicator color={cores.laranjaPrimario} size={'large'} />
                :
                <View style={styles.containerErroReq}>
                    <Text style={[styles.txtErroReq, { fontWeight: 'bold' }]}>Erro ao carregar a página</Text>
                    <Text style={styles.txtErroReq}>Por favor verifique sua conexão com a internet e tente novamente.</Text>
                    <TouchableOpacity style={styles.btnErroReq}>
                        <Text style={styles.txtBtn}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )

    return (
        <View style={estilos.containerPrincipal}>
            <NavBar titulo={'Lista de Entregas'} icone={faArrowRightFromBracket} funcBtn={() => sairApp()} />
            {(erroReq || loaderReq) ?
                <ErroLoader />
                :
                ListaPedidos()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerPedido: {
        flexDirection: 'row',
        marginTop: config.windowWidth / 30,
        marginHorizontal: config.windowWidth / 25,
        backgroundColor: 'rgba(255, 156, 24, 0.7)',
        padding: 10,
        borderRadius: 10
    },
    containerErroReq: {
        alignSelf: 'center',
        backgroundColor: cores.laranjaTerciario,
        padding: 15,
        borderRadius: 15
    },
    txtErroReq: {
        textAlign: 'center',
        color: cores.backgroundPadrao
    },
    btnErroReq: {
        alignSelf: 'center',
        backgroundColor: cores.laranjaPrimario,
        padding: 10,
        borderRadius: 20,
        marginTop: 10
    },
    txtBtn: {
        fontSize: 16,
        color: cores.backgroundPadrao,
        fontWeight: 'bold'
    },
    txtListaVazia: {
        fontSize: 14,
        color: cores.fontePadrao,
        fontWeight: 'bold'
    }
})