import React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View style={{ height: StatusBar.currentHeight }}></View>
      <View className="justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-base">Profile</Text>
      </View>
      <View style={{ height: StatusBar.currentHeight }}></View>
    </View>
  );
};

export default Profile;
