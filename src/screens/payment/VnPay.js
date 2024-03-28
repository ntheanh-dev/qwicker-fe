import { View, Text } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import WebView from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { checkOutSuccess, getBasicUserToken } from '../../redux/basicUserSlice';
import { unwrapResult } from '@reduxjs/toolkit';


export default function VnPay({ navigation, route }) {
    const dispatch = useDispatch()
    const { paymentURL, orderId, paymentId } = route.params
    const { access_token } = useSelector(getBasicUserToken)
    const handleNavigationChange = useCallback((newNav) => {
        const { title, url } = newNav;
        if (title === "Kết quả thanh toán") {
            if (url.includes('vnp_ResponseCode=00')) {
                dispatch(checkOutSuccess({ access_token: access_token, orderId: orderId, paymentId: paymentId }))
                    .then(unwrapResult)
                    .then(res => {
                        Toast.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: "Thanh toán thành công",
                        })

                        setTimeout(() => {
                            navigation.navigate('Đơn hàng', { tabIndex: 1 })
                        }, 3000)
                    })
                    .catch(e => console.log(e))
            } else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Thanh toán thất bại",
                })
                setTimeout(() => {
                    navigation.navigate(ROUTES.REVIEW_ORDER_DRAWER, { orderId: orderId })
                }, 3000)
            }
        }
    }, [paymentURL])

    useEffect(() => {
        navigation.getParent().setOptions({
            headerShown: false
        });
    })

    return (
        <View className="flex-1">
            <WebView
                className="flex-1"
                source={{ uri: paymentURL }}
                onNavigationStateChange={newNav => handleNavigationChange(newNav)}
            />
        </View>
    )
}