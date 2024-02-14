import { View, Text, TouchableOpacity, ScrollView, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { MaterialCommunityIcons, Entypo, Foundation, Octicons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { JOBSTATUS, ROUTES } from '../../../constants';
import { formatMomentDateToVietnamese, getDiffBetweenTwoTime } from '../../../features/ultils';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Order from './Order';
import { useDispatch, useSelector } from 'react-redux';
import { findJob, getToken } from '../../../redux/shipperSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { urlAuthAPI } from '../../../configs/API';
import { useFetchPaginatedData } from '../../../hooks/fetchPaginatedData';

const FILTER_DATA = [{ id: 1, content: 'Tất cả' }, { id: 2, content: 'Ngay bây giờ' }, { id: 3, content: 'Hôm nay' }, { id: 4, content: 'Khác' },]
const SORT_DATA = [{ id: 1, content: 'Thời gian' }, { id: 2, content: 'Địa điểm' }]
const DATA = [{ id: 1, pickUp: 'Thanh Xuan', deliveryAddress: 'Ha Noi', comment: "Giao hai thung bia", price: 123000, time: "2024-01-14 20:00:00" },
{ id: 2, pickUp: 'Thanh Xuan', deliveryAddress: 'Ha Noi', comment: "Giao hai thung bia", price: 123000, time: "2024-01-14 23:00:00" },
{ id: 3, pickUp: 'Thanh Xuan', deliveryAddress: 'Ha Noi', price: 123000, time: "2024-01-17 20:00:00" },]
const FindOrderTab = ({ navigation }) => {
    const dispath = useDispatch()
    const { access_token } = useSelector(getToken)

    const [filter, updateFilter] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        showFilter: false,
        filterIndex: 1,
        sortIndex: 1
    })
    const fetcher = useFetchPaginatedData(access_token)
    const handleClearFilter = () => {
        updateFilter({
            filterIndex: 1,
            sortIndex: 1
        })
    }
    const handleApplyFilter = () => {
        updateFilter({ showFilter: false })
    }
    useEffect(() => {
        if (access_token) {
            dispath(findJob(access_token))
                .then(unwrapResult)
                .then(res => {
                    fetcher.setData(res)
                })
                .catch(e => console.log(e))
        }
    }, [])
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity className="mr-4"
                    onPress={() => updateFilter({ showFilter: !filter.showFilter })}
                >
                    <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    }, [])
    // ---------------------Refesh order data--------------
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispath(findJob(access_token,))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
                setRefreshing(false)
            })
            .catch(e => setRefreshing(false))
    }, []);
    //------------------Scroll event--------------------
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }
    return (
        <View className="relative flex-1 px-3 bg-gray-100 pb-20">
            {/* ---------------Filter space--------------- */}
            {filter.showFilter && <TouchableOpacity
                onPress={handleApplyFilter}
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
                                    onPress={() => updateFilter({ sortIndex: item.id })}
                                    key={item.id}
                                    className="flex justify-center items-center py-2 px-6 ml-3 rounded-3xl"
                                    style={item.id === filter.sortIndex && { borderColor: 'rgb(249 ,115 ,22)', borderWidth: 1 }}
                                >
                                    <Text style={{ color: item.id === filter.sortIndex ? 'rgb(249 ,115, 22)' : 'rgb(75, 85, 99)' }}>{item.content}</Text>
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
                                    onPress={() => updateFilter({ filterIndex: item.id })}
                                    key={item.id}
                                    className="flex justify-center items-center py-2 px-6 ml-3 rounded-3xl"
                                    style={item.id === filter.filterIndex && { borderColor: 'rgb(249 ,115 ,22)', borderWidth: 1 }}
                                >
                                    <Text style={{ color: item.id === filter.filterIndex ? 'rgb(249 ,115, 22)' : 'rgb(75, 85, 99)' }}>{item.content}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                </View>
            </TouchableOpacity>}
            {/* ---------------Data space----------------- */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        fetcher.next()
                    }
                }}
            >
                {fetcher.results.length > 0 ? (
                    fetcher.results.map(ele => (
                        <Order key={ele.id} data={ele} />
                    ))
                ) : (
                    <View className="flex justify-center items-center mt-24">
                        <LottieView style={{ width: 250, height: 250 }} source={require('../../../assets/animations/onboarding4.json')} loop autoPlay />
                        <Text className="text-lg my-3 text-center">Thử xoá tuỳ chọn bộ lọc để xem thêm các đơn hàng</Text>
                        <TouchableOpacity className="py-3 px-5 rounded-lg bg-[#3422F1]" onPress={handleClearFilter}>
                            <Text className="text-white font-medium text-xl">Xoá tất cả bộ lọc</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}


export default FindOrderTab;
