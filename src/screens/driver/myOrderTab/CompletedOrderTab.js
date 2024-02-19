import { RefreshControl, FlatList } from 'react-native'
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
    return (
        <FlatList
            className="px-2"
            data={fetcher.results.length > 0 ? fetcher.results : [{ id: 1 }]}
            renderItem={({ item }) => {
                if (fetcher.results.length > 0) {
                    return <OrderItem {...item} title={title} />
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

export default memo(CompletedOrderTab)