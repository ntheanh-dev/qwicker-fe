import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ROUTES } from '../../constants';
import PaymentMethodBottomSheet from './PaymentMethodBottomSheet';

const AddMoreOrderDetail = ({ navigation }) => {
    const [showPaymentMethodBTS, setShowPaymentMethodBTS] = useState(true)
    const handleBack = () => {
        navigation.getParent().setOptions({
            headerShown: true,
        })
        navigation.goBack()
    }

    useEffect(() => {
        navigation.getParent().setOptions({
            headerShown: false,
        });
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={handleBack}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [])

    return (
        <View className="bg-gray-200 h-full py-4">
            <View className="bg-white flex-col pl-4">
                {/* ----------------Order Detail------------- */}
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.ORDER_DETAIL_STACK)}
                    className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300"
                >
                    <View className="flex-row items-center space-x-3">
                        <Feather name="package" size={24} color="#3422F1" />
                        <Text className="text-sm text-gray-500">Thêm chi tiết hàng hoá của bạn</Text>
                    </View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                {/* ---------------Comment for deliver---------- */}
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.ADD_COMMENT_FOR_COURIER_STACK)}
                    className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300"
                >
                    <View className="flex-row items-center space-x-3">
                        <MaterialCommunityIcons name="message-text-outline" size={24} color="#3422F1" />
                        <Text className="text-sm text-gray-500">Ghi chú cho tài xế</Text>
                    </View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                {/* ---------------Payment method--------------- */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 pr-4 ">
                    <View className="flex-row items-center space-x-3">
                        <AntDesign name="wallet" size={24} color="#3422F1" />
                        <Text className="text-sm text-gray-500">Phương thức thanh toán</Text>
                    </View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                {showPaymentMethodBTS && <PaymentMethodBottomSheet />}

                {/* ---------------------Discount------------------- */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 pr-4  border-b border-gray-300">
                    <View className="flex-row items-center space-x-3">
                        <MaterialCommunityIcons name="tag-plus-outline" size={24} color="#D1D5DB" />
                        <Text className="text-sm text-gray-500">Thêm coupon</Text>
                    </View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddMoreOrderDetail