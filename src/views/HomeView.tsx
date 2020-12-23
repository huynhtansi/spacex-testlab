import React, { useEffect, useState, useCallback } from 'react'

import { FlatList, StyleSheet, Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Launch } from 'types/Models'

import SearchBarView from './SearchBarView'
import Item from './launchItem/Item'

const EndPoint = 'https://api.spacexdata.com/v4/launches/upcoming'

type RenderItemProps = {
    index: number
    item: Launch
}

// eslint-disable-next-line no-undef
export default function HomeView(): JSX.Element {
    const inset = useSafeAreaInsets()
    const [data, setData] = useState<Launch[]>([])
    const [searchText, setSearchText] = useState('')

    const performFetch = (): void => {
        fetch(EndPoint)
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                setData(responseJson)
                if (refreshing) {
                    setRefreshing(false)
                }
            })
    }

    const [refreshing, setRefreshing] = useState(false)

    useEffect(performFetch, [refreshing])
    // eslint-disable-next-line no-undef
    const renderItem = ({ item }: RenderItemProps): JSX.Element => {
        return (
            <Item
                onSwipe={(): void => {
                    const newData = [...data]
                    newData.splice(newData.indexOf(item), 1)
                    setData(newData)
                }}
                item={item}
            />
        )
    }

    const onSearching = useCallback((text: string): void => {
        setSearchText(text || '')
    }, [])

    return (
        <>
            <View style={styles.searchContainer}>
                <SearchBarView onSearching={onSearching} />
            </View>
            <FlatList
                data={data.filter((item) => item.name.includes(searchText))}
                renderItem={renderItem}
                contentContainerStyle={[styles.flatListContainer, { paddingBottom: inset.bottom }]}
                ItemSeparatorComponent={
                    // eslint-disable-next-line no-undef
                    (): JSX.Element => <View style={styles.seperator} />
                }
                refreshing={refreshing}
                onRefresh={performFetch}
            />
        </>
    )
}

const styles = StyleSheet.create({
    flatListContainer: {
        paddingBottom: Platform.select({
            android: 16,
            ios: 0,
        }),
        paddingHorizontal: 16,
    },
    searchContainer: {
        padding: 16,
    },
    seperator: {
        height: 24,
    },
})
