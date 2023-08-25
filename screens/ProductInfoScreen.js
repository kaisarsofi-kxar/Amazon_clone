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
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductInfoScreen = () => {
  const route = useRoute();
  const width = Dimensions.get("window").width;
  const height = (width * 100) / 100;
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
    >
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 5,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{
              paddingLeft: 10,
            }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

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
          ₹ {route.params?.price}
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
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
