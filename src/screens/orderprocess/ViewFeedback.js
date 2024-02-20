import { View, Text, ScrollView, RefreshControl, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBasicUserToken, viewFeedback } from '../../redux/basicUserSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useFetchPaginatedData } from '../../hooks/useFetchPaginatedData'
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';

const ViewFeedback = ({ navigation, route }) => {
    const { shipper } = route.params
    const dispatch = useDispatch()
    const { access_token } = useSelector(getBasicUserToken)
    const [refreshing, setRefreshing] = useState(false);
    const fetcher = useFetchPaginatedData(access_token)

    useEffect(() => {
        dispatch(viewFeedback({ access_token: access_token, shipperId: shipper.id }))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
                const headerTitle = res.count > 0 ? `Đánh giá (${res.count})` : 'Đánh giá'
                navigation.setOptions({
                    headerTitle: headerTitle,
                })
            })
            .catch(e => console.log(e))
    }, [])

    const renderStars = (star) => {
        const arr = []
        for (let i = 1; i <= 5; i++) {
            if (i <= star) {
                arr.push(
                    <MaterialIcons name="star" size={16} color="yellow" />
                )
            } else {
                arr.push(
                    <MaterialIcons name="star-border" size={16} color="black" />
                )
            }
        }
        return arr
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(viewFeedback({ access_token: access_token, shipperId: shipper.id }))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
                const headerTitle = res.count > 0 ? `Đánh giá (${res.count})` : 'Đánh giá'
                navigation.setOptions({
                    headerTitle: headerTitle,
                })
                setRefreshing(false);
            })
            .catch(e => setRefreshing(false))
    }, []);

    //------------------Scroll event--------------------
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            className="flex-1 bg-gray-100 px-2"
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    fetcher.next()
                }
            }}
        >
            {fetcher.results.length > 0 ?
                fetcher.results.map(ele => {
                    const { first_name, last_name, avatar } = ele.user

                    var moment = require('moment-timezone');
                    moment.tz.setDefault('Asia/Ho_Chi_Minh')
                    const date = moment(ele.created_at).format('yy-MM-d')

                    return (
                        <View key={ele.id} className="flex-col p-4 border-b border-gray-300">
                            <View className="flex-row space-x-2 items-center">
                                <View className="rounded-full overflow-hidden">
                                    <Image
                                        className="h-10 w-10"
                                        source={{ uri: avatar }}
                                    />
                                </View>
                                <Text className="text-lg font-medium">{`${first_name} ${last_name}`}</Text>
                            </View>
                            <View className="flex-row py-2">{renderStars(ele.rating)}</View>
                            <Text className="text-xs font-normal text-gray-500">
                                {`Đơn hàng: ${ele.job.product.category.name}`}
                            </Text>
                            <Text className="text-base font-normal py-1">
                                {ele.comment}
                            </Text>
                            <View className="flex-row justify-between mt-2">
                                <Text className="text-xs font-normal text-gray-500">{date}</Text>
                                <View className="flex-row space-x-5 justify-center items-center">
                                    <Entypo name="dots-three-horizontal" size={20} color="gray" />
                                    <AntDesign name="like2" size={20} color="gray" />
                                </View>
                            </View>
                        </View>
                    )
                }
                ) : (
                    <View className="flex-1 justify-center items-center mb-14 opacity-50 pt-40">
                        <Image className="w-28 h-28" source={require('../../assets/images/nonefile.png')} />
                        <Text className="text-lg mt-3">Hiện chưa có đánh giá nào</Text>
                    </View>
                )}
        </ScrollView>
    )
}

export default ViewFeedback