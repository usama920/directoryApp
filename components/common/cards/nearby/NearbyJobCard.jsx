import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { server1, server2, server3 } from "../../../../constants/images";
import styles from "./nearbyjobcard.style";
import { icons } from "../../../../constants";

const PopularJobCard = ({ item, handleNavigate }) => {
  const arr = ["1", "2", "3"];
  let value = 0;
  useEffect(() => {
    value = arr[Math.floor(Math.random() * arr.length)];
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View style={{ width: "20%" }}>
        <Image
          source={value == 1 ? server1 : value == 2 ? server2 : server3}
          resizeMode="cover"
          style={styles.serverImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.jobName}>{item.title}</Text>
        <Text style={styles.jobType}>{item.tagLine}</Text>
      </View>
      {/* <View>
        <TouchableOpacity
          style={{ width: "100%", height: "100%", justifyContent: "center" }}
        >
          <Image
            source={icons.heartOutline}
            resizeMode="contain"
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );
};

export default PopularJobCard;
