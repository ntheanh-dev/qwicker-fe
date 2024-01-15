import * as React from 'react';
import { View, useWindowDimensions, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Entypo, Feather } from '@expo/vector-icons';
import OrderItem from './OrderItem';
import OrderItemNotFound from './OrderItemNotFound';
import CompletedOrderTab from './CompletedOrderTab';

function FirstRoute({ index }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#E5E7EB' }}>
            <OrderItemNotFound />
        </View>
    )
}

const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
        case 1:
            return <FirstRoute index={route.key} />;
        case 2:
            return <CompletedOrderTab index={route.key} />;
        case 3:
            return <FirstRoute index={route.key} />;
    }
};

export default function MyOrder() {
    const layout = useWindowDimensions();
    const [text, setText] = React.useState("")

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 1, title: 'Đang tải' },
        { key: 2, title: 'Đã hoàn thành' },
        { key: 3, title: 'Đã huỷ' },
    ]);

    return (
        <View className="flex-1">
            <View className="bg-white px-3 relative">
                <TextInput
                    className="bg-gray-200 rounded-lg text-lg py-2 px-9"
                    placeholder='Tìm kiếm tất cả các đơn hàng'
                    onChangeText={txt => setText(txt)}
                    value={text}
                />
                <View className="flex justify-center items-center absolute left-5 top-2" >
                    <Entypo name="magnifying-glass" size={22} color="gray" />
                </View>
                <TouchableOpacity className="flex justify-center items-center absolute right-5 top-2" onPress={() => setText('')}>
                    <Feather name="x" size={22} color="gray" />
                </TouchableOpacity>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{ backgroundColor: 'white' }}
                        activeColor={"black"}
                        inactiveColor={"gray"}
                        indicatorStyle={{
                            backgroundColor: '#3422F1'
                        }}
                        pressColor='rgba(0, 0, 0, 0)'
                    />
                }
            />
        </View>
    );
}