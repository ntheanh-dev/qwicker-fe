import { View, Text, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, AntDesign } from '@expo/vector-icons';

const AddCommentForCourier = ({ navigation }) => {
    const [word, setWord] = useState(10)
    const [txt, setText] = useState('')
    // useEffect(() => {

    // }, [])
    const handleTextChange = (t) => {
        setText(t)
        setWord(word => word -= 1)
    }
    const handleSubmit = () => {
        navigation.goBack()
    }
    return (
        <View className="flex-1 py-20 px-4">
            <View className="relative">
                <TextInput
                    className="w-full h-56 border border-gray-600 rounded-xl pt-5 pb-20 px-4 text-base"
                    placeholder="Thêm hướng dẫn giao hàng tại đây"
                    multiline={true}
                    textAlignVertical="top"
                    value={txt}
                    onChangeText={t => handleTextChange(t)}
                    maxLength={10}
                />
                <Text className="text-base text-gray-500 absolute left-4 bottom-4">Ký tự còn lại: {word}</Text>
                <TouchableHighlight
                    underlayColor={'rbga(0,0,0,0)'}
                    className="bg-white rounded-lg w-full flex justify-center items-center h-14 mt-5"
                    style={false && { backgroundColor: '#3422F1' }}
                    onPress={handleSubmit}
                >
                    <Text className="text-lg font-medium" style={false && { color: 'white' }}>Lưu</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default AddCommentForCourier