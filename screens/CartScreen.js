import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SearchHeader from "../components/SearchHeader";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
    >
      <SearchHeader />
      <View style={{ padding: 10, alignItems: "center", flexDirection: "row" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      <Pressable
        style={{
          backgroundColor: "#ffc72c",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 17 }}>
          Proceed to Buy ({cart.length} items)
        </Text>
      </Pressable>
      <Text
        style={{
          height: 1,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#f0f0f0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View>
                <Image
                  style={{
                    width: 140,
                    height: 140,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View style={{ width: 200 }}>
                <Text numberOfLines={2} style={{ marginTop: 10, fontSize: 17 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                  ₹{item?.price}
                </Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
