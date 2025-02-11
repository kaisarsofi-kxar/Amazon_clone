import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import SearchHeader from "../components/SearchHeader";

const ProductInfoScreen = () => {
  const route = useRoute();
  const width = Dimensions.get("window").width;
  const height = (width * 100) / 100;
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
    >
      <SearchHeader />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{
              width,
              height,
              marginTop: 25,
              resizeMode: "contain",
            }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#c60c30",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginBottom: 20,
                marginLeft: 20,
                marginTop: "auto",
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route.params?.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          ₹{route.params?.price}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#d0d0d0", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color:</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params?.color}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size:</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params?.size}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#d0d0d0", borderWidth: 1 }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total : ₹{route?.params.price}
        </Text>
        <Text
          style={{
            color: "#00CEd1",
          }}
        >
          Free delivery tommorow by 3 PM. Order within 30 mins
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          alignItems: "center",
          gap: 5,
        }}
      >
        <Ionicons name="location-outline" size={24} color="black" />
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Deliver to kaisar - Badgam, J&K 192121
        </Text>
      </View>
      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        In Stock
      </Text>

      <Pressable
        onPress={() => addItemToCart(route.params?.item)}
        style={{
          backgroundColor: "#FFC72c",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#FFac1c",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
