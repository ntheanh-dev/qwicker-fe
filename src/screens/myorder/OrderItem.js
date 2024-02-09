import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Foundation } from '@expo/vector-icons';
import { formatCurrency, formatMomentDateToVietnamese } from '../../features/ultils';
import { useNavigation } from '@react-navigation/native';
import { JOBSTATUS, ROUTES } from '../../constants';

const OrderItem = ({ shipment, vehicle, ...order }) => {
    const navigation = useNavigation()
    const title = order.status == JOBSTATUS.FINDING_SHIPPER ? 'Đang tìm shipper' : (order.status == JOBSTATUS.DONE ? 'Hoành thành' : 'Đợi thanh toán')
    const handleNavigate = () => {
        let route = ''
        if (Number(order.status) == JOBSTATUS.DONE) {
            navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, { orderId: order.id })
        } else if (Number(order.status) == JOBSTATUS.WAITING_PAY) {
            // navigate to handle pay by momo or vnpay
        } else {
            navigation.navigate(ROUTES.ORDER_STATUS_STACK, { orderId: order.id, status: order.status })
        }
    }
    return (
        <TouchableOpacity
            onPress={handleNavigate}
            className="flex-col pt-3 bg-white mt-4 rounded-lg space-y-3 overflow-hidden"
        >
            <View className="border-b border-gray-300 pb-3 px-4">
                <Text className="text-base font-medium">{title}</Text>
            </View>
            <View className='flex-row items-center px-4'>
                <View className="flex items-center w-10"><Entypo name="circle" size={24} color="#3422F1" /></View>
                <Text>{shipment.pick_up.short_name}</Text>
            </View>
            <View className='flex-row items-center px-4'>
                <View className="flex items-center w-10"><Foundation name="marker" size={24} color="#3422F1" /></View>
                <Text>{shipment.delivery_address.short_name}</Text>
            </View>
            <View className="flex-row justify-between items-center  px-4 bg-gray-200 py-2">
                <Text>{vehicle.name}</Text>
                <Text>{formatCurrency(shipment.cost)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem