import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialIcons, Feather, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { ROUTES } from '../../constants';
import RBSheet from "react-native-raw-bottom-sheet";

const AddMoreOrderDetail = ({ navigation }) => {
    const [showConfirmOrderBTS, setShowConfimOrderBTS] = useState(true)

    const paymentMethodBTS = useRef();
    const [showPayer, setShowPayer] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(-1)

    // -1: init , 0: Momo, 1.1 sender, 1.2: receiver
    const getPaymentMethodUI = (selectedPaymentMethod) => {
        result = {}
        switch (selectedPaymentMethod) {
            case -1:
                result.icon = <AntDesign name="wallet" size={24} color="#3422F1" />
                result.text = 'Phương thức thanh toán'
                break
            case 0:
                result.icon = <AntDesign name="creditcard" size={24} color="#3422F1" />
                result.text = 'Mono'
                result.subtext = 'Thanh toán sau khi hoàn thành đặt hàng'
                break
            case 1.1:
                result.icon = <Ionicons name="cash-outline" size={24} color="#3422F1" />
                result.text = 'Tiền mặt'
                result.subtext = 'Thanh toán bởi người gửi'
                break
            case 1.2:
                result.icon = <Ionicons name="cash-outline" size={24} color="#3422F1" />
                result.text = 'Tiền mặt'
                result.subtext = 'Thanh toán bởi người nhận'
                break
        }
        return result
    }

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
                        <Text className="text-sm">Thêm chi tiết hàng hoá của bạn</Text>
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
                        <Text className="text-sm">Ghi chú cho tài xế</Text>
                    </View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                {/* ---------------Payment method--------------- */}
                <TouchableOpacity
                    onPress={() => paymentMethodBTS.current.open()}
                    className="flex-row justify-between items-center py-4 pr-4   border-b border-gray-300"
                >
                    <View className="flex-row items-center space-x-3">
                        {getPaymentMethodUI(selectedPaymentMethod).icon}
                        <View>
                            <Text className="text-sm">{getPaymentMethodUI(selectedPaymentMethod).text}</Text>
                            {
                                getPaymentMethodUI(selectedPaymentMethod).subtext &&
                                <Text className="text-gray-500">{getPaymentMethodUI(selectedPaymentMethod).subtext}</Text>
                            }
                        </View>
                    </View>
                    <View className="flex-row space-x-3 items-center mr-[-12]">
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <RBSheet
                    ref={paymentMethodBTS}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "rgba(0,0,0,0.3)"
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        },
                        container: {
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            overflow: 'hidden',
                            height: showPayer ? 410 : 250
                        }
                    }}
                >
                    <View className="h-full w-full px-4 pt-5 pb-8 flex-col">
                        <Text className="text-2xl font-bold">Phương thức thanh toán</Text>
                        {/* -----Momo------- */}
                        <TouchableOpacity
                            className="flex-row space-x-3 items-center "
                            activeOpacity={0.8}
                            onPress={() => setSelectedPaymentMethod(0)}
                        >
                            <View className="px-4"><AntDesign name="wallet" size={24} color="#3422F1" /></View>
                            <View className="flex-col border-b border-gray-300 py-4 flex-1">
                                <Text className="text-base font-medium">Momo</Text>
                                <Text className="text-gray-500">Thanh toán sau khi hoàn thành đặt hàng</Text>
                            </View>
                            {selectedPaymentMethod === 0 && <View><MaterialIcons name="check-circle" size={24} color="#3422F1" /></View>}
                        </TouchableOpacity>
                        {/* -----------On delivery  --------------*/}
                        <TouchableOpacity
                            className="flex-row space-x-3 items-center "
                            onPress={() => setShowPayer(!showPayer)}
                            activeOpacity={0.8}
                        >
                            <View className="px-4"><Ionicons name="cash-outline" size={24} color="#3422F1" /></View>
                            <View className="flex-col border-b border-gray-300 py-4 flex-1 relative">
                                <Text className="text-base font-medium">Tiền</Text>
                                <Text className="text-gray-500">Chọn người thanh toán</Text>
                                <View className="absolute right-0 top-[50%]">
                                    <MaterialIcons name={`keyboard-arrow-${showPayer ? 'up' : 'down'}`} size={30} color="black" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {showPayer && <View className="flex-col pl-28">
                            {/* ----------------Sende'l pay----------- */}
                            <TouchableOpacity
                                onPress={() => setSelectedPaymentMethod(1.1)}
                                className="flex-row justify-between items-center border-b border-gray-300 py-4"
                            >
                                <View>
                                    <Text className="text-lg font-semibold">Người gửi</Text>
                                    <Text className="text-base text-gray-500">5,89</Text>
                                </View>
                                {selectedPaymentMethod === 1.1 && <View><MaterialIcons name="check-circle" size={24} color="#3422F1" /></View>}
                            </TouchableOpacity>
                            {/* ----------------Receiver'l pay----------- */}
                            <TouchableOpacity
                                onPress={() => setSelectedPaymentMethod(1.2)}
                                className="flex-row justify-between items-center border-b border-gray-300 py-4"
                            >
                                <View>
                                    <Text className="text-lg font-semibold">Người nhận</Text>
                                    <Text className="text-base text-gray-500">Hà Nội</Text>
                                </View>
                                {selectedPaymentMethod === 1.2 && <View><MaterialIcons name="check-circle" size={24} color="#3422F1" /></View>}
                            </TouchableOpacity>
                        </View>}
                    </View>
                </RBSheet>

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

                {/* ----------Comfirm review order bottom sheet ------*/}
            </View>
        </View>
    )
}

export default AddMoreOrderDetail