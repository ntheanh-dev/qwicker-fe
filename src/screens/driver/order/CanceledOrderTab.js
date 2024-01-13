import { View, FlatList } from 'react-native'
import React from 'react'
import OrderItemNotFound from './OrderItemNotFound';

const CanceledOrderTab = () => {

    return (
        <View className="flex-1 bg-white">
            <OrderItemNotFound />
        </View>
    )
}

export default CanceledOrderTab