import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useReducer, useRef, useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { ROLE, ROUTES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../redux/appSlice";
import { logout } from "../../redux/store";
import {
  getBasicUserProfile,
  getBasicUserToken,
  resetBasicUserSlice,
} from "../../redux/basicUserSlice";
import {
  getShipperProfile,
  getToken,
  resetShipperSlice,
} from "../../redux/shipperSlice";
import RBSheet from "react-native-raw-bottom-sheet";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { authAPI, accountEndpoints } from "../../configs/API";
const Setting = ({ navigation }) => {
  const role = useSelector(getRole);
  const token =
    role === ROLE.TRADITIONAL_USER
      ? useSelector(getBasicUserToken)
      : useSelector(getToken);
  const dispatch = useDispatch();
  const changePasswordRef = useRef();
  const { email } =
    role === ROLE.TRADITIONAL_USER
      ? useSelector(getBasicUserProfile)
      : useSelector(getShipperProfile);
  const [data, updateData] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    }
  );
  const logout = () => {
    // dispatch(logout())
    navigation.navigate(ROUTES.LOGIN);
    dispatch(resetBasicUserSlice());
    dispatch(resetShipperSlice());
  };

  const fullFill = () => {
    return data.oldPassword && data.newPassword && data.confirmPassword;
  };

  const handleChangePassword = async () => {
    if (fullFill()) {
      if (data.newPassword !== data.confirmPassword) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: `Mật khẩu nhập lại không khớp`,
        });
      } else {
        const formData = new FormData();
        formData.append("old_password", data.oldPassword);
        formData.append("new_password", data.newPassword);
        try {
          const res = await authAPI(token?.access_token).post(
            accountEndpoints["change-password"],
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res.status === 204) {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: `Đổi mật khẩu thành công`,
            });
          }
          changePasswordRef.current.close();
          updateData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } catch (err) {
          if (err?.response?.status === 304) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: `Đổi mật khẩu thất bại`,
              textBody: "Mật khẩu cũ không chính xác",
            });
          } else {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: `Đổi mật khẩu thất bại`,
              textBody: "Vui lòng thử lại sau",
            });
          }
        }
      }
    }
  };

  return (
    <View className="flex-col flex-1 space-y-3 pt-3">
      <TouchableOpacity
        className="flex-row px-4 py-3 items-center justify-between bg-white"
        onPress={() => changePasswordRef.current.open()}
      >
        <View>
          <Text className="text-lg font-semibold">
            Thiết lập mật khẩu đăng nhập
          </Text>
          <Text className="text-gray-500">
            Bạn hãy bấm vào đây để thay đổi mật khẩu
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
        <View>
          <Text className="text-lg font-semibold">Thay đổi emaill</Text>
          <Text className="text-gray-500">{email}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
        <View>
          <Text className="text-lg font-semibold">Ngôn ngữ</Text>
          <Text className="text-gray-500">Tiếng việt</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
        <View>
          <Text className="text-lg font-semibold">Thông báo</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
        <View>
          <Text className="text-lg font-semibold">Bảo mật</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#D1D5DB" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row px-4 py-3 items-center justify-between bg-white">
        <View>
          <Text className="text-lg font-semibold">Về Qwiker</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-400">v 1.0.0</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#D1D5DB"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logout}
        className="flex justify-between items-center py-4 bg-white"
        style={
          role === ROLE.TRADITIONAL_USER && {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 32,
          }
        }
      >
        <Text className="text-[#3422F1] text-lg font-medium">Đăng xuất</Text>
      </TouchableOpacity>

      <RBSheet
        ref={changePasswordRef}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
            height: 350,
          },
        }}
      >
        <View className="h-full w-full px-4 pt-5 flex-col">
          <Text className="text-center text-xl font-semibold mb-3">
            Thay đổi mật khẩu
          </Text>
          <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF] mb-4">
            <TextInput
              value={data.oldPassword}
              placeholderTextColor={"#A5A5A5"}
              placeholder="Mật khẩu cũ"
              onChangeText={(txt) => updateData({ oldPassword: txt })}
              secureTextEntry={!data.showOldPassword}
              autoFocus={true}
            />
            {data.showOldPassword ? (
              <TouchableOpacity
                onPress={() => updateData({ showOldPassword: false })}
                className="absolute right-3 top-0 translate-y-4"
              >
                <Entypo name="eye" size={20} color="#A5A5A5" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => updateData({ showOldPassword: true })}
                className="absolute right-3 top-0 translate-y-4"
              >
                <Entypo name="eye-with-line" size={20} color="#A5A5A5" />
              </TouchableOpacity>
            )}
          </View>
          <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF] mb-4">
            <TextInput
              value={data.newPassword}
              placeholderTextColor={"#A5A5A5"}
              placeholder="Mật khẩu mới"
              onChangeText={(txt) => updateData({ newPassword: txt })}
              secureTextEntry={!data.showNewPassword}
            />
            {data.showNewPassword ? (
              <TouchableOpacity
                onPress={() => updateData({ showNewPassword: false })}
                className="absolute right-3 top-0 translate-y-4"
              >
                <Entypo name="eye" size={20} color="#A5A5A5" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => updateData({ showNewPassword: true })}
                className="absolute right-3 top-0 translate-y-4"
              >
                <Entypo name="eye-with-line" size={20} color="#A5A5A5" />
              </TouchableOpacity>
            )}
          </View>
          <View className="rounded-lg border-2 border-[#D1D1D1] p-4 bg-[#FFFFFF] mb-4">
            <TextInput
              value={data.confirmPassword}
              placeholderTextColor={"#A5A5A5"}
              placeholder="Nhập lại mật khẩu"
              onChangeText={(txt) => updateData({ confirmPassword: txt })}
              secureTextEntry={!data.showConfirmPassword}
            />
            {data.showConfirmPassword ? (
              <TouchableOpacity
                onPress={() => updateData({ showConfirmPassword: false })}
                className="absolute right-3 top-0 translate-y-4"
              >
                <Entypo name="eye" size={20} color="#A5A5A5" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => updateData({ showConfirmPassword: true })}
                className="absolute right-3 top-0 translate-y-4"
              >
                <Entypo name="eye-with-line" size={20} color="#A5A5A5" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={handleChangePassword}
            className={`rounded-lg w-full flex justify-center items-center h-14 ${
              fullFill() ? "bg-[#3422F1]" : "bg-gray-400"
            }`}
          >
            <Text className="text-lg font-medium text-white">Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default Setting;
