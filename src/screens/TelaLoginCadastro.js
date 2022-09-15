import React, { Fragment, useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, Animated } from 'react-native'
import { config, cores, estilos } from '../styles/Estilos'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faIdCard, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputMask } from 'react-native-masked-text'

export default function TelaLoginCadastro() {
    const navigation = useNavigation()

    const sliceAnimation = useRef(new Animated.Value(-400)).current

    const [cadastro, setCadastro] = useState(false)
    const [loaderBtn, setLoaderBtn] = useState(false)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginSenha, setLoginSenha] = useState('')

    const [cadastroEmail, setCadastroEmail] = useState('')
    const [cadastroSenha, setCadastroSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [nome, setNome] = useState('')

    const [loginEmailInvalido, setLoginEmailInvalido] = useState(false)
    const [loginSenhaInvalida, setLoginSenhaInvalida] = useState(false)

    const [cadastroEmailInvalido, setCadastroEmailInvalido] = useState(false)
    const [cadastroSenhaInvalida, setCadastroSenhaInvalida] = useState(false)
    const [cpfInvalido, setCpfInvalido] = useState(false)
    const [nomeInvalido, setNomeInvalido] = useState(false)

    useEffect(() => {
        didMount()
    }, [])

    const didMount = () => {
    }

    const controleSessao = () => {
        setCadastro(!cadastro)
        if (cadastro) {
            Animated.timing(sliceAnimation, {
                toValue: -400, duration: 750,
                useNativeDriver: false
            }).start()
            return
        }
        Animated.timing(sliceAnimation, {
            toValue: 0, duration: 750,
            useNativeDriver: false
        }).start()
    }

    controleLoginCadastro = () => {
        setLoaderBtn(true)
        if (cadastro) {
            fazerCadastro()
            return
        }
        fazerLogin()
    }

    const fazerCadastro = () => {
        console.log('implementar cadastro')
    }

    const fazerLogin = () => {
        console.log('implementar login')
    }

    const Cabecalho = () => (
        <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Image
                source={require('../../assets/imgs/rapidashLogo.png')}
                style={{ width: 150, height: 150 }}
            />
            <Image
                source={require('../../assets/imgs/logo.png')}
                style={{ width: 300, height: 35 }}
            />
        </View>
    )

    const InputsLogin = () => (
        <View style={{ marginHorizontal: config.windowWidth / 10 }}>
            <View style={{ marginTop: config.windowWidth / 20 }}>
                <Text style={styles.txtInput}>Email</Text>
                <TextInput
                    value={loginEmail}
                    onChangeText={(text) => setLoginEmail(text)}
                    style={[styles.inputLogin, loginEmailInvalido && { borderColor: cores.vermelho }]}
                    onFocus={loginEmailInvalido && setLoginEmailInvalido(false)}
                    placeholder={'Digite seu Email'}
                    placeholderTextColor={cores.cinzaEscuro}
                />
                <FontAwesomeIcon icon={faEnvelope} size={config.windowWidth / 17} color={cores.cinzaEscuro} style={styles.iconeInput} />
                {loginEmailInvalido && <Text style={styles.txtErro}>Email Inválido</Text>}
            </View>
            <View style={{ marginTop: config.windowWidth / 20 }}>
                <Text style={styles.txtInput}>Senha</Text>
                <TextInput
                    value={loginSenha}
                    style={[styles.inputLogin, loginSenhaInvalida && { borderColor: cores.vermelho }]}
                    onFocus={loginSenhaInvalida && setLoginSenhaInvalida(false)}
                    onChangeText={(text) => setLoginSenha(text)}
                    placeholder={'Digite sua Senha'}
                    placeholderTextColor={cores.cinzaEscuro}
                />
                <FontAwesomeIcon icon={faKey} size={config.windowWidth / 17} color={cores.cinzaEscuro} style={styles.iconeInput} />
                {loginSenhaInvalida && <Text style={styles.txtErro}>Senha Inválida</Text>}
            </View>
        </View >
    )

    const Rodape = () => (
        <View style={styles.containerRodape}>
            <View style={{ marginVertical: config.windowWidth / 15 }}>
                <TouchableOpacity
                    style={[styles.bntRodape, cadastro && { backgroundColor: cores.azul }]}
                    activeOpacity={1}
                    disabled={loaderBtn}
                    onPress={() => controleLoginCadastro()}
                >
                    {loaderBtn ?
                        <ActivityIndicator size={'small'} color={cores.backgroundPadrao} style={{ paddingVertical: 16.5 }} />
                        :
                        <Text style={styles.txtBtn}>{cadastro ? 'Cadastrar' : 'Entrar'}</Text>
                    }

                </TouchableOpacity>
            </View>
            <Text style={styles.txtRodape}>{cadastro ? 'Já tem uma conta?' : 'Novo por aqui?'}
                <Text style={{ color: cadastro ? cores.laranjaPrimario : cores.azul }} onPress={() => controleSessao()} disabled={loaderBtn}> {cadastro ? 'Faça Login' : 'Crie sua Conta'}</Text>
            </Text>
        </View>
    )

    const SessaoCadastro = () => (
        <Fragment>
            <Animated.View style={[styles.containerSessaoCadastro, { transform: [{ translateY: sliceAnimation }] }]}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/imgs/logo.png')}
                        style={{ width: 350, height: 35 }}
                    />
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>Email</Text>
                        <TextInput
                            value={cadastroEmail}
                            onChangeText={(text) => setCadastroEmail(text)}
                            style={[styles.inputCadastro, cadastroEmailInvalido && { borderColor: cores.vermelho }]}
                            onFocus={cadastroEmailInvalido && setCadastroEmailInvalido(false)}
                            placeholder={'Digite seu Email'}
                            placeholderTextColor={cores.cinzaEscuro}
                        />
                        <FontAwesomeIcon icon={faEnvelope} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {cadastroEmailInvalido && <Text style={styles.txtErro}>Email Invalido</Text>}
                    </View>
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>Senha</Text>
                        <TextInput
                            value={cadastroSenha}
                            onChangeText={(text) => setCadastroSenha(text)}
                            style={[styles.inputCadastro, cadastroSenhaInvalida && { borderColor: cores.vermelho }]}
                            onFocus={cadastroSenhaInvalida && setCadastroSenhaInvalida(false)}
                            placeholder={'Digite sua Senha'}
                            placeholderTextColor={cores.cinzaEscuro}
                        />
                        <FontAwesomeIcon icon={faKey} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {cadastroSenhaInvalida && <Text style={styles.txtErro}>Email Invalido</Text>}
                    </View>
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>Nome Completo</Text>
                        <TextInput
                            value={nome}
                            onChangeText={(text) => setNome(text)}
                            style={[styles.inputCadastro, nomeInvalido && { borderColor: cores.vermelho }]}
                            onFocus={nomeInvalido && setNomeInvalido(false)}
                            placeholder={'Digite seu Nome'}
                            placeholderTextColor={cores.cinzaEscuro}
                        />
                        <FontAwesomeIcon icon={faUser} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {nomeInvalido && <Text style={styles.txtErro}>Nome Inválido</Text>}
                    </View>
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>CPF</Text>
                        <TextInputMask
                            type={'cpf'}
                            value={cpf}
                            onChangeText={(text) => setCpf(text)}
                            style={[styles.inputCadastro, cpfInvalido && { borderColor: cores.vermelho }]}
                            onFocus={cpfInvalido && setCpfInvalido(false)}
                            placeholder={'Digite seu CPF'}
                            placeholderTextColor={cores.cinzaEscuro}
                            maxLength={14}
                        />
                        <FontAwesomeIcon icon={faIdCard} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {cpfInvalido && <Text style={styles.txtErro}>CPF Inválido</Text>}
                    </View>
                </View>
            </Animated.View>
        </Fragment>
    )

    return (
        <View style={estilos.containerPrincipal}>
            <KeyboardAwareScrollView
                extraHeight={config.windowWidth / 2}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
            >
                <Cabecalho />
                {InputsLogin()}
                {SessaoCadastro()}
                <Rodape />
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    //Cabecalho
    txtTitulo: {
        fontSize: 40,
        color: cores.vermelho,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    //InputsLogin
    txtInput: {
        left: 10,
        fontSize: 14,
        color: cores.laranjaSecundario,
        fontWeight: '700'
    },
    inputLogin: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 5,
        borderColor: cores.laranjaSecundario,
        color: cores.fontePadrao
    },
    iconeInput: {
        position: 'absolute',
        bottom: 8,
        right: 8
    },
    //Rodape
    containerRodape: {
        position: 'relative',
        marginTop: config.windowWidth / 25,
        alignSelf: 'center',
        width: '100%'
    },
    bntRodape: {
        alignItems: 'center',
        backgroundColor: cores.laranjaPrimario,
        marginHorizontal: config.windowWidth / 5,
        borderRadius: 15
    },
    txtBtn: {
        paddingVertical: 13,
        color: cores.backgroundPadrao,
        fontSize: 20,
        fontWeight: 'bold'
    },
    txtRodape: {
        fontSize: 14,
        color: cores.fontePadrao,
        textAlign: 'center'
    },
    //SessaoCadastro
    containerSessaoCadastro: {
        position: 'absolute',
        backgroundColor: cores.laranjaPrimario,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 10,
        paddingBottom: config.windowWidth / 5
    },
    inputCadastro: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderBottomLeftRadius: 5,
        padding: 4,
        borderColor: cores.azul
    },
    txtErro: {
        color: cores.vermelho,
        fontSize: 11,
        position: 'absolute',
        bottom: -15,
        right: 10
    }
})