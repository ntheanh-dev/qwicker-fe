import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem'
import { fakeOrders } from '../../data/index'
import OrderItemNotFound from './OrderItemNotFound'
import { useDispatch, useSelector } from 'react-redux'
import { getBasicUserToken, myJob } from '../../redux/basicUserSlice'
import { JOBSTATUS } from '../../constants'
import { unwrapResult } from '@reduxjs/toolkit'
const CanceledOrderTab = () => {
    const distpatch = useDispatch()
    const { access_token } = useSelector(getBasicUserToken)
    const [refreshing, setRefreshing] = useState(false);
    const [order, setOrder] = useState()

    useEffect(() => {
        const form = { access_token: access_token, params: `status=${JOBSTATUS.CANCELED}` }
        distpatch(myJob(form))
            .then(unwrapResult)
            .then(res => {
                setOrder(res)
            })
            .catch(e => console.log(e))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const form = { access_token: access_token, params: `status=${JOBSTATUS.CANCELED}` }
        distpatch(myJob(form))
            .then(unwrapResult)
            .then(res => {
                setOrder(res)
                setRefreshing(false)
            })
            .catch(e => {
                setRefreshing(false)
            })
    }, []);
    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            className="flex-1 bg-gray-100 px-2"
            showsVerticalScrollIndicator={false}
        >
            {order ?
                order.results.map(ele => <OrderItem key={ele.id} {...ele} />
                ) : (
                    <OrderItemNotFound />
                )}
            <View className="h-80 w-full"></View>
        </ScrollView>
    )
}

export default memo(CanceledOrderTab)

