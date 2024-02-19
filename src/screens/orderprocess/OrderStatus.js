import { View, Text, Dimensions, Animated, ScrollView, FlatList, Image, TouchableOpacity, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons, Ionicons, Entypo, Foundation, AntDesign, } from '@expo/vector-icons';
import { Easing, } from 'react-native-reanimated';
import { formatCurrency } from '../../features/ultils';
import { JOBSTATUS, ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { assignJob, getBasicUserToken, getJoinedShipper, myJob, retrieve } from '../../redux/basicUserSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const INIT_REGION = {
    latitude: 10.678650548923207,
    longitude: 106.68931532247792,
    latitudeDelta: 0.09,
    longitudeDelta: 0.03,
}
const { height } = Dimensions.get('window')
const OrderStatus = ({ navigation, route }) => {
    const distpatch = useDispatch()
    const { access_token } = useSelector(getBasicUserToken)
    const { orderId, status } = route.params
    const [order, setOrder] = useState({})
    const { payment, product, shipment, vehicle, ...orderData } = order
    const [shipper, setShipper] = useState([])
    const getHeaderTitle = (status) => {
        switch (status) {
            case 'FINDING_SHIPPER':
                return 'Đang tìm shipper'
            case 'WAITING_SHIPPER':
                return 'Đang đợi shipper'
            default:
                return
        }
    }
    // ---------------Marker Animation--------------
    const animatedColor = useRef(new Animated.Value(0)).current;
    const color = animatedColor.interpolate({
        inputRange: [0, 0.4, 0.8, 1],
        outputRange: ['rgba(254, 202, 202,0.2)',
            'rgba(252, 165, 165,0.2)', 'rgba(248, 113, 113,0.2)', 'rgba(248, 113, 113,0)'],
    });
    const animatedScale = useRef(new Animated.Value(0)).current;
    const scale = animatedScale.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]  // <-- value that larger than your content's height
    });

    const handleBack = () => {
        navigation.getParent().setOptions({
            headerShown: true,
        });
        navigation.navigate(ROUTES.HOME_STACK)
    }

    useEffect(() => {
        if (orderId) {
            const form = {
                access_token: access_token,
                orderId: orderId
            }
            distpatch(retrieve(form))
                .then(unwrapResult)
                .then(res => {
                    setOrder(res)
                    if (Number(status) == JOBSTATUS.FINDING_SHIPPER) {
                        distpatch(getJoinedShipper(form))
                            .then(unwrapResult)
                            .then(res => {
                                setShipper(res)
                                const countShipper = res.length
                                if (countShipper > 0) {
                                    Toast.show({
                                        type: ALERT_TYPE.SUCCESS,
                                        title: `Chúng tôi tìm thấy ${countShipper} shipper`,
                                        textBody: "Giờ đây bạn có thể xem và quyết định ai là người vận chuyển đơn hàng của bạn"
                                    })
                                }
                            })
                            .catch(e => console.log(e))
                    }

                })
                .catch(e => console.log(e))
        }

        Animated.loop(
            Animated.timing(animatedColor, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start()
        Animated.loop(
            Animated.timing(animatedScale, {
                toValue: 1.5,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start()
        navigation.getParent().setOptions({
            headerShown: false,
        });

        navigation.setOptions({
            headerTitle: "Thông tin đơn hàng",
            headerLeft: () =>
                <TouchableOpacity onPress={handleBack}>
                    <AntDesign name="left" size={16} color="black" />
                </TouchableOpacity>
        })

    }, [])
    // ---------------------Refesh shipper data--------------
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        if (status == JOBSTATUS.FINDING_SHIPPER) {
            setRefreshing(true);
            distpatch(getJoinedShipper({ access_token: access_token, orderId: orderId }))
                .then(unwrapResult)
                .then(res => {
                    setRefreshing(false)
                    setShipper(res)
                    console.log(res)
                    const countShipper = res.length
                    if (countShipper === 0) {
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: `Đang tìm shipper ở ngần bạn`,
                            textBody: "Sẽ mất một khoảng thời gian ngắn để shipper xác nhận đơn hàng của bạn"
                        })
                    } else {
                        Toast.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: `Chúng tôi tìm thấy ${countShipper} shipper`,
                            textBody: "Giờ đây bạn có thể xem và quyết định ai là người vận chuyển đơn hàng của bạn"
                        })

                    }
                })
                .catch(e => {
                    console.log(e)
                    setRefreshing(false)
                })
        }
    }, []);
    //--------------------------------------------------------

    const handleConfirmShipper = (shipperId) => {
        Alert.alert('Lựa chọn shipper', 'Bạn đã chắc chắn chọn shipper này là người giao đơn hàng của bạn?', [
            {
                text: 'Tiếp tục tìm kiếm',
                style: 'cancel',
            },
            {
                text: 'Chọn', onPress: () => {
                    const data = {
                        access_token: access_token,
                        orderId: order.id,
                        shipperId: shipperId
                    }
                    distpatch(assignJob(data))
                        .then(unwrapResult)
                        .then(res => {
                            setOrder(res)
                        })
                        .catch(e => {
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: `Lựa chọn thất bại`,
                                textBody: "Hãy thử lại sau một vài phút"
                            })
                        })
                }
            },
        ]);

    }

    return (
        <View className="flex-1 relative" >
            <MapView initialRegion={INIT_REGION} className="h-full w-full" >
                <Marker
                    coordinate={{ latitude: INIT_REGION.latitude, longitude: INIT_REGION.longitude }}
                    className="relative flex justify-center items-center w-80 h-80"
                >
                    <Animated.View
                        style={{
                            backgroundColor: color, width: 220, height: 220, borderRadius: 1000,
                            transform: [{ scale: scale }]
                        }}
                    >
                    </Animated.View>
                    <View className="w-4 h-4 bg-red-500 rounded-full absolute bottom-1/2 right-1/2 translate-x-2 translate-y-2"></View>
                </Marker>
            </MapView>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                className=" absolute left-0 top-0 right-0 bottom-0 px-4"
            >
                {/* ----------------Assumption-------------- */}
                <View className="w-full" style={{ height: height * 2 / 3 }}></View>
                {/* ------------Finding------------ */}
                <View className="flex-col items-center bg-white rounded-lg pt-4 pb-12 mb-5">
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
                    {status == JOBSTATUS.FINDING_SHIPPER &&
                        (shipper.length === 0 ?
                            <>
                                <Text className="text-lg font-semibold py-1">Đang tìm tất cả shipper gần bạn</Text>
                                <Text className="text-gray-500">Vui lòng đợi trong ít phút</Text>
                            </>
                            :
                            <>
                                <Text className="text-lg font-semibold pt-1 pb-4">Chúng tôi tìm thấy {shipper.length} shipper</Text>

                                {/* --------List Shipper------------ */}
                                <FlatList
                                    data={shipper}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        const { more, ...s } = item
                                        const { vehicle_number, vehicle } = more
                                        const title = `${vehicle_number} ${vehicle?.name}`
                                        const fullName = `${s?.last_name} ${s?.first_name}`
                                        return (
                                            <View
                                                key={item.id}
                                                className="flex-col border border-gray-300 mx-3 rounded-lg"
                                            >
                                                <View className="flex-row px-3 py-4">
                                                    <View className="basis-2/6 px-3">
                                                        <Image
                                                            source={{ uri: s?.avatar }}
                                                            className="h-12 w-12 "
                                                        />
                                                    </View>
                                                    <View className="basis-4/6 flex-col space-y-1">
                                                        <Text>{fullName}</Text>
                                                        <View className="flex-row items-center space-x-1">
                                                            <AntDesign name="star" size={15} color="#FFB534" />
                                                            <Text className="text-xs text-gray-600">{s.rating}</Text>
                                                        </View>
                                                        <View className="bg-gray-100 rounded-md px-1">
                                                            <Text className="text-xs text-gray-600 font-semibold">{title}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View
                                                    className="flex-row border-t border-gray-300"
                                                >
                                                    <TouchableOpacity
                                                        activeOpacity={1}
                                                        onPress={() => navigation.navigate(ROUTES.VIEW_FEEDBACK_STACK, { shipper: item })}
                                                        className="flex-row flex-1 items-center justify-center py-2 border-r border-gray-300"
                                                    >
                                                        <Text className="font-medium">Xem đánh giá</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        activeOpacity={1}
                                                        className="flex-row flex-1 items-center justify-center"
                                                        onPress={() => handleConfirmShipper(s.id)}
                                                    >
                                                        <Text className="font-medium">Chọn</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            </>
                        )
                    }
                    {status == JOBSTATUS.WAITING_SHIPPER && (
                        <>
                            <Text className="text-lg font-semibold py-1">Shipper đang trên đường đến chỗ bạn</Text>
                            <Text className="text-gray-500">Vui lòng đợi trong ít phút</Text>
                        </>
                    )}

                </View>
                {/* ------------ Order sumary---------- */}
                <View className="flex-col bg-white rounded-lg mb-5">
                    <View className="border-b border-gray-300 py-2">
                        <Text className="text-gray-600 pl-4 py-1">{vehicle?.name}</Text>
                    </View>
                    {/* -----Time----- */}
                    <View className="flex-col px-4 pt-6">
                        <View className="flex-row">
                            <View className="basis-1/6"></View>
                            <View><Text className="basis-5/6 text-gray-600">{shipment?.shipment_date}</Text></View>
                        </View>
                    </View>
                    {/* -----Places and Payment method----- */}
                    <View className="flex-col px-4 pb-4 space-y-4">
                        {/* -----------Delivery Address------------- */}
                        <View className="flex-row ">
                            <View className="basis-1/6 flex justify-center items-center">
                                <Entypo name="circle" size={18} color="#3422F1" />
                            </View>
                            <View className="flex-col basis-5/6 ">
                                <View className="flex-row items-center ">
                                    <Text className="text-lg font-semibold" >{shipment?.pick_up?.short_name}</Text>
                                    {payment?.is_poster_pay && (
                                        <View className="ml-2 p-1 rounded-md bg-gray-300"><Text>{payment?.method?.name}</Text></View>
                                    )}
                                </View>
                                <Text className="text-gray-600">{shipment?.pick_up.long_name}</Text>
                            </View>
                        </View>
                        {/* -----------Pick up------------- */}
                        <View className="flex-row ">
                            <View className="basis-1/6 flex justify-center items-center">
                                <Foundation name="marker" size={28} color="#3422F1" />
                            </View>
                            <View className="flex-col basis-5/6 ">
                                <View className="flex-row items-center ">
                                    <Text className="text-lg font-semibold" >{shipment?.delivery_address.short_name}</Text>
                                    {!payment?.is_poster_pay && (
                                        <View className="ml-2 p-1 rounded-md bg-gray-300"><Text>{payment?.method.name}</Text></View>
                                    )}
                                </View>
                                <Text className="text-gray-600">{shipment?.delivery_address.long_name}</Text>
                            </View>
                        </View>
                    </View>
                    {/* -----------------Share location---------------- */}
                    <View className="border-t border-gray-300 py-4 flex justify-center items-center">
                        <View className="flex-row items-center space-x-1">
                            <Ionicons name="share-outline" size={24} color="black" />
                            <Text className="text-lg font-semibold" >Chia sẻ</Text>
                        </View>
                    </View>
                </View>

                {/* ------------ Additional info ---------- */}
                <View className="flex-col bg-white rounded-lg mb-5 ">
                    <View className="border-b border-gray-300 py-2">
                        <Text className="text-gray-600 pl-4 py-1">Thông tin thêm</Text>
                    </View>
                    <View className="px-4 border-b border-gray-300">
                        <View className="flex-row justify-between items-center py-3">
                            <View className="flex-col">
                                <Text className="text-base  font-semibold">{orderData.uuid}</Text>
                                <Text className="text-gray-600">Mã đơn hàng</Text>
                            </View>
                            <View>
                                <MaterialIcons name="content-copy" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                    <View className="px-4 border-b border-gray-300">
                        <View className="flex-col py-3">
                            <Text className="text-base  font-semibold">{`${shipment?.pick_up.contact} ${shipment?.pick_up.phone_number}`}</Text>
                            <Text className="text-gray-600">Thông tin liên hệ</Text>
                        </View>
                    </View>
                    <View className="flex-col px-4 pt-3 pb-5">
                        <Text className="text-base font-semibold">{product?.category.name}</Text>
                        <Text className="text-base  font-semibold">{product?.quantity} gói hàng</Text>
                        <Text className="text-gray-600">Chi tiết đơn hàng</Text>
                    </View>
                </View>
                {/* -----------------Fee---------------- */}
                <View className="flex-row justify-between items-center bg-white rounded-lg px-4 py-5 mb-14 ">
                    <Text className="text-base font-semibold text-gray-600">{payment?.method.name}</Text>
                    <View className="flex-row space-x-2 items-center">
                        <Text className="text-lg font-bold">{formatCurrency(shipment?.cost)}</Text>
                        <AntDesign name="exclamationcircleo" size={20} color="black" />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default OrderStatus