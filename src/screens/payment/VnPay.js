import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import WebView from "react-native-webview";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { ROUTES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
export default function VnPay({ navigation, route }) {
  const { paymentURL, orderId } = route.params;
  const handleNavigationChange = (newNav) => {
    const { url } = newNav;
    if (url.includes("vnp_TransactionStatus")) {
      if (url.includes("vnp_TransactionStatus=00")) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Thanh toán thành công",
        });
        navigation.navigate(ROUTES.ORDER_STATUS_STACK, {
          orderId: orderId,
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Thanh toán thất bại",
        });
        navigation.navigate("Đơn hàng");
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name="left" size={16} color="black" />
        </TouchableOpacity>
      ),
    });

    navigation.getParent().setOptions({
      headerShown: false,
    });
  });
  const handleBack = () => {
    navigation.getParent().setOptions({
      headerShown: true,
    });
    navigation.navigate("Đơn hàng");
  };
  return (
    <WebView
      className="flex-1"
      source={{ uri: paymentURL }}
      onNavigationStateChange={(newNav) => handleNavigationChange(newNav)}
    />
  );
}
