import { View, FlatList, ScrollView } from 'react-native'
import React, { memo } from 'react'
import OrderItem from './OrderItem';

const ProcessingOrderTab = ({ title, index }) => {
    const DATA = [{
        id: 1, pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, comment: "Giao hai thung bia", price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-14 20:00:00"
    },
    {
        id: 2, pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, comment: "Giao hai thung bia", price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-14 23:00:00"
    },
    {
        id: 3, pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-17 20:00:00"
    },]
    return (
        <View className="flex-1 bg-gray-100 px-4">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {DATA.map(item => <OrderItem key={item.id} data={item} title={title} index={index} />)}
                <View className="h-80 w-full"></View>
            </ScrollView>
        </View>
    )
}

export default memo(ProcessingOrderTab)