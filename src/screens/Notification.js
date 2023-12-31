import { View, Text, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import { TabView, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';


function NotificaItem(props) {

    return (
        <View className="flex-col space-y-2 py-4 mx-4 border-b border-gray-300">
            <View className="flex-row justify-between">
                <Text className='font-semibold'>Hộp thư đến mới được nâng cấp</Text>
                <Text className='font-semibold'>th 12 21</Text>
            </View>
            <View>
                <Text>Hộp thư đến của bạn bây giờ cũng hiện thị đơn hàng và cập nhập hệ thống</Text>
            </View>
        </View>
    )
}

const NotificationNotFound = ({ type }) => (
    <View className="flex-1 justify-center items-center mb-14 opacity-50">
        <Image className="w-28 h-28" source={require('../assets/images/nonefile.png')} />
        <Text className="text-lg mt-3">Hiện chưa có {type}</Text>
    </View>
)

function FirstRoute({ index }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {index === '1' ? (
                <>
                    <NotificaItem type={'thông báo'} />
                    <NotificaItem type={'thông báo'} />
                </>
            ) : (
                <NotificationNotFound type={'ưu đãi'} />
            )}
        </View>
    )
}


const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
        case '1':
            return <FirstRoute index={route.key} />;
        case '2':
            return <FirstRoute index={route.key} />;
    }
};

const Notification = () => {
    const layout = useWindowDimensions();
    const [text, onChangeText] = React.useState("")

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Thông báo' },
        { key: '2', title: 'Ưu đãi' },
    ]);

    return (
        <SafeAreaView className="flex-1">
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

                    />
                }
            />
        </SafeAreaView>
    );
}

export default Notification