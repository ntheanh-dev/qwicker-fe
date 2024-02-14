import { ScrollView, RefreshControl } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem'
import OrderItemNotFound from './OrderItemNotFound'
import { useDispatch, useSelector } from 'react-redux'
import { getBasicUserToken, myJob } from '../../redux/basicUserSlice'
import { JOBSTATUS } from '../../constants'
import { unwrapResult } from '@reduxjs/toolkit'
import { useFetchPaginatedData } from '../../hooks/fetchPaginatedData'
const ProcessingOrderTab = () => {
    const distpatch = useDispatch()
    const { access_token } = useSelector(getBasicUserToken)
    const [refreshing, setRefreshing] = useState(false);
    const [order, setOrder] = useState()
    const fetcher = useFetchPaginatedData(access_token)

    useEffect(() => {
        const form = { access_token: access_token, params: `status=${JOBSTATUS.FINDING_SHIPPER},${JOBSTATUS.WAITING_PAY}` }
        distpatch(myJob(form))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
            })
            .catch(e => console.log(e))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const form = { access_token: access_token, params: `status=${JOBSTATUS.FINDING_SHIPPER},${JOBSTATUS.WAITING_PAY}` }
        distpatch(myJob(form))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
                setRefreshing(false)
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
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            className="flex-1 bg-gray-100 px-2"
            showsVerticalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    fetcher.next()
                }
            }}
        >
            {fetcher.results.length > 0 ?
                fetcher.results.map(ele => <OrderItem key={ele.id} {...ele} />
                ) : (
                    <OrderItemNotFound />
                )}
        </ScrollView>
    )
}

export default memo(ProcessingOrderTab)