import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import OrderItem from './OrderItem'
import { fakeOrders } from '../../data/index'
const CompletedOrderTab = () => {
    return (
        <View className="flex-1 bg-gray-100 px-2">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {fakeOrders.map(item => <OrderItem key={item.id} data={item} title={'Đã hoàn thành'} />)}
                <View className="h-80 w-full"></View>
            </ScrollView>
        </View>
    )
}

export default React.memo(CompletedOrderTab)