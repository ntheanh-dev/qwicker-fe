import { View, Text } from 'react-native'
import React from 'react'

const CustomBottomTabbarItem = (focused) => {
    return (
        <Text
            className="text-sm mb-3 font-normal bg-gray"
            style={{ color: focused ? '#3422F1' : 'rgb(75, 85, 99)' }}
        >Nhan hang</Text>
    )
}

export default CustomBottomTabbarItem