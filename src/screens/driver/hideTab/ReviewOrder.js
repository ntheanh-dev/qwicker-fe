import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { Feather, MaterialCommunityIcons, Ionicons, Octicons, Foundation, Entypo, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { formatCurrency, formatMomentDateToVietnamese2 } from '../../../features/ultils';
import { JOBSTATUS, ROUTES } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { compeleteJob, getToken } from '../../../redux/shipperSlice';
import { unwrapResult } from '@reduxjs/toolkit';
const ReviewOrder = ({ navigation, route }) => {
    const { shipment, product, vehicle, order, payment } = route.params
    const dispatch = useDispatch()
    const { access_token } = useSelector(getToken)
    const handleCompelte = () => {
        dispatch(compeleteJob({ access_token: access_token, jobId: order.id }))
            .then(unwrapResult)
            .then(res => navigation.navigate(ROUTES.FIND_ORDER_DRIVER_TAB))
            .catch(e => console.log(e))
    }

    return (
        <View className="p-2 flex-1 flex-col relative">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* ----------------Contact with comsumer------------ */}
                {Number(order.status) === JOBSTATUS.WAITING_SHIPPER && (
                    <View className="p-4 bg-white flex-row items-center mb-4">
                        <Text numberOfLines={1} className="font-semibold text-xl basis-4/6">Liên hệ khách hàng: {shipment.pick_up.contact}</Text>
                        <View className="basis-1/6 flex justify-center items-center">
                            <MaterialCommunityIcons name="android-messages" size={24} color="#3422F1" />
                        </View>
                        <View className="basis-1/6 flex justify-center items-center">
                            <Feather name="phone" size={24} color="#3422F1" />
                        </View>
                    </View>
                )}
                {/* ---------  Price-------------- */}
                <View className="flex-row bg-white p-4 space-x-4 items-center mb-4">
                    <Ionicons name="cash-outline" size={24} color="#3422F1" />
                    <View className="flex-col">
                        <Text className="text-xl font-semibold">{formatCurrency(shipment.cost)}</Text>
                        <Text className="text-base font-medium text-gray-400 ">{payment.method.name}</Text>
                    </View>
                </View>
                {/* -----------Location, date time, uuid----------- */}
                <View className="flex-col bg-white p-4 mb-4 ">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-base text-gray-500">{formatMomentDateToVietnamese2(shipment.shipment_date)}</Text>
                        <Text className="text-gray-600 text-base">{`#${order.uuid}`}</Text>
                    </View>
                    {Number(order.status) === JOBSTATUS.WAITING_SHIPPER && <TouchableOpacity className="bg-blue-100 rounded-md flex-row space-x-2 py-3 px-6 my-4 items-center">
                        <Foundation name="clipboard-pencil" size={24} color="black" />
                        <Text>Cần xác nhận giao hàng thành công tại điểm trả hàng.</Text>
                    </TouchableOpacity>}

                    <View className="flex-row space-x-2">
                        <View className="mt-2 relative">
                            <Entypo name="circle" size={18} color="#3422F1" />
                            <View className="border-l-2 border-dotted border-[#3422F1] flex-1 absolute top-6 bottom-0 left-1/2" style={{ width: 1 }}></View>
                        </View>

                        <View className="basis-5/6 flex-col">
                            <Text className="text-xl font-semibold">{shipment.pick_up.short_name}</Text>
                            <Text className="text-lg text-gray-600">{shipment.pick_up.long_name}</Text>
                            <Text className="text-lg text-gray-600">{`${shipment.pick_up.contact}: ${shipment.pick_up.phone_number}`}</Text>
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
                            <Text className="text-xl font-semibold">{shipment.delivery_address.short_name}</Text>
                            <Text className="text-lg text-gray-600">{shipment.delivery_address.long_name}</Text>
                            <Text className="text-lg text-gray-600">{`${shipment.delivery_address.contact}: ${shipment.delivery_address.phone_number}`}</Text>
                        </View>
                        <View className="basis-1/6 flex justify-center items-start">
                            <FontAwesome name="location-arrow" size={30} color="#3422F1" />
                        </View>
                    </View>
                </View>
                {/* -------------Vehicle, comment----------- */}
                <View className="flex-col bg-white p-4 mb-4 ">
                    <Text className="font-semibold text-xl">{vehicle.name}</Text>
                    {order.description &&
                        <View className="flex-row items-center space-x-4 px-4 mt-2">
                            <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
                            <Text className="text-base text-gray-600">{order.description}</Text>
                        </View>
                    }
                </View>
                {/* -------------ProductType----------- */}
                <View className="flex-row bg-white p-4 mb-2 space-x-2 items-center">
                    <MaterialCommunityIcons name="format-list-bulleted-type" size={24} color="black" />
                    <View className="flex-col">
                        <Text className="text-xl font-semibold">{product.category.name}</Text>
                    </View>
                </View>
                <View className="h-80"></View>
            </ScrollView>
            {/* -----------Confirm bottom btn---------- */}
            {Number(order.status) === JOBSTATUS.WAITING_SHIPPER && (
                <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
                    <Text className="text-base font-medium text-gray-400 text-center ">Xác nhận với khách hàng về các loại phí phát sinh</Text>
                    <TouchableOpacity
                        onPress={handleCompelte}
                        className="rounded-lg w-full flex justify-center items-center h-14 mt-5 bg-[#3422F1]"
                    >
                        <Text className="text-lg font-medium text-white" >Liên hệ với khách hàng</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

export default ReviewOrder