import { RefreshControl, FlatList } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem'
import OrderItemNotFound from './OrderItemNotFound'
import { useDispatch, useSelector } from 'react-redux'
import { getBasicUserToken, myJob } from '../../redux/basicUserSlice'
import { JOBSTATUS } from '../../constants'
import { unwrapResult } from '@reduxjs/toolkit'
import { useFetchPaginatedData } from '../../hooks/useFetchPaginatedData'
const CanceledOrderTab = () => {
    const distpatch = useDispatch()
    const { access_token } = useSelector(getBasicUserToken)
    const [refreshing, setRefreshing] = useState(false);
    const fetcher = useFetchPaginatedData(access_token)

    useEffect(() => {
        const form = { access_token: access_token, params: `status=${JOBSTATUS.CANCELED}` }
        distpatch(myJob(form))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
            })
            .catch(e => console.log(e))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const form = { access_token: access_token, params: `status=${JOBSTATUS.CANCELED}` }
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
    return (
        <FlatList
            data={fetcher.results.length > 0 ? fetcher.results : [{ id: 1 }]}
            className="px-2"
            renderItem={({ item }) => {
                if (fetcher.results.length > 0) {
                    return <OrderItem {...item} />
                } else {
                    return <OrderItemNotFound />
                }
            }}
            keyExtractor={item => item.id}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => fetcher.next()}
        />
    )
}

export default memo(CanceledOrderTab)

