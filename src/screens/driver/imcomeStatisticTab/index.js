import * as React from "react";
import { View, useWindowDimensions, Text, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useState } from "react";
import DailyIncomeStatistic from "./DailyIncomeStatistic";
import HourlyIncomeStatistic from "./HourlyIncomeStatistic";
import MonthlyIncomeStatistic from "./MonthlyIncomeStatistic";
const { height } = Dimensions.get("window");

function IncomeStatistic() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: 0, title: "Theo Ngày" },
    { key: 1, title: "Theo Tuần" },
    { key: 2, title: "Theo Tháng" },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 0:
        return (
          <HourlyIncomeStatistic parentRoute={route.key} parentIndex={index} />
        );
      case 1:
        return (
          <DailyIncomeStatistic parentRoute={route.key} parentIndex={index} />
        );
      case 2:
        return (
          <MonthlyIncomeStatistic parentRoute={route.key} parentIndex={index} />
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
