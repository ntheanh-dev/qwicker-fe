import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons, Entypo, Foundation, Octicons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { ROUTES } from '../../../constants';
import { formatDateToVietnamese, formatMomentDateToVietnamese, getDiffBetweenTwoTime } from '../../../features/ultils';
import { useNavigation } from '@react-navigation/native';

const FILTER_DATA = [{ id: 1, content: 'Tất cả' }, { id: 2, content: 'Ngay bây giờ' }, { id: 3, content: 'Hôm nay' }, { id: 4, content: 'Khác' },]
const SORT_DATA = [{ id: 1, content: 'Thời gian' }, { id: 2, content: 'Địa điểm' }]
const FindOrder = ({ navigation }) => {
    const [showFilter, setShowFilter] = useState(false)
    const [filterIndex, setFilterIndex] = useState(1)
    const [sortIndex, setSortIndext] = useState(1)
    const handleClearFilter = () => {
        setFilterIndex(1)
        setSortIndext(2)
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity className="mr-4"
                    onPress={() => setShowFilter(!showFilter)}
                >
                    <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    })
    return (
        <View className="relative flex-1 px-3 bg-gray-100">
            {showFilter && <TouchableOpacity
                onPress={() => setShowFilter(false)}
                activeOpacity={1}
                className="absolute top-0 left-0 right-0 bottom-0 z-10"
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            >
                <View
                    className="absolute top-0 left-0 right-0 flex-col  px-4 py-5 bg-white"
                >
                    <View className="basis-1/2 flex-col ">
                        <Text className="text-lg font-semibold mb-3">Sắp xếp</Text>
                        <FlatList
                            horizontal={true}
                            data={SORT_DATA}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setSortIndext(item.id)}
                                    key={item.id}
                                    className="flex justify-center items-center py-2 px-6 ml-3 rounded-3xl"
                                    style={item.id === sortIndex && { borderColor: 'rgb(249 ,115 ,22)', borderWidth: 1 }}
                                >
                                    <Text style={{ color: item.id === sortIndex ? 'rgb(249 ,115, 22)' : 'rgb(75, 85, 99)' }}>{item.content}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View className="basis-1/2 flex-col">
                        <Text className="text-lg font-semibold mb-3">Lọc</Text>
                        <FlatList
                            horizontal={true}
                            data={FILTER_DATA}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setFilterIndex(item.id)}
                                    key={item.id}
                                    className="flex justify-center items-center py-2 px-6 ml-3 rounded-3xl"
                                    style={item.id === filterIndex && { borderColor: 'rgb(249 ,115 ,22)', borderWidth: 1 }}
                                >
                                    <Text style={{ color: item.id === filterIndex ? 'rgb(249 ,115, 22)' : 'rgb(75, 85, 99)' }}>{item.content}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                </View>
            </TouchableOpacity>}

            <ScrollView showsVerticalScrollIndicator={false}>

                <Order time="2024-01-14 20:00:00" />
                <Order time="2024-01-14 23:09:00" />
                <Order time="2024-01-15 20:24:00" />
                {/* <Order type={'today'} />
                <Order type={'later'} /> */}

                <View className="h-80 w-full"></View>
            </ScrollView>
            {/* <View className="flex justify-center items-center mt-24">
                <LottieView style={{ width: 250, height: 250 }} source={require('../../assets/animations/onboarding4.json')} loop autoPlay />
                <Text className="text-lg my-3 text-center">Thử xoá tuỳ chọn bộ lọc để xem thêm các đơn hàng</Text>
                <TouchableOpacity className="py-3 px-5 rounded-lg bg-[#3422F1]" onPress={handleClearFilter}>
                    <Text className="text-white font-medium text-xl">Xoá tất cả bộ lọc</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

const Order = ({ data, time }) => {
    const navigation = useNavigation()
    var moment = require('moment-timezone');
    moment.tz.setDefault('Asia/Ho_Chi_Minh')
    const orderTime = moment(time)

    const getType = () => {
        const restTime = getDiffBetweenTwoTime(time)
        if (restTime.day >= 1) {
            return 'later'
        }
        return restTime.hour <= 1 ? 'now' : 'today'
    }
    const type = getType()
    const headerColor = type === 'now' ? 'bg-orange-500' : type === 'today' ? 'bg-yellow-500' : 'bg-[#3422F1]'
    const headerTitle = type === 'now' ? 'Giao ngay' : type === 'today' ? 'Hôm nay' : formatMomentDateToVietnamese(time)
    const headerTime = orderTime.minute() < 10 ? `${orderTime.hour()}:0${orderTime.minute()}` : `${orderTime.hour()}:${orderTime.minute()}`
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.ORDER_DETAIL_DRIVER_TAB, { itemId: 3 })}
            className="flex-col rounded-md overflow-hidden my-2 bg-white pb-3"
        >
            <View className={`flex-row justify-between items-center p-3 ${headerColor}`}>
                <Text className="text-lg text-white">{headerTitle}</Text>
                {type !== 'now' && <View className="flex-row items-center space-x-1">
                    <SimpleLineIcons name="clock" size={18} color="white" />
                    <Text className="text-lg font-medium text-white">{headerTime}</Text>
                </View>}
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
            <View className="flex-row justify-between items-center p-4 ">
                <Ionicons name="cash-outline" size={24} color="#3422F1" />
                <Text className="text-xl font-semibold">đ99999999</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FindOrder
