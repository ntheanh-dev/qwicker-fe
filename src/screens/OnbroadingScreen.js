import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { ROUTES } from '../constants';
import { useDispatch } from 'react-redux';
import { setIsUseAppBefore } from '../redux/appSlice';
const OnbroadingScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const handleDone = () => {
        dispatch(setIsUseAppBefore())
        navigation.navigate(ROUTES.CHOOSEACCOUNT)
    }

    return (
        <SafeAreaView className="flex-1">
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image:
                            (<View>
                                <LottieView style={{ width: 300, height: 300 }} source={require('../assets/animations/onboarding1.json')} autoPlay loop />
                            </View>),
                        title: 'Yên tâm giao hàng nhanh chóng và đảm bảo',
                        subtitle: ''
                    },
                    {
                        backgroundColor: '#fff',
                        image:
                            (<View>
                                <LottieView style={{ width: 300, height: 300 }} source={require('../assets/animations/onboarding4.json')} autoPlay loop />
                            </View>),
                        title: 'Tài xế có thể ứng tiền trước tại điểm lấy hàng',
                        subtitle: ''
                    },
                    {
                        backgroundColor: '#fff',
                        image:
                            (<View>
                                <LottieView style={{ width: 300, height: 300 }} source={require('../assets/animations/onboarding3.json')} autoPlay loop />
                            </View>),
                        title: 'Dịch vụ đa dạng đáp ứng mọi nhu cầu của bạn',
                        subtitle: ''
                    },
                ]}
            />
        </SafeAreaView>
    )
}

export default OnbroadingScreen