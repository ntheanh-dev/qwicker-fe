import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialIcons, Feather, AntDesign, MaterialCommunityIcons, Ionicons, Entypo, Foundation } from '@expo/vector-icons';
import { ROUTES, SHIPMENTYPE } from '../../constants';
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentMethods, getPaymentMethods } from '../../redux/appSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { INIT_PAYMENT, addPayment, resetPaymentSlice } from '../../redux/paymentSlice';
import { formatCurrency, formatDateTimeToVietnamese } from '../../features/ultils';
import { getShipment, resetShipmentSlice } from '../../redux/shipmentSlice';
import { getSelectedVehicle, resetOrderSlice } from '../../redux/orderSlice';
import { orderForm, resetOrder } from '../../redux/store';
import { isProductFulFill, resetProductSlice } from '../../redux/productSlice';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { getBasicUserToken, postJob } from '../../redux/basicUserSlice';
import Spinner from 'react-native-loading-spinner-overlay';

const AddMoreOrderDetail = ({ navigation }) => {
    const dispatch = useDispatch()
    const shipmentData = useSelector(getShipment)
    const selectedVehicle = useSelector(getSelectedVehicle)
    const order = useSelector(orderForm)
    const { access_token } = useSelector(getBasicUserToken)
    // Product
    const isProductFormFulFill = useSelector(isProductFulFill)
    // Payment method
    const paymentMethodBTS = useRef();
    const initPaymentMethod = useSelector(getPaymentMethods)
    const [paymentMethod, setPaymentMethod] = useState(initPaymentMethod)
    const [showPayer, setShowPayer] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1.1)
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
                result.text = 'VnPay'
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
    const handleChoosePaymentMethod = (type) => {
        setSelectedPaymentMethod(type)
        paymentMethodBTS.current.close()
    }
    const getDisPatchShipmentData = () => {
        let data = { ...INIT_PAYMENT }
        switch (selectedPaymentMethod) {
            case 0:
                const a = paymentMethod.find(ele => ele?.name === "Momo")
                data.method_id = a.id
                break
            case 1.1:
                let b = paymentMethod.find(ele => ele?.name === "Tiền mặt")
                data.method_id = b.id
                break
            case 1.2:
                let c = paymentMethod.find(ele => ele?.name === "Tiền mặt")
                data.method_id = c.id
                data.is_poster_pay = false
                break
        }
        return data
    }
    // Place order
    const placeOrderBTS = useRef()

    const handleBack = () => {
        navigation.getParent().setOptions({
            headerShown: true,
        })
        navigation.goBack()
    }

    useEffect(() => {
        // Fetch payment method 
        if (paymentMethod.length === 0) {
            dispatch(fetchPaymentMethods())
                .then(unwrapResult)
                .then(res => { setPaymentMethod(res) })
                .catch(e => console.log(e))
        }

        // Set header option
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

    const handleReviewOrder = () => {
        const data = getDisPatchShipmentData()
        dispatch(addPayment(data))
        placeOrderBTS.current.open()
    }

    const handlePlaceOrder = () => {
        setLoading(true)
        const data = {
            access_token: access_token,
            formData: order
        }
        dispatch(postJob(data))
            .then(unwrapResult)
            .then(res => {
                setLoading(false)
                placeOrderBTS.current.close()
                dispatch(resetOrderSlice())
                dispatch(resetPaymentSlice())
                dispatch(resetProductSlice())
                dispatch(resetShipmentSlice())
                if (selectedPaymentMethod === 1.1 || selectedPaymentMethod === 1.2)
                    navigation.navigate(ROUTES.ORDER_STATUS_STACK, { orderId: res.id, status: res.status })
                else
                    navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, { orderId: res.id })
            })
            .catch(e => {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Đăng bài thất bại",
                    textBody: 'Vui lòng thử lại'
                })
                console.log(e)
                setLoading(false)
            })
    }


    return (
        <View className="bg-white flex-1 py-4 relative">
            <Spinner visible={loading} size='large' animation='fade' />
            <View className="bg-white flex-col px-4">
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
                            onPress={() => handleChoosePaymentMethod(0)}
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
                                onPress={() => handleChoosePaymentMethod(1.1)}
                                className="flex-row justify-between items-center border-b border-gray-300 py-4"
                            >
                                <View>
                                    <Text className="text-lg font-semibold">Người gửi</Text>
                                    <Text className="text-base text-gray-500">{shipmentData.pick_up.short_name}</Text>
                                </View>
                                {selectedPaymentMethod === 1.1 && <View><MaterialIcons name="check-circle" size={24} color="#3422F1" /></View>}
                            </TouchableOpacity>
                            {/* ----------------Receiver'l pay----------- */}
                            <TouchableOpacity
                                onPress={() => handleChoosePaymentMethod(1.2)}
                                className="flex-row justify-between items-center border-b border-gray-300 py-4"
                            >
                                <View>
                                    <Text className="text-lg font-semibold">Người nhận</Text>
                                    <Text className="text-base text-gray-500">{shipmentData.delivery_address.short_name}</Text>
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

                {/*---------------Place order bottom sheet------------ */}
                <RBSheet
                    ref={placeOrderBTS}
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
                            height: 450
                        }
                    }}
                >
                    <View className="px-4 pt-5 pb-8 flex-col">
                        <Text className="text-2xl font-bold">Xem lại đơn hàng</Text>
                        {/*---------------Time--------------- */}
                        <View className="flex-col py-4 border-b border-gray-300">
                            <Text className="text-base text-gray-500">Thời gian nhận hàng</Text>
                            <Text className="text-lg font-bold">{shipmentData.type === SHIPMENTYPE.NOW ? 'Ngay bây giờ' : formatDateTimeToVietnamese(shipmentData.shipment_date.date, shipmentData.shipment_date.time)}</Text>
                        </View>
                        {/* ------------- Place-------------- */}
                        <View className="flex-col py-4 border-b border-gray-300">
                            <View className="flex-row items-center ">
                                <View className="flex items-center w-6"><Entypo name="circle" size={15} color="#3422F1" /></View>
                                <Text className="text-lg font-bold ml-4">{shipmentData.pick_up.short_name}</Text>
                            </View>
                            <View className="flex-row items-center ">
                                <View className="flex items-center w-6"><Foundation name="marker" size={18} color="#3422F1" /></View>
                                <Text className="text-lg font-bold ml-4">{shipmentData.delivery_address.short_name}</Text>
                            </View>
                        </View>
                        {/* ---------------Vehicle----------- */}
                        <View className="py-4 border-b border-gray-300">
                            <View className="flex-row items-center ">
                                <View className="flex items-center w-6"><Ionicons name="car-outline" size={25} color="#3422F1" /></View>
                                <Text className="text-lg font-bold ml-4">{selectedVehicle?.name}</Text>
                            </View>
                        </View>
                        {/* ------------Payment method--------- */}
                        <View className="flex-row py-4 justify-between items-center mb-3">
                            <View className="flex-row items-center ">
                                <View className="flex items-center w-6">{getPaymentMethodUI(selectedPaymentMethod).icon}</View>
                                <Text className="text-lg font-bold ml-4">{getPaymentMethodUI(selectedPaymentMethod).text}</Text>
                            </View>
                            <Text>đ{formatCurrency(shipmentData.cost)}</Text>
                        </View>
                        {/* -------------Place BTN-------------- */}
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handlePlaceOrder}
                            className="flex justify-center items-center bg-[#3422F1] py-3 rounded-lg"
                        >
                            <Text className="text-lg font-bold text-white">Đặt giao hàng</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </View>
            {/* ----------Comfirm review order bottom sheet ------*/}
            {isProductFormFulFill && <View
                className="h-36 w-full px-4 pt-5 pb-8 flex justify-center items-center absolute bottom-0 left-0 right-0 rounded-2xl"
                style={{ backgroundColor: 'rgba(209, 213, 219, 0.4)' }}
            >
                <View className="h-full w-full px-4 flex-col justify-between">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-base font-semibold text-gray-600">Tổng cộng</Text>
                        <View className="flex-row space-x-2 items-center">
                            <Text className="text-2xl font-bold">đ{formatCurrency(shipmentData.cost)}</Text>
                            <AntDesign name="exclamationcircleo" size={20} color="black" />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleReviewOrder}
                        className="flex justify-center items-center bg-[#3422F1] py-3 rounded-lg"
                    >
                        <Text className="text-lg font-bold text-white">Xem lại đơn hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
    )
}

export default AddMoreOrderDetail