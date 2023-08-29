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
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();
  return (
    <>
      {cart.length != 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
        >
          <SearchHeader />
          <View
            style={{ padding: 10, alignItems: "center", flexDirection: "row" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{total}</Text>
          </View>
          <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

          <Pressable
            onPress={() => navigation.navigate("Confirm")}
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
                    <Text
                      numberOfLines={2}
                      style={{ marginTop: 10, fontSize: 17 }}
                    >
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

                <Pressable
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 7,
                    }}
                  >
                    {item?.quantity > 1 ? (
                      <Pressable
                        onPress={() => decreaseQuantity(item)}
                        style={{
                          backgroundColor: "#d8d8d8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => deleteItem(item)}
                        style={{
                          backgroundColor: "#d8d8d8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </Pressable>
                    )}

                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 18,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>{item?.quantity}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => increaseQuantity(item)}
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: 7,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                      }}
                    >
                      <Feather name="plus" size={24} color="black" />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#c0c0c0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Delete</Text>
                  </Pressable>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 15,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#c0c0c0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Save for later</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#c0c0c0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Save more like this</Text>
                  </Pressable>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
        >
          <SearchHeader />
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderRadius: 100,
                  backgroundColor: "#caf0f8",
                }}
                source={{
                  uri: "https://media1.giphy.com/media/fscIxPfKjPyShbwUS5/giphy.gif",
                }}
              />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16, marginBottom: 13 }}>
                Your Amazon Cart is empty
              </Text>
              <Text style={{ fontSize: 16, color: "#00CED2" }}>
                Pick up where you left off
              </Text>
            </View>
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 16,
            }}
          />
        </ScrollView>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
