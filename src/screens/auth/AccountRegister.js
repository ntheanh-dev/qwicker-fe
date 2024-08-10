import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../redux/appSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROLE, ROUTES } from "../../constants";
import { addBasicField } from "../../redux/formRegisterSlice";
import Spinner from "react-native-loading-spinner-overlay";
import API, { accountEndpoints } from "../../configs/API";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const AccountRegister = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const role = useSelector(getRole);
  const dispatch = useDispatch();
  const isFullfil = () => {
    return username.length > 0 && password.length > 0 && email.length > 0;
  };

  const handleNext = async () => {
    if (isFullfil()) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        await API.post(accountEndpoints["check-account"], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(
          addBasicField({
            username: username,
            password: password,
            email: email,
          })
        );
        navigation.navigate(ROUTES.CONFIRM_OTP_REGISTER, {
          email: email,
          username: username,
        });
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 409) {
          const code = err.response.data["code"];
          if (code === 1002) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "Tài khoản đã tồn tại",
              textBody: "Hãy thử lại với tài khoản khác",
            });
          } else if (code === 1005) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "Email đã tồn tại",
              textBody: "Hãy thử lại với Email khác",
            });
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 flex-col px-4 py-6">
      <Spinner visible={loading} size="large" animation="fade" />
      <Text className="text-lg font-normal">{`Bước 2/${
        role === ROLE.TRADITIONAL_USER ? "4" : "5"
      }`}</Text>
      <Text className="text-2xl font-semibold">Thông tin tài khoản</Text>

      <View className="flex-col space-y-3 pt-6">
        <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
          <TextInput
            onChangeText={(txt) => setUsername(txt)}
            placeholderTextColor={"#A5A5A5"}
            placeholder="Tài khoản"
            value={username}
          />
        </View>
        <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
          <TextInput
            onChangeText={(txt) => setPassword(txt)}
            placeholderTextColor={"#A5A5A5"}
            placeholder="Mật khẩu"
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF]">
          <TextInput
            onChangeText={(txt) => setEmail(txt)}
            placeholderTextColor={"#A5A5A5"}
            placeholder="Email"
            value={email}
          />
        </View>
      </View>
      <TouchableOpacity
        className="w-full rounded-lg py-4 flex-row justify-center  mt-6 bg-gra"
        style={{
          backgroundColor: isFullfil() ? "#3422F1" : "rgb(156, 163, 175)",
        }}
        onPress={handleNext}
      >
        <Text
          className="text-lg font-semibold "
          style={{ color: isFullfil() ? "white" : "rgb(75, 85, 99)" }}
        >
          Tiếp
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountRegister;
