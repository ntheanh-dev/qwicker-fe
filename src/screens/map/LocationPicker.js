import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const LocationPicker = ({ navigation }) => {
    useEffect(() => {
        navigation.getParent().setOptions({ headerShown: false })
    }, [])
    return (
        <View>
            <Text>LocationPicker</Text>
        </View>
    )
}

export default LocationPicker