import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }

      } catch (error) {
        console.log("error message", error)
      }
    };
    checkLoginStatus();
  }, [])
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:6000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{
            width: 150,
            height: 100,
          }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#041E42",
              marginTop: 12,
            }}
          >
            Login In to your Account
          </Text>
        </View>

        <View
          style={{
            marginTop: 70,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              borderRadius: 5,
              paddingVertical: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              borderRadius: 5,
              paddingVertical: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your Password"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Keep me logged in</Text>
          <Text style={{ fontWeight: "bold", color: "#007fff" }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            {" "}
            Login
          </Text>
        </Pressable>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text>Don't have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#007fff" }}>
              {" "}
              Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
