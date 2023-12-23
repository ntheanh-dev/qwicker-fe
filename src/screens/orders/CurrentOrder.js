import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CurrentOrder = ({ index }) => {
    const navigation = useNavigation()
    console.log(index)
    return (
        <View>
            <Text>CurrentOrder</Text>
        </View>
    )
}

export default CurrentOrder