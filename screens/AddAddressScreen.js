import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchHeader from "../assets/SearchHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 50 }}
      >
        {/* header search bar */}
        <SearchHeader />

        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Your Adddress
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Add")}
            style={{
              flexDirection: "row",
              alignitems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Add a new address</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>
          <Pressable>{/* all the address */}</Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
