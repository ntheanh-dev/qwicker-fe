import { View, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { TabBar, TabView } from "react-native-tab-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getInComeStatistic, getToken } from "../../../redux/shipperSlice";
import { STATISTIC_TYPE } from "../../../constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { formatCurrency } from "../../../features/ultils";
import Spinner from "react-native-loading-spinner-overlay";
import moment from "moment";
const { width } = Dimensions.get("window");

const getHourRange = () => {
  const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss");
  const currentDateMinus4Hours = moment()
    .subtract(4, "hours")
    .format("YYYY-MM-DDTHH:mm:ss");
  return {
    startDate: currentDateMinus4Hours,
    endDate: currentDate,
  };
};
const fillMissingHours = (data, startDate, endDate) => {
  // item.dateTiem example: 2024-05-01T00:00:00
  const existingHours = new Set(
    data.map((item) => new Date(item.dateTime).getHours())
  );
  for (
    let d = new Date(startDate);
    d <= new Date(endDate);
    d.setHours(d.getHours() + 1)
  ) {
    if (!existingHours.has(d.getHours())) {
      data.push({
        dateTime: d.getHours(),
        totalPayments: 0,
        totalRevenue: 0.0,
        cashRevenue: 0.0,
        vnPayRevenue: 0.0,
        type: STATISTIC_TYPE.HOURLY,
      });
    }
  }
  // Modify dateTime to only store the hour and then sort
  data.forEach((i) => {
    // If dateTime is a string, convert it to a Date object and update the dateTime to only the hour
    if (typeof i.dateTime === "string") {
      const date = new Date(i.dateTime);
      i.dateTime = date.getHours();
    }
    // If dateTime is already a number (hour), no need to change anything
  });

  // Sort the data array by dateTime (hour) in ascending order
  data.sort((a, b) => a.dateTime - b.dateTime);
  return data;
};

const HourlyIncomeStatistic = ({ parentIndex, parentRoute }) => {
  const { access_token } = useSelector(getToken);
  const [loading, setLoading] = useState([]);
  const [statistic, setStatistic] = useState([]);
  const [dataSet, setDataSet] = useState({
    labels: [],
    datasets: [{ data: [], colors: [] }],
  });
  const [routes, setRoutes] = useState([]);
  const [index, setIndex] = useState(4);

  const dispatch = useDispatch();

  useEffect(() => {
    const { endDate, startDate } = getHourRange();
    if (parentIndex === parentRoute) {
      // force re-render when tabindex change and only re-render when tab present
      setLoading(true);
      dispatch(
        getInComeStatistic({
          token: access_token,
          params: `startDate=${startDate}&endDate=${endDate}&timeType=${STATISTIC_TYPE.HOURLY}`,
        })
      )
        .then(unwrapResult)
        .then((res) => {
          const data = fillMissingHours(res, startDate, endDate);
          setStatistic(data);
          const myDataSet = data.reduce(
            (prev, curr) => {
              console.log("hour", curr.dateTime);

              const title = `${curr.dateTime}h`;
              const preData = prev.datasets[0].data;
              const preColors = prev.datasets[0].colors;
              return {
                lables: [...prev.lables, title],
                datasets: [
                  {
                    data: [...preData, curr.totalRevenue],
                    colors: [...preColors, () => "white"],
                  },
                ],
              };
            },
            {
              lables: [],
              datasets: [
                {
                  data: [],
                  colors: [],
                },
              ],
            }
          );
          setDataSet(myDataSet);
          setLoading(false);
          setRoutes(
            myDataSet?.lables?.map((lb, index) => {
              return {
                key: index,
                title: lb,
                dataset: myDataSet,
              };
            })
          );
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  }, [parentIndex]);
  return (
    <View className="flex-1">
      <Spinner visible={loading} size="large" animation="fade" />

      {routes.length > 0 && (
        <Head
          index={index}
          setIndex={setIndex}
          dataSet={dataSet}
          routes={routes}
        />
      )}
      <View className="flex-1 bg-white flex-col ">
        <View className="flex-col items-center py-6">
          <Text className="text-lg font-medium">Tổng Thu Nhập</Text>
          <Text className="text-[#3422F1] text-3xl font-semibold">
            {formatCurrency(statistic[index]?.totalRevenue)}
          </Text>
        </View>
        <View className="px-3 flex-col space-y-4">
          <View className="flex-row justify-between">
            <Text className="font-medium text-xl">Đơn Hàng Đã Giao</Text>
            <Text className="font-medium text-xl">
              {statistic[index]?.totalPayments}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center space-x-2">
              <AntDesign name="creditcard" size={18} color="#374151" />
              <Text className="font-medium text-lg text-gray-700">
                Thu nhập online
              </Text>
            </View>
            <Text className="font-medium text-lg text-gray-700">
              {formatCurrency(statistic[index]?.vnPayRevenue)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="cash" size={18} color="#374151" />
              <Text className="font-medium text-lg text-gray-700">
                Thu nhập tiền mặt
              </Text>
            </View>
            <Text className="font-medium text-lg text-gray-700">
              {formatCurrency(statistic[index]?.cashRevenue)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center space-x-1">
              <AntDesign name="minuscircleo" size={18} color="#374151" />
              <Text className="font-medium text-lg text-gray-700">
                Phí khấu trừ
              </Text>
            </View>
            <Text className="font-medium text-lg text-gray-700">
              {formatCurrency(0)}
            </Text>
          </View>
        </View>
      </View>
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

const Head = ({ index, setIndex, routes }) => {
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
          style={{ backgroundColor: "#3422F1", padding: 0 }}
          renderLabel={({ route, color }) => (
            <Text style={{ color, padding: 0, margin: 0, fontSize: 12 }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};
export default HourlyIncomeStatistic;
