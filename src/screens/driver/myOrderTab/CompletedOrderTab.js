import { View, ScrollView, RefreshControl } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, myJobs } from '../../../redux/shipperSlice';
import { JOBSTATUS } from '../../../constants';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderItemNotFound from './OrderItemNotFound';
import { useFetchPaginatedData } from '../../../hooks/fetchPaginatedData';

const CompletedOrderTab = ({ title }) => {
    const dispatch = useDispatch()
    const { access_token } = useSelector(getToken)
    const [refreshing, setRefreshing] = useState(false);
    const fetcher = useFetchPaginatedData(access_token)


    useEffect(() => {
        const form = { access_token: access_token, params: `status=${JOBSTATUS.DONE},${JOBSTATUS.WAITING_PAY}` }
        dispatch(myJobs(form))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
            })
            .catch(e => console.log(e))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const form = { access_token: access_token, params: `status=${JOBSTATUS.DONE},${JOBSTATUS.WAITING_PAY}` }
        dispatch(myJobs(form))
            .then(unwrapResult)
            .then(res => {
                setRefreshing(false)
                fetcher.setData(res)
            })
            .catch(e => {
                setRefreshing(false)
            })
    }, []);
    //------------------Scroll event--------------------
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }
    return (
        <View className="flex-1 bg-gray-100 px-4">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        fetcher.next()
                    }
                }}
            >
                {fetcher.results.length > 0 ? (
                    fetcher.results.map(ele => <OrderItem key={ele.id} {...ele} title={title} />)
                ) : (
                    <>
                        <View className="h-40 w-full"></View>
                        <OrderItemNotFound className="pt-40" />
                    </>
                )}
                <View className="h-80 w-full"></View>
            </ScrollView>
        </View>
    )
}

export default memo(CompletedOrderTab)