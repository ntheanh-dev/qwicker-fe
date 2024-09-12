import * as React from "react";
import { View, useWindowDimensions, Text, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useState } from "react";
import WeeklyIncomeStatistic from "./WeeklyIncomeStatistic";
const { height } = Dimensions.get("window");

function IncomeStatistic() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 1, title: "Theo Ngày" },
    { key: 2, title: "Theo Tuần" },
    { key: 3, title: "Theo Tháng" },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 1:
        return (
          <View className="flex-1">
            <View style={{ height: height / 2 }} className="bg-red-500"></View>
            <View className="flex-1 bg-yellow-500"></View>
          </View>
        );
      case 2:
        return <WeeklyIncomeStatistic parentIndex={index} />;
      case 3:
        return (
          <View className="flex-1">
            <View style={{ height: height / 2 }} className="bg-red-500"></View>
            <View className="flex-1 bg-yellow-500"></View>
          </View>
        );
    }
  };
  return (
    <View className="flex-1 bg-[#3422F1]">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: layout.height / 2 }}
        lazy={false}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "#3422F1" }}
            indicatorStyle={{
              backgroundColor: "white",
            }}
            activeColor="white"
            inactiveColor="rgba(255, 255, 255, 0.6)"
            pressColor="rgba(0, 0, 0, 0)"
            // renderLabel={({ route }) => <Text >{route.title}</Text>}
          />
        )}
      />
    </View>
  );
}

export default IncomeStatistic;
