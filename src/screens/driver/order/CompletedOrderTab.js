import { View, FlatList } from 'react-native'
import React from 'react'
import OrderItem from './OrderItem';

const CompletedOrderTab = ({ title }) => {
    const DATA = [
        {
            id: '1',
            title: 'First Item',
        },
        {
            id: '2',
            title: 'Second Item',
        },
        {
            id: '3',
            title: 'Third Item',
        },
        {
            id: '4',
            title: 'Add bottom space',
            isAddBottomSpace: true
        }
    ];

    return (
        <View className="flex-1 bg-gray-100 px-4">
            <FlatList
                data={DATA}
                renderItem={({ item }) => <OrderItem key={item.id} item={item} title={title} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default CompletedOrderTab