import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./searchStations.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const SearchStations = ({ searchData, clearSearch }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clearSearch}>
        <Text style={styles.clearSearch}>Clear Search</Text>
      </TouchableOpacity>
      <View style={styles.cardsContainer}>
        {!searchData || searchData.length < 1 ? (
          <View>
            <Text>No stations were found.</Text>
          </View>
        ) : (
          searchData?.map((data) => (
            <NearbyJobCard
              item={data}
              key={`nearby-job-${data.$id}`}
              handleNavigate={() => router.push(`/server-details/${data.$id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default SearchStations;
