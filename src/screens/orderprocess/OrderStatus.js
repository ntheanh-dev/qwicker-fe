import { View, Text, Dimensions, Animated, ScrollView, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons, Ionicons, Entypo, Foundation, AntDesign, } from '@expo/vector-icons';
import { Easing, } from 'react-native-reanimated';
import Dialog from "react-native-dialog";

const INIT_REGION = {
    latitude: 10.678650548923207,
    longitude: 106.68931532247792,
    latitudeDelta: 0.09,
    longitudeDelta: 0.03,
}
const shipper = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 },]
const { height } = Dimensions.get('window')
const OrderStatus = ({ navigation }) => {
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

    useEffect(() => {
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

    }, [])
    // ---------------------Refesh shipper data--------------
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    //--------------------------------------------------------
    const [showDialogConfirm, setShowDialogConfim] = useState(false)

    const handleConfirmShipper = () => {
        setShowDialogConfim(false)
    }
    const handleChooseShipper = (data) => {
        /// Update dialgon ui with specific data
        setShowDialogConfim(true)
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
                    {/* <Text className="text-lg font-semibold py-1">Đang tìm tất cả tài xế gần bạn</Text>
                    <Text className="text-gray-500">Vui lòng đợi trong ít phút</Text> */}
                    <Text className="text-lg font-semibold pt-1 pb-4">Chúng tôi tìm thấy 99 tài xế</Text>

                    {/* --------List Shipper------------ */}
                    <FlatList
                        data={shipper}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={c => (
                            <View
                                key={c.item.id}
                                className="flex-col border border-gray-300 mx-3 rounded-lg"
                            >
                                <View className="flex-row px-3 py-4">
                                    <View className="basis-2/6 px-3">
                                        <Image
                                            source={require('../../assets/logo/user.png')}
                                            className="h-12 w-12 "
                                        />
                                    </View>
                                    <View className="basis-4/6 flex-col space-y-1">
                                        <Text>Nguyễn Văn Long</Text>
                                        <View className="flex-row items-center space-x-1">
                                            <AntDesign name="star" size={15} color="#FFB534" />
                                            <Text className="text-xs text-gray-600">5.00</Text>
                                        </View>
                                        <View className="bg-gray-100 rounded-md px-1">
                                            <Text className="text-xs text-gray-600 font-semibold">68C-12869 Truck</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => handleChooseShipper({ name: 'a' })}
                                    className="flex-row justify-center items-center py-2 space-x-1 border-t border-gray-300"
                                >
                                    <AntDesign name="totop" size={18} color="black" />
                                    <Text className="font-medium">Chọn</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    {/* -------Dialog confirm choosing shipper */}
                    <Dialog.Container visible={showDialogConfirm} className="rounded-3xl relative">
                        <Dialog.Title>
                            <Text className="text-2xl">Bạn có chắc chắn không?</Text>
                        </Dialog.Title>
                        <View className="flex-row px-3 py-4 items-center">
                            <View className="basis-2/6 px-3">
                                <Image
                                    source={require('../../assets/logo/user.png')}
                                    className="h-14 w-14 "
                                />
                            </View>
                            <View className="basis-4/6 flex-col space-y-1">
                                <Text>Nguyễn Văn Long</Text>
                                <View className="flex-row items-center space-x-1">
                                    <AntDesign name="star" size={15} color="#FFB534" />
                                    <Text className="text-xs text-gray-600">5.00</Text>
                                </View>
                                <View className="bg-gray-100 rounded-md px-1">
                                    <Text className="text-xs text-gray-600 font-semibold">68C-12869 Truck</Text>
                                </View>
                            </View>
                        </View>
                        <View className="px-3 mt-2">
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={handleConfirmShipper}
                                className="w-full bg-[#3422F1] rounded-xl py-2 flex-row justify-center "
                            >
                                <Text className="text-lg font-semibold text-white">Chọn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="w-full flex-row justify-center py-4"
                                onPress={() => setShowDialogConfim(false)}
                            >
                                <Text className="text-lg font-semibold text-[#3422F1]">Tiếp tục tìm kiếm shipper</Text>
                            </TouchableOpacity>
                        </View>
                    </Dialog.Container>

                </View>
                {/* ------------ Order sumary---------- */}
                <View className="flex-col bg-white rounded-lg mb-5">
                    <View className="border-b border-gray-300 py-2">
                        <Text className="text-gray-600 pl-4 py-1">Truck 50000000kg</Text>
                    </View>
                    {/* -----Time----- */}
                    <View className="flex-col px-4 pt-6">
                        <View className="flex-row">
                            <View className="basis-1/6"></View>
                            <View><Text className="basis-5/6 text-gray-600">Hôm nay 20:11</Text></View>
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
                                    <Text className="text-lg font-semibold" >5, Hẻm 89</Text>
                                    <View className="ml-2 p-1 rounded-md bg-gray-300"><Text>Tiền mặt</Text></View>
                                </View>
                                <Text className="text-gray-600">5 89, Tổ 3, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam</Text>
                            </View>
                        </View>
                        {/* -----------Pick up------------- */}
                        <View className="flex-row ">
                            <View className="basis-1/6 flex justify-center items-center">
                                <Foundation name="marker" size={28} color="#3422F1" />
                            </View>
                            <View className="flex-col basis-5/6 ">
                                <View className="flex-row items-center ">
                                    <Text className="text-lg font-semibold" >5, Hẻm 89</Text>
                                    <View className="ml-2 p-1 rounded-md bg-gray-300"><Text>Tiền mặt</Text></View>
                                </View>
                                <Text className="text-gray-600">5 89, Tổ 3, Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam</Text>
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
                                <Text className="text-base  font-semibold">99999999999999999999</Text>
                                <Text className="text-gray-600">Mã đơn hàng</Text>
                            </View>
                            <View>
                                <MaterialIcons name="content-copy" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                    <View className="px-4 border-b border-gray-300">
                        <View className="flex-col py-3">
                            <Text className="text-base  font-semibold">0373506769</Text>
                            <Text className="text-gray-600">Thông tin liên hệ</Text>
                        </View>
                    </View>
                    <View className="flex-col px-4 pt-3 pb-5">
                        <Text className="text-base font-semibold">Food & Beverage</Text>
                        <Text className="text-base  font-semibold">1 gói hàng</Text>
                        <Text className="text-gray-600">Delivery item details</Text>
                    </View>
                </View>
                {/* -----------------Fee---------------- */}
                <View className="flex-row justify-between items-center bg-white rounded-lg px-4 py-5 mb-14 ">
                    <Text className="text-base font-semibold text-gray-600">Tiền mặt</Text>
                    <View className="flex-row space-x-2 items-center">
                        <Text className="text-lg font-bold">đ36.396</Text>
                        <AntDesign name="exclamationcircleo" size={20} color="black" />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default OrderStatus