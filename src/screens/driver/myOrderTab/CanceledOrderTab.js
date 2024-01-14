import { View, FlatList } from 'react-native'
import React, { memo } from 'react'
import OrderItemNotFound from './OrderItemNotFound';

const CanceledOrderTab = () => {
    console.log('tab3')

    return (
        <View className="flex-1 bg-white">
            <OrderItemNotFound />
        </View>
    )
}

export default memo(CanceledOrderTab)