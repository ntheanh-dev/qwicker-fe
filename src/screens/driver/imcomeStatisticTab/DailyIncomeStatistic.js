import { View, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { TabBar, TabView } from "react-native-tab-view";
const { height, width } = Dimensions.get("window");
const init = [19, 18, 25, 20, 16];
const DailyIncomeStatistic = () => {
  return (
    <View className="flex-1">
      <Head />
      <View className="flex-1 bg-black"></View>
    </View>
  );
};

const renderScene = ({ route }) => {
  return (
    route?.dataset && (
      <BarChart
        width={width}
        height={300}
        data={route.dataset}
        yLabelsOffset={20}
        withInnerLines={false}
        showBarTops={false}
        withVerticalLabels={false}
        chartConfig={{
          color: () => `rgba(255, 255, 255, 0.6)`,
          decimalPlaces: 3,
          propsForLabels: {},
          barPercentage: 0.6,
          barRadius: 7,
          backgroundGradientFrom: "#3422F1",
          backgroundGradientTo: "#3422F1",
        }}
        flatColor={true}
        withCustomBarColorFromData={true}
        withHorizontalLabels={false}
        style={{
          paddingRight: 25,
          paddingTop: 20,
        }}
      />
    )
  );
};

const Head = () => {
  const [index, setIndex] = useState(0);
  const [dataset, setDataset] = useState({
    labels: ["january", "february", "march", "april", "may"],
    datasets: [
      {
        data: init,
        colors: init.map((item) =>
          item < 20
            ? (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.03})`
            : () => "white"
        ),
      },
    ],
  });
  const [routes] = useState([
    { key: 1, title: "january", dataset: dataset },
    { key: 2, title: "february", dataset: dataset },
    { key: 3, title: "march", dataset: dataset },
    { key: 4, title: "april", dataset: dataset },
    { key: 5, title: "may", dataset: dataset },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: width, height: 300 }}
      tabBarPosition="bottom"
      swipeEnabled={false}
      animationEnabled={false}
      // style={{ paddingBottom: -20 }}

      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: "white",
          }}
          activeColor="white"
          inactiveColor="rgba(255, 255, 255, 0.6)"
          pressColor="rgba(0, 0, 0, 0)"
          style={{ backgroundColor: "#3422F1" }}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color, margin: 8 }}>{route.title}</Text>
          )}
          renderTabBarItem={() => {}}
        />
      )}
    />
  );
};
export default DailyIncomeStatistic;
