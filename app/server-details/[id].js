import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import client, { databases } from "../../hook/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { server1, server2, server3 } from "../../constants/images";
import RadioPlayer from "../../components/jobdetails/company/RadioPlayer";
import SocialIcons from "../../components/common/cards/SocialIcons";

// import TrackPlayer from "react-native-track-player";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const arr = ["1", "2", "3"];
  const value = arr[Math.floor(Math.random() * arr.length)];

  const [isLoading, setIsLoading] = useState(true);
  const error = null;

  const [data, setData] = useState({});

  useEffect(() => {
    let promise = databases.getDocument(
      "64d7d639a50f2c715b30",
      "64f6a639ee167ad11670",
      params.id
    );

    promise.then(
      function (response) {
        setIsLoading(false);
        setData(response);
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          // ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <View>
              <Text>Something went wrong</Text>
            </View>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={
                  value == 1 ? server1 : value == 2 ? server2 : server3
                }
                title={data.title}
                tagLine={data.tagLine}
                description={data.description}
              />
              <RadioPlayer
                serverID={data.$id}
                streamURL={data.streamUrl}
                stationTitle={data.title}
                companyLogo={
                  value == 1 ? server1 : value == 2 ? server2 : server3
                }
              />
              <SocialIcons
                facebookURL={data.facebookUrl}
                instagramURL={data.instagramUrl}
              />
            </View>
          )}
        </ScrollView>

        {/* <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        /> */}
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
