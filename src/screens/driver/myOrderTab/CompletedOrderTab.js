import { View, RefreshControl, FlatList } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, myJobs } from '../../../redux/shipperSlice';
import { JOBSTATUS } from '../../../constants';
import { unwrapResult } from '@reduxjs/toolkit';
import OrderItemNotFound from './OrderItemNotFound';
import { useFetchPaginatedData } from '../../../hooks/fetchPaginatedData';
import { DotIndicator } from 'react-native-indicators';

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
        <View className="flex-1 bg-gray-100 px-4">
            {fetcher.results.length > 0 ? (
                <FlatList
                    data={fetcher.results}
                    renderItem={({ item }) => <OrderItem {...item} title={title} />}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onEndReached={() => fetcher.next()}
                />
            ) : (
                <OrderItemNotFound className="pt-40" />
            )}
            {fetcher.isLoading && (
                <View className="pb-4 py-2">
                    <DotIndicator size={10} color='#3422F1' />
                </View>
            )}
        </View>
    )
}

export default memo(CompletedOrderTab)