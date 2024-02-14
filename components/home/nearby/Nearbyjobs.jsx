import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

import client, { databases } from "../../../hook/config";
import { Query } from "appwrite";

const Nearbyjobs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const error = null;

  const [data, setData] = useState([]);

  useEffect(() => {
    let promise = databases.listDocuments(
      "64d7d639a50f2c715b30",
      "64f6a639ee167ad11670",
      [Query.limit(2)]
    );

    promise.then(
      function (response) {
        setIsLoading(false);
        setData(response.documents);
        // console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending Radios</Text>
        {/* <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              item={job}
              key={`nearby-job-${job.$id}`}
              handleNavigate={() => router.push(`/server-details/${job.$id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
