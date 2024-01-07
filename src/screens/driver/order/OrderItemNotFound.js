import { View, Text, Image } from 'react-native'
import React from 'react'

const OrderItemNotFound = () => {
    return (
        <View className="flex-1 justify-center items-center mb-14 opacity-50">
            <Image className="w-28 h-28" source={require('../../../assets/images/nonefile.png')} />
            <Text className="text-lg mt-3">Hiện chưa có đơn hàng</Text>
        </View>
    )
}

export default OrderItemNotFound