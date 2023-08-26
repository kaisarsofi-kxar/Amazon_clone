import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authenToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      street,
      landmark,
      postalCode,
      city,
    };
    axios
      .post("http://localhost:6000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Addresses added successfully");
        setName("");
        setMobileNo("");
        setStreet("");
        setLandmark("");
        setHouseNo("");
        setPostalCode("");
        setCity("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#00ced1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>
        <TextInput
          placeholder="India"
          placeholderTextColor={"gray"}
          style={{
            padding: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Full name (First and last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder="enter your name"
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Mobile number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => {
              setMobileNo(text);
            }}
            placeholder="Mobile no."
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Flat,House No,Building,Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => {
              setHouseNo(text);
            }}
            placeholder=""
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Area,Street,sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => {
              setStreet(text);
            }}
            placeholder=""
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Landmark
          </Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => {
              setLandmark(text);
            }}
            placeholder="E.g. near apollo hospital"
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Pincode
          </Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => {
              setPostalCode(text);
            }}
            placeholder="6 digits [0-9] PIN code"
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Town/City
          </Text>
          <TextInput
            value={city}
            onChangeText={(text) => {
              setCity(text);
            }}
            placeholder=""
            placeholderTextColor={"gray"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#ffc72c",
            padding: 15,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 17 }}>Add address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
