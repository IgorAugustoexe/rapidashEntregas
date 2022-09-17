import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { config, cores } from '../styles/Estilos'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Props = {
    titulo: string
    icone: IconDefinition
    funcBtn?: () => void
}

export default function NavBar({ titulo, icone, funcBtn }: Props) {
    const navigation = useNavigation<any>()
    return (
        <View style={styles.navBar}>
            <View style={styles.icone}>
                <TouchableOpacity onPress={() => funcBtn ? funcBtn() : navigation.goBack()}>
                    <FontAwesomeIcon icon={icone} size={config.windowWidth / 12} color={cores.vermelho} />
                </TouchableOpacity>
            </View>
            <Text style={styles.titulo}>{titulo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        backgroundColor: cores.laranjaPrimario,
        paddingVertical: 13,
        justifyContent: 'center'
    },
    icone: {
        position: 'absolute',
        left: 15,
        alignSelf: 'center'
    },
    titulo: {
        fontSize: 20,
        color: cores.vermelho,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})