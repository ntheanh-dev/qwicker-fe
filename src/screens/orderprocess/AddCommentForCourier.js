import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/orderSlice';

const AddCommentForCourier = ({ navigation }) => {
    const [word, setWord] = useState(500)
    const [txt, setText] = useState('')
    const dispatch = useDispatch()
    const handleTextChange = (t) => {
        setText(t)
        setWord(word => word -= 1)
    }
    const handleSubmit = () => {
        if (txt.length > 0) {
            dispatch(addComment(txt))
            navigation.goBack()
        }
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
                    maxLength={500}
                />
                <Text className="text-base text-gray-500 absolute left-4 top-48">Ký tự còn lại: {word}</Text>
                <TouchableHighlight
                    underlayColor={'rbga(0,0,0,0)'}
                    className="bg-white rounded-lg w-full flex justify-center items-center h-14 mt-5"
                    style={txt.length > 0 && { backgroundColor: '#3422F1' }}
                    onPress={handleSubmit}
                >
                    <Text className="text-lg font-medium" style={txt.length > 0 && { color: 'white' }}>Lưu</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default AddCommentForCourier