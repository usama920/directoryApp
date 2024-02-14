import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { server1, server2, server3 } from "../../../../constants/images";
import styles from "./popularjobcard.style";
import { useRouter } from "expo-router";

const PopularJobCard = ({ item }) => {
  const router = useRouter();
  const arr = ["1", "2", "3"];
  let value = 0;
  useEffect(() => {
    value = arr[Math.floor(Math.random() * arr.length)];
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/server-details/${item.$id}`)}
    >
      <Image
        source={value == 1 ? server1 : value == 2 ? server2 : server3}
        resizeMode="stretch"
        style={styles.serverImage}
      />
      <Text style={styles.jobName}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
