import { View, Text, Image } from 'react-native'
import React from 'react'
import { Entypo, Foundation } from '@expo/vector-icons';

const OrderItem = () => {
    return (
        <View className="flex-col pt-3 bg-white mt-4 rounded-lg space-y-3 overflow-hidden">
            <View className="border-b border-gray-200 pb-3 px-4"><Text>Th 5, thg 12 21, 20:21</Text></View>
            <View className='flex-row items-center px-4'>
                <View className="flex items-center w-10"><Entypo name="circle" size={24} color="#3422F1" /></View>
                <Text>5 89</Text>
            </View>
            <View className='flex-row items-center px-4'>
                <View className="flex items-center w-10"><Foundation name="marker" size={24} color="#3422F1" /></View>
                <Text>Hà nội</Text>
            </View>
            <View className="flex-row justify-between items-center  px-4 bg-gray-300 py-2">
                <Text>Xe Tải 500 kg</Text>
                <Text>đ0</Text>
            </View>
        </View>
    )
}

export default OrderItem