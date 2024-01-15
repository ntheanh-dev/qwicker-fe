import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Foundation } from '@expo/vector-icons';
import { formatMomentDateToVietnamese } from '../../features/ultils';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants';

const OrderItem = ({ data }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, { title: 'Nhận lúc 99:99', data: data })}
            className="flex-col pt-3 bg-white mt-4 rounded-lg space-y-3 overflow-hidden"
        >
            <View className="border-b border-gray-300 pb-3 px-4">
                <Text className="text-base font-medium">{formatMomentDateToVietnamese(data.time)}</Text>
            </View>
            <View className='flex-row items-center px-4'>
                <View className="flex items-center w-10"><Entypo name="circle" size={24} color="#3422F1" /></View>
                <Text>{data.pickUp.title}</Text>
            </View>
            <View className='flex-row items-center px-4'>
                <View className="flex items-center w-10"><Foundation name="marker" size={24} color="#3422F1" /></View>
                <Text>{data.deliveryAddress.title}</Text>
            </View>
            <View className="flex-row justify-between items-center  px-4 bg-gray-200 py-2">
                <Text>{data.vehicel.title}</Text>
                <Text>{`đ${data.price.toLocaleString('en-US')}`}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem