import * as React from "react";
import { View, useWindowDimensions, Text, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useState } from "react";
import DailyIncomeStatistic from "./DailyIncomeStatistic";
const { height } = Dimensions.get("window");

const renderScene = ({ route }) => {
  switch (route.key) {
    case 1:
      return <DailyIncomeStatistic />;
    case 2:
      return (
        <View className="flex-1">
          <View style={{ height: height / 2 }} className="bg-red-500"></View>
          <View className="flex-1 bg-yellow-500"></View>
        </View>
      );
    case 3:
      return (
        <View className="flex-1">
          <View style={{ height: height / 2 }} className="bg-red-500"></View>
          <View className="flex-1 bg-yellow-500"></View>
        </View>
      );
  }
};

function IncomeStatistic() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 1, title: "Theo Ngày" },
    { key: 2, title: "Theo Tuần" },
    { key: 3, title: "Theo Tháng" },
  ]);

  return (
    <View className="flex-1 bg-[#3422F1]">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: layout.height / 2 }}
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
          />
        )}
      />
    </View>
  );
}

export default IncomeStatistic;
