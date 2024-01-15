import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import OrderItem from './OrderItem'

const CompletedOrderTab = () => {
    const DATA = [{
        id: 1, vehicel: { title: 'Xe Tải 1000kg' }, pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, comment: "Giao hai thung bia", price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-14 20:00:00"
    },
    {
        id: 2, vehicel: { title: 'Xe Tải 1000kg', }, pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, comment: "Giao hai thung bia", price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-14 23:00:00"
    },
    {
        id: 3, vehicel: { title: 'Xe Tải 1000kg', }, pickUp: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        },
        deliveryAddress: {
            location: '5 Hẻm 891 Nguyễn Kiệm, Phường 3, Gò Vấp, Thành phố Hồ Chí Minh, Việt Name',
            title: '5, Hẻm 89',
        }, price: 123000, distance: 19.234, uuid: '12892348573', time: "2024-01-17 20:00:00"
    },]
    return (
        <View className="flex-1 bg-gray-100 px-2">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {DATA.map(item => <OrderItem key={item.id} data={item} title={'Đã hoàn thành'} />)}
                <View className="h-80 w-full"></View>
            </ScrollView>
        </View>
    )
}

export default React.memo(CompletedOrderTab)