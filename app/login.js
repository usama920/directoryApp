import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";

//react native elements
//Snackbar
// import Snackbar from "react-native-snackbar";

//context API
import { AppwriteContext } from "../context/AppwriteContext";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons } from "../constants";
import { ScreenHeaderBtn } from "../components";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Navigation

const Login = () => {
  const router = useRouter();
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError("All fields are required");
    } else {
      const user = {
        email,
        password,
      };
      setIsLoading(true);
      appwrite
        .login(user)
        .then((response) => {
          if (response) {
            setIsLoggedIn(true);
            AsyncStorage.setItem("@user_info", JSON.stringify(response)).then(
              () => {
                router.replace("/");
              }
            );
          } else {
            setIsLoading(false);
            setError("Invalid Email or Password");
          }
        })
        .catch((e) => {
          console.log(e);
          setError("Invalid Email or Password");
          setIsLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: (props) => (
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Login</Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Directory Auth</Text>

        {/* Email */}
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={"#AEAEAE"}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={"#AEAEAE"}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </Pressable>

        {/* Sign up navigation */}
        <Pressable
          onPress={() => router.replace("/signup")}
          style={styles.signUpContainer}
        >
          <Text style={styles.noAccountLabel}>
            Don't have an account?{"  "}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  formContainer: {
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
  },
  appName: {
    color: COLORS.primary,
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fef8fa",
    padding: 10,
    height: 40,
    alignSelf: "center",
    borderRadius: 5,

    width: "80%",
    color: "#000000",

    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#ffffff",
    padding: 10,
    height: 45,

    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: "#484848",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  signUpLabel: {
    color: "#1d9bf0",
  },
});

export default Login;
