import { View, FlatList, ScrollView } from 'react-native'
import React, { memo } from 'react'
import OrderItem from './OrderItem';
import { fakeOrders } from '../../../data';

const ProcessingOrderTab = ({ title, index }) => {
    return (
        <View className="flex-1 bg-gray-100 px-4">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {fakeOrders.map(item => <OrderItem key={item.id} data={item} title={title} index={index} />)}
                <View className="h-80 w-full"></View>
            </ScrollView>
        </View>
    )
}

export default memo(ProcessingOrderTab)