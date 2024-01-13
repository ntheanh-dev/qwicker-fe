import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Foundation, Octicons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const OrderItem = ({ item, title }) => {
    return (
        <>
            {item?.isAddBottomSpace ? <View className="h-52"></View> : (
                <TouchableOpacity className="flex-col bg-white rounded-xl overflow-hidden my-3">
                    <View className="flex-row justify-between items-center p-3 border-b border-gray-300 ">
                        <Text className="text-lg font-semibold">{title}</Text>
                        <View className="flex-row items-center space-x-1">
                            <SimpleLineIcons name="clock" size={18} color="white" />
                            <Text className="text-lg font-medium text-white">19:00</Text>
                        </View>
                    </View>
                    <View className="flex-row px-4 pt-2">
                        <View className="basis-1/6 flex-col justify-center space-y-3">
                            <View className="flex items-center w-10"><Entypo name="circle" size={18} color="#3422F1" /></View>
                            <View className="flex items-center w-10"><Foundation name="marker" size={22} color="#3422F1" /></View>
                        </View>
                        <View className="basis-5/6 ml-[-12] ">
                            <View>
                                <Text className="font-medium text-lg">Thanh Xuan</Text>
                            </View>
                            <View className="py-2 flex-row justify-between items-center ">
                                <Text className="font-medium text-lg">Ha Noi</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex-row items-center space-x-4 px-4 mt-2">
                        <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
                        <Text className="text-base text-gray-600">Đây là ghi chú</Text>
                    </View>
                    <View className="flex-row justify-between items-center p-4">
                        <Ionicons name="cash-outline" size={24} color="#3422F1" />
                        <Text className="text-xl font-semibold">đ99999999</Text>
                    </View>
                </TouchableOpacity>
            )}
        </>

    )
}

export default OrderItem