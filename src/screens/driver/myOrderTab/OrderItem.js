import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Foundation, Octicons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { formatMomentDateToVietnamese2 } from '../../../features/ultils';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants';

const OrderItem = ({ data, title }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REVIEW_ORDER_DRIVER_TAB, { title: 'Nhận lúc 99:99', data: data })}
            className="flex-col bg-white rounded-xl overflow-hidden my-3"
        >
            <View className={`flex-row justify-between items-center p-3 ${title === 'Đang xử lý' ? 'bg-orange-500' : 'border-gray-300 border-b'} `}>
                <Text className={`text-lg font-semibold ${title === 'Đang xử lý' && 'text-white'}`}>{title}</Text>
                {title !== 'Đang xử lý' && <View className="flex-row items-center space-x-1">
                    <Text className="text-lg font-medium text-gray-500">{formatMomentDateToVietnamese2(data.time)}</Text>
                </View>}
            </View>

            {title !== 'Đang xử lý' &&
                <View className="flex-row items-center justify-between pt-6 pb-2 px-4">
                    <Text className="text-gray-600 text-sm">{`${data.distance} kilomet`}</Text>
                    <Text className="text-gray-600 text-sm">{`#${data.uuid}`}</Text>
                </View>
            }

            <View className="flex-row px-4 pt-2">
                <View className="basis-1/6 flex-col justify-center space-y-3">
                    <View className="flex items-center w-10"><Entypo name="circle" size={18} color="#3422F1" /></View>
                    <View className="flex items-center w-10"><Foundation name="marker" size={22} color="#3422F1" /></View>
                </View>
                <View className="basis-5/6 ml-[-12] ">
                    <View>
                        <Text className="font-medium text-lg">{data.pickUp.title}</Text>
                    </View>
                    <View className="py-2 flex-row justify-between items-center ">
                        <Text className="font-medium text-lg">{data.deliveryAddress.title}</Text>
                    </View>
                </View>
            </View>

            {data.comment &&
                <View className="flex-row items-center space-x-4 px-4 mt-2">
                    <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
                    <Text className="text-base text-gray-600">{data.comment}</Text>
                </View>
            }
            <View className="flex-row justify-between items-center p-4">
                <Ionicons name="cash-outline" size={24} color="#3422F1" />
                <Text className="text-xl font-semibold">{`đ${data.price.toLocaleString('en-US')}`}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default OrderItem