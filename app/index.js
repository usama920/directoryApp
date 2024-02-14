import { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import AppwriteContext from "../context/AppwriteContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { databases } from "../hook/config";
import { Query } from "appwrite";
import SearchStations from "../components/home/search/SearchStations";

// import UserMenu from "../components/common/menu/UserMenu";
// import ScreenHeaderRightBtn from "../components/common/header/ScreenHeaderRightBtn";
import NewScreenHeaderRightBtn from "../components/common/header/NewScreenHeaderRightBtn";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);
  const [searchData, setSearchData] = useState({});
  const [useSearch, setUseSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const hadleAuth = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const getSessionData = async () => {
      const sessionData = await AsyncStorage.getItem("@user_info");
      if (sessionData !== null) {
        setIsLoggedIn(true);
      }
    };
    getSessionData();
  }, []);

  const handleSearch = (value) => {
    if (value.length < 1) {
      return;
    }
    setUseSearch(true);
    setIsLoading(true);

    let promise = databases.listDocuments(
      "64d7d639a50f2c715b30",
      "64f6a639ee167ad11670",
      [Query.search("title", value)]
    );

    promise.then(
      function (response) {
        setSearchData(response.documents);
        setIsLoading(false);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const clearSearch = () => {
    setUseSearch(false);
    setSearchData({});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          // headerLeft: () => (
          //   <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          // ),
          headerRight: () => (
            <NewScreenHeaderRightBtn
              iconUrl={isLoggedIn ? images.profile : images.user}
              dimension="100%"
              handlePress={hadleAuth}
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          {/* <UserMenu /> */}
          <Welcome handleSearch={handleSearch} />
          {useSearch ? (
            isLoading ? (
              <ActivityIndicator
                style={{ marginTop: 15 }}
                size="large"
                color={COLORS.primary}
              />
            ) : (
              <SearchStations
                searchData={searchData}
                clearSearch={clearSearch}
              />
            )
          ) : (
            <>
              <Popularjobs />
              <Nearbyjobs />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
