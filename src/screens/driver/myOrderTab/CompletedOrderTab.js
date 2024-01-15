import { View, FlatList, ScrollView } from 'react-native'
import React, { memo } from 'react'
import OrderItem from './OrderItem';
import { fakeOrders } from '../../../data';

const CompletedOrderTab = ({ title }) => {
    return (
        <View className="flex-1 bg-gray-100 px-4">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {fakeOrders.map(item => <OrderItem key={item.id} data={item} title={'Đã hoàn thành'} />)}
                <View className="h-80 w-full"></View>
            </ScrollView>
        </View>
    )
}

export default memo(CompletedOrderTab)