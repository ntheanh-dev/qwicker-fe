import { View, Text, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";

import { Feather, MaterialCommunityIcons, Ionicons, Foundation, Entypo, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { formatMomentDateToVietnamese2 } from '../../features/ultils';
const comments = [{ id: 1, content: 'Thái độ tốt' }, { id: 2, content: 'Tình trạng phương tiện tốt' }, { id: 3, content: 'Rất đúng giờ' }, { id: 4, content: 'Phản hồi nhanh chóng' }]
const ReviewOrder = ({ navigation, route }) => {
    const { data } = route.params
    const refRBSheet = useRef();
    const [isReviewed, setIsReviewed] = useState(true)
    const [star, setStar] = useState(5)
    const [text, setText] = useState('')
    const renderStars = () => {
        const handleSetStar = (i) => {
            if (star === i) {
                setStar(i - 1)
            } else {
                setStar(i)
            }
        }
        const arr = []
        for (let i = 1; i <= 5; i++) {
            if (i <= star) {
                arr.push(<TouchableOpacity key={i} onPress={() => handleSetStar(i)}>
                    <MaterialIcons name="star" size={34} color="yellow" />
                </TouchableOpacity>
                )
            } else {
                arr.push(<TouchableOpacity key={i} onPress={() => handleSetStar(i)}>
                    <MaterialIcons name="star-border" size={34} color="black" />
                </TouchableOpacity>
                )
            }
        }
        return arr
    }
    const handlePressBottomBTN = () => {
        if (!isReviewed) {
            refRBSheet.current.open()
        }
    }
    const handleChooseRecommedFeadback = (comment) => {
        if (text === '') {
            setText(comment)
        } else {
            setText(text => `${text}, ${comment.toLowerCase()}`)
        }
    }
    return (
        <View className="p-2 flex-1 flex-col relative">
            <ScrollView>
                <View className="bg-white p-4 flex-col mb-4">
                    <View className="flex-row space-x-4">
                        <View className="basis-1/6 px-3">
                            <Image
                                source={require('../../assets/logo/user.png')}
                                className="h-12 w-12 "
                            />
                        </View>
                        <View className="basis-5/6 flex-col space-y-1">
                            <Text>Nguyễn Văn Long</Text>
                            {isReviewed ? (
                                <View className="bg-gray-100 rounded-md px-1 w-28">
                                    <Text className="text-xs text-gray-600 font-semibold">68C-12869 Truck</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    className="flex-row space-x-1 items-center"
                                    onPress={handlePressBottomBTN}
                                >
                                    <MaterialIcons name="star-border" size={20} color="#3422F1" />
                                    <Text className="text-md text-[#3422F1] font-semibold">Đánh giá ngay</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    </View>
                    <View className="flex-row pt-8">
                        <View className="flex-1 flex-row space-x-2 justify-center items-center">
                            <MaterialCommunityIcons name="android-messages" size={24} color="#3422F1" />
                            <Text className="text-base font-semibold">Nhắn ngay</Text>
                        </View>
                        <View className="flex-1 flex-row space-x-2 justify-center items-center">
                            <Feather name="phone" size={24} color="#3422F1" />
                            <Text className="text-base font-semibold">Gọi ngay</Text>
                        </View>
                    </View>
                </View>


                <View className="flex-row bg-white p-4 space-x-4 items-center mb-4">
                    <Ionicons name="cash-outline" size={24} color="#3422F1" />
                    <View className="flex-col">
                        <Text className="text-xl font-semibold">{`đ${data.price.toLocaleString('en-US')}`}</Text>
                        <Text className="text-base font-medium text-gray-400 ">Thu tiền mặt</Text>
                    </View>
                </View>
                <View className="flex-col bg-white p-4 ">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-base text-gray-500">{formatMomentDateToVietnamese2(data.time)}</Text>
                        <Text className="text-gray-600 text-base">{`#${data.uuid}`}</Text>
                    </View>
                    <TouchableOpacity className="bg-blue-100 rounded-md flex-row space-x-2 py-3 px-6 my-4 items-center">
                        <Foundation name="clipboard-pencil" size={24} color="black" />
                        <Text>Cần xác nhận giao hàng thành công tại điểm trả hàng.</Text>
                    </TouchableOpacity>

                    <View className="flex-row space-x-2">
                        <View className="mt-2 relative">
                            <Entypo name="circle" size={18} color="#3422F1" />
                            <View className="border-l-2 border-dotted border-[#3422F1] flex-1 absolute top-6 bottom-0 left-1/2" style={{ width: 1 }}></View>
                        </View>

                        <View className="basis-5/6 flex-col">
                            <Text className="text-xl font-semibold">{data.pickUp.title}</Text>
                            <Text className="text-lg text-gray-600">{data.pickUp.location}</Text>
                            <Text className="text-lg text-gray-600">{`A Phat: 0373054756`}</Text>
                        </View>
                        <View className="basis-1/6 flex justify-center items-start">
                            <FontAwesome name="location-arrow" size={30} color="#3422F1" />
                        </View>
                    </View>
                    <View className="flex-row space-x-2">
                        <View className="mt-2 relative">
                            <Foundation name="marker" size={22} color="#3422F1" />
                        </View>

                        <View className="basis-5/6 flex-col mt-2">
                            <Text className="text-xl font-semibold">{data.deliveryAddress.title}</Text>
                            <Text className="text-lg text-gray-600">{data.deliveryAddress.location}</Text>
                            <Text className="text-lg text-gray-600">{`A Phat: 0373054756`}</Text>
                        </View>
                        <View className="basis-1/6 flex justify-center items-start">
                            <FontAwesome name="location-arrow" size={30} color="#3422F1" />
                        </View>
                    </View>
                </View>
                <View className="h-40"></View>
            </ScrollView>


            <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-300 px-4 py-6">
                <TouchableOpacity
                    underlayColor={'rbga(0,0,0,0)'}
                    className={`rounded-lg w-full flex justify-center items-center h-14 bg-[#3422F1]`}
                >
                    <Text className="text-lg font-medium text-white" >Đặt lại đơn hàng</Text>
                </TouchableOpacity>
            </View>

            <RBSheet
                ref={refRBSheet}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.3)"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        overflow: 'hidden'
                    }
                }}
                height={410}
            >
                <View className="h-full w-full flex-col">
                    <View className="py-3 border-b border-gray-300 relative">
                        <Text className="text-center text-lg font-semibold">Đánh giá theo trải nghiệm của bạn</Text>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()} className="absolute right-4 top-1/2">
                            <MaterialCommunityIcons name="window-close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center space-x-2 py-4">
                        {renderStars().map(ele => ele)}
                    </View>
                    <View className="flex-row flex-wrap justify-center">
                        {comments.map(ele => (
                            <TouchableOpacity
                                onPress={() => handleChooseRecommedFeadback(ele.content)}
                                key={ele.id}
                                underlayColor={'white'}
                                className='rounded-3xl p-3 border border-gray-600 m-2'
                            >
                                <Text
                                    className="text-base font-medium"
                                >
                                    {ele.content}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="px-4 mt-4">
                        <TextInput
                            className="bg-gray-200 rounded-lg text-lg py-2 px-4 mb-4"
                            placeholder='Nhập bình luận của bạn'
                            onChangeText={txt => setText(txt)}
                            value={text}
                        />
                        <TouchableOpacity
                            underlayColor={'rbga(0,0,0,0)'}
                            className={`rounded-lg w-full flex justify-center items-center h-14 ${text.length > 0 ? 'bg-[#3422F1]' : 'bg-gray-400'}`}
                        >
                            <Text className="text-lg font-medium text-white" >ĐÁNH GIÁ</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </RBSheet>
        </View>
    )
}

export default ReviewOrder