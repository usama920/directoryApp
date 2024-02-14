import { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { databases } from "../../../hook/config";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const Popularjobs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const error = null;
  const [data, setData] = useState([]);

  useEffect(() => {
    let promise = databases.listDocuments(
      "64d7d639a50f2c715b30",
      "64f6a639ee167ad11670"
    );

    promise.then(
      function (response) {
        setIsLoading(false);
        setData(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Radios</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item?.$id}
            renderItem={({ item }) => <PopularJobCard item={item} />}
            contentContainerStyle={{ columnGap: SIZES.zero }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
