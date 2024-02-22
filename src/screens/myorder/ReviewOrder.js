import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";

import { Feather, MaterialCommunityIcons, Ionicons, Foundation, Octicons, Entypo, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { formatCurrency, formatMomentDateToVietnamese2 } from '../../features/ultils';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicUserToken, retrieve, sendFeedback, vnPayCreatePaymentUrl } from '../../redux/basicUserSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { JOBSTATUS, ROUTES } from '../../constants';
const comments = [{ id: 1, content: 'Thái độ tốt' }, { id: 2, content: 'Tình trạng phương tiện tốt' }, { id: 3, content: 'Rất đúng giờ' }, { id: 4, content: 'Phản hồi nhanh chóng' }]
const ReviewOrder = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { orderId } = route.params
    const [orderData, setOrderData] = useState({})
    const { shipment, vehicle, product, payment, winner, status, ...order } = orderData
    useEffect(() => {
        dispatch(retrieve({ access_token: access_token, orderId: orderId }))
            .then(unwrapResult)
            .then(res => {
                setOrderData(res)
            })
            .catch(e => console.log(e))
    }, [])
    const { access_token } = useSelector(getBasicUserToken)
    const refRBSheet = useRef();
    const [isReviewed, setIsReviewed] = useState(false)
    const [star, setStar] = useState(0)
    const [text, setText] = useState('')
    const renderStars = () => {
        const arr = []
        for (let i = 1; i <= 5; i++) {
            if (i <= star) {
                arr.push(<TouchableOpacity key={i} onPress={() => setStar(i)}>
                    <MaterialIcons name="star" size={34} color="yellow" />
                </TouchableOpacity>
                )
            } else {
                arr.push(<TouchableOpacity key={i} onPress={() => setStar(i)}>
                    <MaterialIcons name="star-border" size={34} color="black" />
                </TouchableOpacity>
                )
            }
        }
        return arr
    }
    const handlePressBottomBTN = () => {
        if (!isReviewed) {
            refRBSheet.current.open()
        }
    }
    const handleChooseRecommedFeadback = (comment) => {
        if (text === '') {
            setText(comment)
        } else {
            setText(text => `${text}, ${comment.toLowerCase()}`)
        }
    }

    const handleFeedback = () => {
        if (text.length > 0) {
            const formData = new FormData()
            formData.append('shipper_id', winner?.id)
            formData.append('rating', star)
            formData.append('comment', text)

            dispatch(sendFeedback({ access_token: access_token, jobId: order.id, formData: formData }))
                .then(unwrapResult)
                .then(res => {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: `Đánh giá thành công`,
                    })
                    refRBSheet.current.close()
                })
                .catch(e => console.log(e))
        }

    }

    const handlePayment = () => {
        const formData = new FormData()
        formData.append('amount', shipment?.cost)
        formData.append('order_info', order?.id)
        dispatch(vnPayCreatePaymentUrl({ access_token: access_token, formData: formData }))
            .then(unwrapResult)
            .then(res => {
                navigation.navigate(ROUTES.VNPAY_WEBVIEW_DRAWER, { paymentURL: res.payment_url, orderId: orderId, paymentId: payment.id })
            })
            .catch(e => console.log(e))
    }

    return (
        <View className="p-2 flex-1 flex-col relative">
            <ScrollView>
                {/* ---------Driver infor---------- */}
                <View className="bg-white p-4 flex-col mb-4">
                    <View className="flex-row space-x-4">
                        <View className="basis-1/6 px-3 ">
                            <Image
                                source={{ uri: winner?.avatar }}
                                className="h-12 w-12 rounded-full"
                            />
                        </View>
                        <View className="basis-5/6 flex-col space-y-1">
                            <Text>{`${winner?.first_name} ${winner?.last_name}`}</Text>
                            <View className="bg-gray-100 rounded-md px-1" style={{ alignSelf: 'flex-start' }}>
                                <Text className="text-xs text-gray-600 font-semibold">{`${winner?.more.vehicle_number} ${winner?.more.vehicle.name}`}</Text>
                            </View>

                            <View className="flex-row items-center space-x-1">
                                <AntDesign name="star" size={20} color="yellow" />
                                <Text className="text-sm text-gray-600 font-semibold">{parseFloat(winner?.rating)}</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex-row pt-4">
                        <View className="flex-1 flex-row space-x-2 justify-center items-center">
                            <MaterialCommunityIcons name="android-messages" size={24} color="#3422F1" />
                            <Text className="text-base font-semibold">Nhắn ngay</Text>
                        </View>
                        <View className="flex-1 flex-row space-x-2 justify-center items-center">
                            <Feather name="phone" size={24} color="#3422F1" />
                            <Text className="text-base font-semibold">Gọi ngay</Text>
                        </View>
                    </View>
                </View>
                {/* ---------  Price-------------- */}
                <View className="flex-row bg-white p-4 space-x-4 items-center mb-4">
                    <Ionicons name="cash-outline" size={24} color="#3422F1" />
                    <View className="flex-col">
                        <Text className="text-xl font-semibold">{formatCurrency(shipment?.cost)}</Text>
                        <Text className="text-base font-medium text-gray-400 ">{payment?.method.name}</Text>
                    </View>
                </View>
                {/* -----------Location, date time, uuid----------- */}
                <View className="flex-col bg-white p-4 mb-4">
                    <View className="flex-row items-center justify-between pb-3">
                        <Text className="text-base text-gray-500">{formatMomentDateToVietnamese2(shipment?.shipment_date)}</Text>
                        <Text className="text-gray-600 text-base">{`#${order?.uuid}`}</Text>
                    </View>

                    <View className="flex-row space-x-2">
                        <View className="mt-2 relative">
                            <Entypo name="circle" size={18} color="#3422F1" />
                            {/* <View className="border-l-2 border-dotted border-[#3422F1] flex-1 absolute top-6 bottom-0 left-1/2" style={{ width: 1 }}></View> */}
                        </View>

                        <View className="basis-5/6 flex-col">
                            <Text className="text-xl font-semibold">{shipment?.pick_up?.short_name}</Text>
                            <Text className="text-lg text-gray-600">{shipment?.pick_up?.long_name}</Text>
                            <Text className="text-lg text-gray-600">{`${shipment?.pick_up?.contact}: ${shipment?.pick_up?.phone_number}`}</Text>
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
                            <Text className="text-xl font-semibold">{shipment?.delivery_address?.short_name}</Text>
                            <Text className="text-lg text-gray-600">{shipment?.delivery_address?.long_name}</Text>
                            <Text className="text-lg text-gray-600">{`${shipment?.delivery_address?.contact}: ${shipment?.delivery_address?.phone_number}`}</Text>
                        </View>
                        <View className="basis-1/6 flex justify-center items-start">
                            <FontAwesome name="location-arrow" size={30} color="#3422F1" />
                        </View>
                    </View>
                </View>
                {/* -------------Vehicle----------- */}
                <View className="flex-col bg-white p-4 mb-4 ">
                    <Text className="font-semibold text-xl">{vehicle?.name}</Text>
                    {order.description &&
                        <View className="flex-row items-center space-x-4 px-4 mt-2">
                            <Octicons name="note" size={24} color="rgb(75 ,85 ,99)" />
                            <Text className="text-base text-gray-600">{order?.description}</Text>
                        </View>
                    }
                </View>
                {/* -------------ProductType----------- */}
                <View className="flex-row bg-white p-4 mb-2 space-x-2 items-center">
                    <MaterialCommunityIcons name="format-list-bulleted-type" size={24} color="black" />
                    <View className="flex-col">
                        <Text className="text-xl font-semibold">{product?.category?.name}</Text>
                    </View>
                </View>
                {/* -----------Feedback Button----------- */}
                <TouchableOpacity
                    onPress={handlePressBottomBTN}
                >
                    <Text className="text-md font-medium text-[#3422F1] text-center py-2 underline">Đánh giá</Text>
                </TouchableOpacity>
                <View className="h-40"></View>
            </ScrollView>

            <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
                {/* --------------Place order again----------- */}
                {status == JOBSTATUS.DONE && (
                    <TouchableOpacity
                        className={`rounded-lg w-full flex justify-center items-center h-14 bg-[#3422F1]`}
                    >
                        <Text className="text-lg font-medium text-white" >Đặt lại đơn hàng</Text>
                    </TouchableOpacity>
                )}
                {/* --------------Payment------------------- */}
                {status == JOBSTATUS.WAITING_PAY && (
                    <TouchableOpacity
                        onPress={handlePayment}
                        className={`rounded-lg w-full flex justify-center items-center h-14 bg-[#3422F1]`}
                    >
                        <Text className="text-lg font-medium text-white" >Thanh toán ngay</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* --------------Feadback bottom sheet---------- */}
            <RBSheet
                ref={refRBSheet}
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
                        overflow: 'hidden'
                    }
                }}
                height={410}
            >
                <View className="h-full w-full flex-col">
                    <View className="py-3 border-b border-gray-300 relative">
                        <Text className="text-center text-lg font-semibold">Đánh giá theo trải nghiệm của bạn</Text>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()} className="absolute right-4 top-1/2">
                            <MaterialCommunityIcons name="window-close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center space-x-2 py-4">
                        {renderStars().map(ele => ele)}
                    </View>
                    <View className="flex-row flex-wrap justify-center">
                        {comments.map(ele => (
                            <TouchableOpacity
                                onPress={() => handleChooseRecommedFeadback(ele.content)}
                                key={ele.id}
                                underlayColor={'white'}
                                className='rounded-3xl p-3 border border-gray-600 m-2'
                            >
                                <Text
                                    className="text-base font-medium"
                                >
                                    {ele.content}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="px-4 mt-4">
                        <TextInput
                            className="bg-gray-200 rounded-lg text-lg py-2 px-4 mb-4"
                            placeholder='Nhập bình luận của bạn'
                            onChangeText={txt => setText(txt)}
                            value={text}
                        />
                        <TouchableOpacity
                            onPress={handleFeedback}
                            className={`rounded-lg w-full flex justify-center items-center h-14 ${text.length > 0 ? 'bg-[#3422F1]' : 'bg-gray-400'}`}
                        >
                            <Text className="text-lg font-medium text-white" >ĐÁNH GIÁ</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </RBSheet>
        </View>
    )
}

export default ReviewOrder