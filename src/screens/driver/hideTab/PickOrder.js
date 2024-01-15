import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, Entypo, Foundation, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

const PickOrder = ({ route, navigation }) => {
    const { itemId } = route.params;

    return (
        <View className="flex-1">
            <View className="px-4 bg-[#3422F1] pb-8">
                <Text className="text-lg font-medium text-white ">Nhận đơn ngay</Text>
                <Text className="text-base text-white my-1">Cách ~ 3 kilomet</Text>
            </View>
            <View className="relative  flex-1">
                <View className="absolute left-0 right-0 px-4 top-[-20] z-10">
                    {/* ----------Location---------- */}
                    <View className="flex-col bg-white rounded-lg border border-gray-300 pb-4 mb-2">
                        <View className="py-2">
                            <Text className="text-gray-600 pl-4 py-1">3.41 Kilomet</Text>
                        </View>
                        <View className="flex-col space-y-4">
                            {/* -----------Delivery Address------------- */}
                            <View className="flex-row ">
                                <View className="basis-1/6 flex justify-center items-center">
                                    <Entypo name="circle" size={18} color="#3422F1" />
                                </View>
                                <View className="flex-col basis-5/6 ">
                                    <Text className="text-lg font-semibold" >5, Hẻm 89</Text>
                                    <Text className="text-gray-600">5 89, Tổ 3, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam</Text>
                                </View>
                            </View>
                            {/* -----------Pick up------------- */}
                            <View className="flex-row ">
                                <View className="basis-1/6 flex justify-center items-center">
                                    <Foundation name="marker" size={28} color="#3422F1" />
                                </View>
                                <View className="flex-col basis-5/6 ">
                                    <Text className="text-lg font-semibold" >5, Hẻm 89</Text>
                                    <Text className="text-gray-600">5 89, Tổ 3, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* ----------Vehicel---------- */}
                    <View className="flex-col bg-white rounded-lg border border-gray-300 p-4 mb-2">
                        <View className="flex-col">
                            <View className="flex-row justify-between">
                                <Text className="text-lg font-medium">Xe máy</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                            </View>

                            <View className="flex-row items-center space-x-2 pt-3">
                                <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
                                <Text className="text-base text-gray-600">Giao hai thung bia</Text>
                            </View>

                        </View>
                    </View>
                    {/* ----------Price---------- */}
                    <View className="flex-row bg-white rounded-lg border border-gray-300 p-4 mb-2 space-x-4 items-center">
                        <Ionicons name="cash-outline" size={24} color="#3422F1" />
                        <View className="flex-col">
                            <Text className="text-xl font-semibold">đ99999999</Text>
                            <Text className="text-base font-medium text-gray-400 ">Thu tiền mặt</Text>
                        </View>
                    </View>
                    {/* ----------Product type---------- */}
                    <View className="flex-row bg-white rounded-lg border border-gray-300 p-4 mb-2 space-x-4 items-center">
                        <MaterialCommunityIcons name="format-list-bulleted-type" size={24} color="black" />
                        <View className="flex-col">
                            <Text className="text-xl font-semibold">Thực phẩm & đồ uống</Text>
                        </View>
                    </View>
                </View>
                {/* ---------Confirm Button Sheet-------- */}
                <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
                    <Text className="text-xl font-semibold">Đừng bỏ lỡ!</Text>
                    <Text className="text-base font-medium text-gray-400 ">9999 Tài xế đang tham gia</Text>
                    <TouchableOpacity
                        underlayColor={'rbga(0,0,0,0)'}
                        className="rounded-lg w-full flex justify-center items-center h-14 mt-5 bg-[#3422F1]"
                    >
                        <Text className="text-lg font-medium text-white" >Tham gia ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PickOrder