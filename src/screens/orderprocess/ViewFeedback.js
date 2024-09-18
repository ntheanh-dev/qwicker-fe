import { View, Text, ScrollView, RefreshControl, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBasicUserToken, viewFeedback } from "../../redux/basicUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFetchPaginatedData } from "../../hooks/useFetchPaginatedData";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";

const ViewFeedback = ({ navigation, route }) => {
  const { ratings } = route.params.shipper;
  //   const dispatch = useDispatch();
  //   const { access_token } = useSelector(getBasicUserToken);
  const [refreshing, setRefreshing] = useState(false);
  //   const fetcher = useFetchPaginatedData(access_token);

  const onRefresh = useCallback(() => {
    // setRefreshing(true);
    // dispatch(viewFeedback({ access_token: access_token, shipperId: shipper.id }))
    //     .then(unwrapResult)
    //     .then(res => {
    //         fetcher.setData(res)
    //         const headerTitle = res.count > 0 ? `Đánh giá (${res.count})` : 'Đánh giá'
    //         navigation.setOptions({
    //             headerTitle: headerTitle,
    //         })
    //         setRefreshing(false);
    //     })
    //     .catch(e => setRefreshing(false))
  }, []);

  //------------------Scroll event--------------------
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex-1 bg-gray-100 px-2"
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          // fetcher.next()
        }
      }}
      scrollEventThrottle={1}
    >
      {ratings ? (
        ratings.map((ele, index) => {
          const { firstName, lastName, avatar } = ele.user;
          var moment = require("moment-timezone");
          moment.tz.setDefault("Asia/Ho_Chi_Minh");
          const date = moment(ele.createdAt).format("yy-MM-d");
          return (
            <View key={index} className="flex-col p-4 border-b border-gray-300">
              <View className="flex-row space-x-2 items-center">
                <View className="rounded-full overflow-hidden">
                  <Image className="h-10 w-10" source={{ uri: avatar }} />
                </View>
                <Text className="text-lg font-medium">{`${firstName} ${lastName}`}</Text>
              </View>
              <View className="flex-row py-2">
                <StarRatingDisplay rating={ele.rating} />
              </View>
              <Text className="text-base font-normal py-1">
                {ele?.feedback}
              </Text>
              <View className="flex-row justify-between mt-2">
                <Text className="text-xs font-normal text-gray-500">
                  {date}
                </Text>
                <View className="flex-row space-x-5 justify-center items-center">
                  <Entypo name="dots-three-horizontal" size={20} color="gray" />
                  <AntDesign name="like2" size={20} color="gray" />
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View className="flex-1 justify-center items-center mb-14 opacity-50 pt-40">
          <Image
            className="w-28 h-28"
            source={require("../../assets/images/nonefile.png")}
          />
          <Text className="text-lg mt-3">Hiện chưa có đánh giá nào</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ViewFeedback;
