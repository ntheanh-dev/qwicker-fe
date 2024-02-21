import { useEffect, useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native'
import { Entypo, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JOBSTATUS, ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchPaginatedData } from '../../hooks/useFetchPaginatedData';
import useDebounce from '../../hooks/useDebouce'
import { getBasicUserToken, myJob } from '../../redux/basicUserSlice'
import { unwrapResult } from '@reduxjs/toolkit';
import OrderItem from './OrderItem'
import OrderItemNotFound from './OrderItemNotFound';
const SearchOrder = ({ navigation, route }) => {
    const [text, setText] = useState('')
    const { access_token } = useSelector(getBasicUserToken)
    const dispatch = useDispatch()
    const { index } = route.params
    const status = index === 0 ? `${JOBSTATUS.FINDING_SHIPPER},${JOBSTATUS.WAITING_PAY}` : (index === 1 ? JOBSTATUS.DONE : JOBSTATUS.CANCELED)
    const debounceValue = useDebounce(text, 600)
    const fetcher = useFetchPaginatedData(access_token)
    useEffect(() => {
        console.log(status)
        if (!debounceValue.trim()) {
            return
        }
        const form = { access_token: access_token, params: `status=${status}&kw=${text}` }
        dispatch(myJob(form))
            .then(unwrapResult)
            .then(res => {
                fetcher.setData(res)
            })
            .catch(e => console.log(e))
    }, [debounceValue])

    const handleBack = () => {
        setText('')
        fetcher.setData({
            count: 0,
            links: {},
            results: []
        })
        navigation.navigate('Đơn hàng')
    }

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-row space-x-1 items-center py-3 ">
                <View className="pl-2 relative" style={{ width: '83%' }}>
                    <TextInput
                        className="bg-gray-200 rounded-lg py-3 px-9"
                        style={{ fontSize: 18 }}
                        placeholder='Tìm kiếm theo thông tin giao hàng'
                        onChangeText={txt => setText(txt)}
                        value={text}
                    />
                    <View className="flex justify-center items-center absolute left-4 top-3" >
                        <Entypo name="magnifying-glass" size={22} color="gray" />
                    </View>
                    {text.length > 0 && (
                        <TouchableOpacity className="flex justify-center items-center absolute right-2 top-3" onPress={() => setText('')}>
                            <Feather name="x" size={22} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity onPress={handleBack}>
                    <Text className="float-right text-base font-medium text-[#3422F1]">Huỷ bỏ</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                className="px-2"
                data={fetcher.results.length > 0 ? fetcher.results : [{ id: 1 }]}
                renderItem={({ item }) => {
                    if (fetcher.results.length > 0) {
                        return <OrderItem {...item} />
                    } else {
                        return text.length > 0 && <OrderItemNotFound />
                    }
                }}
                keyExtractor={item => item.id}
                onEndReached={() => fetcher.next()}
            />
        </SafeAreaView>
    )
}

export default SearchOrder