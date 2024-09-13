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
import { formatCurrency, getVietnamesDay } from "../../../features/ultils";
import Spinner from "react-native-loading-spinner-overlay";
const { width } = Dimensions.get("window");
const getDayRange = () => {
  const date = new Date();
  const endOfWeek = new Date(date.setDate(date.getDate()));
  const startOfWeek = new Date(date.setDate(endOfWeek.getDate() - 5));
  return {
    startDate: startOfWeek,
    endDate: endOfWeek,
  };
};
const fillMissingDates = (data, startDate, endDate) => {
  const existingDates = new Set(
    data.map((item) => item.dateTime.split("T")[0])
  );

  const formatDate = (date) => date.toISOString().split("T")[0];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const formattedDate = formatDate(d) + "T00:00:00";

    if (!existingDates.has(formatDate(d))) {
      data.push({
        dateTime: formattedDate,
        totalPayments: 0,
        totalRevenue: 0.0,
        cashRevenue: 0.0,
        vnPayRevenue: 0.0,
        type: "DAILY",
      });
    }
  }
  // Sort the data by date to maintain order
  const result = data.sort(
    (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
  );

  return result.slice(-5);
};
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Ho_Chi_Minh");
moment.locale("vi");

const DailyIncomeStatistic = ({ parentIndex }) => {
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
    const { endDate, startDate } = getDayRange();
    setLoading(true);
    dispatch(
      getInComeStatistic({
        token: access_token,
        body: {
          startDate: startDate,
          endDate: endDate,
          type: STATISTIC_TYPE.DAILY,
        },
      })
    )
      .then(unwrapResult)
      .then((res) => {
        const data = fillMissingDates(res, startDate, endDate);
        setStatistic(data);
        const myDataSet = data.reduce(
          (prev, curr) => {
            const title = getVietnamesDay(moment(curr.dateTime));
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
export default DailyIncomeStatistic;
