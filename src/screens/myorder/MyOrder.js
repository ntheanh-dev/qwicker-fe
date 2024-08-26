import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Entypo, Feather } from "@expo/vector-icons";
import ProcessingOrderTab from "./ProcessingOrderTab";
import DoneOrderTab from "./DoneOrderTab";
import CanceledOrderTab from "./CanceledOrderTab";
import { ROUTES } from "../../constants";

const renderScene = ({ route, jumpTo }) => {
  switch (route.key) {
    case 1:
      return <ProcessingOrderTab index={route.key} />;
    case 2:
      return <DoneOrderTab index={route.key} />;
    case 3:
      return <CanceledOrderTab index={route.key} />;
  }
};

export default function MyOrder({ navigation, route }) {
  const tabIndex = route?.params?.tabIndex || 0;
  const layout = useWindowDimensions();
  const [text, setText] = React.useState("");

  const [index, setIndex] = React.useState(tabIndex);
  const [routes] = React.useState([
    { key: 1, title: "Đang tải" },
    { key: 2, title: "Đã hoàn thành" },
    { key: 3, title: "Đã huỷ" },
  ]);

  return (
    <View className="flex-1">
      <TouchableOpacity
        className="bg-white px-3 relative"
        onPress={() =>
          navigation.navigate(ROUTES.SEARCH_ORDER_DRAWER, { index: index })
        }
      >
        <View className="bg-gray-200 rounded-lg text-lg px-9 py-2">
          <Text className="text-base text-gray-600">
            Tìm kiếm tất cả các đơn hàng
          </Text>
        </View>
        <View className="flex justify-center items-center absolute left-5 top-2">
          <Entypo name="magnifying-glass" size={22} color="gray" />
        </View>
        <TouchableOpacity
          className="flex justify-center items-center absolute right-5 top-2"
          onPress={() => setText("")}
        >
          <Feather name="x" size={22} color="gray" />
        </TouchableOpacity>
      </TouchableOpacity>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "white" }}
            activeColor={"black"}
            inactiveColor={"gray"}
            indicatorStyle={{
              backgroundColor: "#3422F1",
            }}
            pressColor="rgba(0, 0, 0, 0)"
          />
        )}
      />
    </View>
  );
}
