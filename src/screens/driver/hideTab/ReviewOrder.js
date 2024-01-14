import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Feather, MaterialCommunityIcons, Ionicons, Foundation, Entypo, FontAwesome } from '@expo/vector-icons';
import { formatMomentDateToVietnamese2 } from '../../../features/ultils';
const ReviewOrder = ({ navigation, route }) => {
    const { data } = route.params
    return (
        <View className="p-2 flex-1 flex-col relative">
            <View className="p-4 bg-white flex-row items-center mb-4">
                <Text numberOfLines={1} className="font-semibold text-xl basis-4/6">Liên hệ khách hàng: Nguyễn Thế Anh</Text>
                <View className="basis-1/6 flex justify-center items-center">
                    <MaterialCommunityIcons name="android-messages" size={24} color="#3422F1" />
                </View>
                <View className="basis-1/6 flex justify-center items-center">
                    <Feather name="phone" size={24} color="#3422F1" />
                </View>
            </View>

            <View className="flex-row bg-white p-4 space-x-4 items-center mb-4">
                <Ionicons name="cash-outline" size={24} color="#3422F1" />
                <View className="flex-col">
                    <Text className="text-xl font-semibold">đ99999999</Text>
                    <Text className="text-base font-medium text-gray-400 ">Thu tiền mặt</Text>
                </View>
            </View>
            <View className="flex-col bg-white p-4 ">
                <View className="flex-row items-center justify-between">
                    <Text className="text-base text-gray-500">{formatMomentDateToVietnamese2(data.time)}</Text>
                    <Text className="text-gray-600 text-base">{`#${data.uuid}`}</Text>
                </View>
                <TouchableOpacity className="bg-blue-100 rounded-md flex-row space-x-2 py-3 px-6 my-4 items-center">
                    <Foundation name="clipboard-pencil" size={24} color="black" />
                    <Text>Cần xác nhận giao hàng thành công tại điểm trả hàng.</Text>
                </TouchableOpacity>

                <View className="flex-row space-x-2">
                    <View className="mt-2 relative">
                        <Entypo name="circle" size={18} color="#3422F1" />
                        <View className="border-l-2 border-dotted border-[#3422F1] flex-1 absolute top-6 bottom-0 left-1/2" style={{ width: 1 }}></View>
                    </View>

                    <View className="basis-5/6 flex-col">
                        <Text className="text-xl font-semibold">{data.pickUp.title}</Text>
                        <Text className="text-lg text-gray-600">{data.pickUp.location}</Text>
                        <Text className="text-lg text-gray-600">{`A Phat: 0373054756`}</Text>
                    </View>
                    <View className="basis-1/6 flex justify-center items-start">
                        <FontAwesome name="location-arrow" size={30} color="#3422F1" />
                    </View>
                </View>
                <View className="flex-row space-x-2">
                    <View className="mt-2 relative">
                        <Foundation name="marker" size={22} color="#3422F1" />
                    </View>

                    <View className="basis-5/6 flex-col mt-2">
                        <Text className="text-xl font-semibold">{data.deliveryAddress.title}</Text>
                        <Text className="text-lg text-gray-600">{data.deliveryAddress.location}</Text>
                        <Text className="text-lg text-gray-600">{`A Phat: 0373054756`}</Text>
                    </View>
                    <View className="basis-1/6 flex justify-center items-start">
                        <FontAwesome name="location-arrow" size={30} color="#3422F1" />
                    </View>
                </View>
            </View>

            <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
                <Text className="text-base font-medium text-gray-400 text-center ">Xác nhận với khách hàng về các loại phí phát sinh</Text>
                <TouchableOpacity
                    underlayColor={'rbga(0,0,0,0)'}
                    className="rounded-lg w-full flex justify-center items-center h-14 mt-5 bg-[#3422F1]"
                >
                    <Text className="text-lg font-medium text-white" >Liên hệ với khách hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReviewOrder