import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
// import { checkImageURL } from "../../../utils";

const Company = ({ companyLogo, title, tagline, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={companyLogo} style={styles.logoImage} />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{title}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        {tagline && <Text style={styles.companyName}>{tagline} / </Text>}
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
