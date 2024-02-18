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

const CanceledOrderTab = ({ title }) => {
    const dispatch = useDispatch()
    const { access_token } = useSelector(getToken)
    const [refreshing, setRefreshing] = useState(false);
    const fetcher = useFetchPaginatedData(access_token)

    useEffect(() => {
        const form = { access_token: access_token, params: `status=${JOBSTATUS.CANCELED}` }
        dispatch(myJobs(form))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
            })
            .catch(e => console.log(e))
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        const form = { access_token: access_token, params: `status=${JOBSTATUS.CANCELED}` }
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
        <>
            {fetcher.results.length > 0 ?
                (<FlatList
                    data={fetcher.results}
                    renderItem={({ item }) => <OrderItem {...item} />}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onEndReached={() => fetcher.next()}
                />
                ) : (
                    <OrderItemNotFound />
                )}
            {fetcher.isLoading && (
                <View className="h-10 flex justify-start items-center">
                    <DotIndicator size={10} color='#3422F1' />
                </View>
            )}
        </>
    )
}

export default memo(CanceledOrderTab)