import { View, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem';
import { fakeOrders } from '../../../data';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, myJobs } from '../../../redux/shipperSlice';
import { JOBSTATUS } from '../../../constants';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderItemNotFound from './OrderItemNotFound';

const ProcessingOrderTab = ({ title }) => {
    const dispatch = useDispatch()
    const { access_token } = useSelector(getToken)
    const [refreshing, setRefreshing] = useState(false);
    const [order, setOrder] = useState()

    useEffect(() => {
        const form = { access_token: access_token, params: `status=${JOBSTATUS.WAITING_SHIPPER}` }
        dispatch(myJobs(form))
            .then(unwrapResult)
            .then(res => {
                setOrder(res)
            })
            .catch(e => console.log(e))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const form = { access_token: access_token, params: `status=${JOBSTATUS.WAITING_SHIPPER}` }
        dispatch(myJobs(form))
            .then(unwrapResult)
            .then(res => {
                setRefreshing(false)
                setOrder(res)
            })
            .catch(e => {
                setRefreshing(false)
            })
    }, []);

    return (
        <View className="flex-1 bg-gray-100 px-4">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {order?.results?.length > 0 ? (
                    order.results.map(ele => <OrderItem key={ele.id} {...ele} title={title} />)
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

export default memo(ProcessingOrderTab)