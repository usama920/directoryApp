import { Stack, router } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { LogBox, Platform } from "react-native";
import AppwriteContext, { AppwriteProvider } from "../context/AppwriteContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    console.log("uri");
    function redirect(notification) {
      console.log("uri");
      const uri = notification.request.content.data?.uri;
      if (uri) {
        console.log(uri);
        router.push("/server-details/" + uri);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

const Layout = () => {
  const { setIsLoggedIn } = useContext(AppwriteContext);

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      let token;
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      if (Device.isDevice) {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
        }
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  useNotificationObserver();

  LogBox.ignoreLogs(["new NativeEventEmitter"]);

  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppwriteProvider>
      <Stack onLayout={onLayoutRootView} />
    </AppwriteProvider>
  );
};

export default Layout;
