import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";

const ProductItem = ({ item }) => {
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        source={{ uri: item?.image }}
        style={{ width: 150, height: 150, resizeMode: "contain" }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          ₹ {item?.price}
        </Text>
        <Text style={{ color: "#ffc72c", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings{" "}
        </Text>
      </View>
      <Pressable
        style={{
          backgroundColor: "#ffc72c",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Add to Cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
