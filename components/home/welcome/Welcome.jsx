import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

// const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ handleSearch }) => {
  const router = useRouter();
  // const [activeJobType, setActiveJobType] = useState("Full-time");

  const [search, setSearch] = useState("");

  return (
    <View>
      <View style={styles.container}>
        {/* <Text style={styles.userName}>Hello Usama</Text> */}
        <Text style={styles.welcomeMessage}>Find your perfect radio</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            // onChange={setSearch}
            onChangeText={setSearch}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => handleSearch(search)}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          scrollEnabled={false}
        />
      </View> */}
    </View>
  );
};

export default Welcome;
