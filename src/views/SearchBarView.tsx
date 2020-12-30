import React, { useCallback, useRef } from 'react'

import { View, StyleSheet, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    onSearching: (text: string) => void
}

export default function SearchBarView(props: Props): JSX.Element {
    const timeoutId = useRef<NodeJS.Timer>()
    const onChangeText = useCallback(
        (text: string): void => {
            const clearCurrentTimeout = (): void => {
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current)
                }
            }

            clearCurrentTimeout()
            timeoutId.current = setTimeout(() => {
                console.log(text)
                props.onSearching(text)
                clearCurrentTimeout()
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
