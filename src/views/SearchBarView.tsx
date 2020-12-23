import React, { useCallback } from 'react'

import { View, StyleSheet, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    onSearching: (text: string) => void
}

// eslint-disable-next-line no-undef
let timeoutId: NodeJS.Timer

// eslint-disable-next-line no-undef
export default function SearchBarView(props: Props): JSX.Element {
    const onChangeText = useCallback(
        (text: string): void => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                props.onSearching(text)
                clearTimeout(timeoutId)
            }, 500)
        },
        [props],
    )
    return (
        <View style={styles.container}>
            <Icon name="search" />
            <TextInput style={styles.textInput} onChangeText={onChangeText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
    },
})
