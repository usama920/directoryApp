import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
// import TrackPlayer from "react-native-track-player";

import { Audio } from "expo-av";
import { song } from "../../../constants/images";
import AppwriteContext from "../../../context/AppwriteContext";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PauseButton from "../../common/cards/PauseButton";
import PlayButton from "../../common/cards/PlayButton";
import LoadingButton from "../../common/cards/LoadingButton";

const RadioPlayer = ({ logo, serverID, streamURL, stationTitle }) => {
  const [playClicked, setPlayClicked] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState(null);

  const {
    soundd,
    setSoundd,
    soundPlaybackObj,
    setSoundPlaybackObj,
    liveServerID,
    setLiveServerID,
    notificationIdentifier,
    setNotificationIdentifier,
  } = useContext(AppwriteContext);

  const [sound, setSound] = useState();

  const handleAudioPress = async () => {
    console.log("clicked");
    if (liveServerID != serverID && soundPlaybackObj?.isPlaying) {
      setSoundPlaybackObj(null);
      await soundd?.sound?.pauseAsync();
      await soundd?.sound?.unloadAsync();
      setSoundd(null);
    }

    setLiveServerID(serverID);
    // return;

    if (!playbackStatus?.isLoaded) {
      setPlayClicked(true);
      return;
    }

    if (playbackStatus?.isLoaded && !playbackStatus?.isPlaying) {
      if (sound?.sound) {
        await sound?.sound?.playAsync();
        await showNotification();
        setSoundd(sound);
      }
      return;
    }

    if (playbackStatus?.isPlaying) {
      await sound.sound.pauseAsync();
      setSoundd(sound);
    }
  };

  const showNotification = async () => {
    if (notificationIdentifier) {
      await Notifications.dismissNotificationAsync(notificationIdentifier._j);
    }
    const notificationIdent = Notifications.scheduleNotificationAsync({
      content: {
        title: stationTitle,
        body: "Tap to return to the app and control playback!",
        data: {
          uri: serverID,
        },
      },
      trigger: null,
    });
    setNotificationIdentifier(notificationIdent);
  };
  useEffect(() => {
    const playSound = async () => {
      if (
        playClicked &&
        playbackStatus?.isLoaded &&
        !playbackStatus?.isPlaying
      ) {
        if (soundPlaybackObj?.isPlaying) {
          setSoundPlaybackObj(null);
          if (soundd?.sound) {
            await soundd?.sound?.pauseAsync();
            await soundd?.sound?.unloadAsync();
          }
          setSoundd(null);
        }
        await sound.sound.playAsync();
        await showNotification();
        setSoundd(sound);
        setPlayClicked(false);
      } else if (
        playClicked &&
        liveServerID != serverID &&
        soundPlaybackObj?.isPlaying
      ) {
        setSoundPlaybackObj(null);
        if (soundd?.sound) {
          await soundd?.sound?.pauseAsync();
          await soundd?.sound?.unloadAsync();
        }
        setSoundd(null);
      }
    };
    playSound();
  }, [playbackStatus]);

  useEffect(() => {
    if (!streamURL) {
      return;
    }
    const loadSound = async () => {
      const sessionData = await AsyncStorage.getItem("@user_info");
      console.log("sessionData");
      console.log(sessionData);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      const playbackObj = await Audio.Sound.createAsync({
        uri: streamURL,
      });
      setSound(playbackObj);
      playbackObj.sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    };
    loadSound();
  }, [streamURL]);

  const onPlaybackStatusUpdate = (status) => {
    setPlaybackStatus(status);
    setSoundPlaybackObj(status);
  };

  return (
    <View style={styles.container}>
      {/* {sound && <Text>Radio Player</Text>} */}
      {liveServerID == serverID ? (
        soundPlaybackObj?.isPlaying ? (
          <PauseButton handlePress={handleAudioPress} />
        ) : soundPlaybackObj?.isLoaded && !soundPlaybackObj?.isPlaying ? (
          <PlayButton handlePress={handleAudioPress} />
        ) : playClicked && !soundPlaybackObj?.isLoaded ? (
          <LoadingButton />
        ) : playClicked && (!soundPlaybackObj || soundPlaybackObj == null) ? (
          <LoadingButton />
        ) : (
          <PlayButton handlePress={handleAudioPress} />
        )
      ) : playbackStatus?.isPlaying ? (
        <PauseButton handlePress={handleAudioPress} />
      ) : playbackStatus?.isLoaded && !playbackStatus?.isPlaying ? (
        <PlayButton handlePress={handleAudioPress} />
      ) : playClicked && !playbackStatus?.isLoaded ? (
        <LoadingButton />
      ) : (
        <PlayButton handlePress={handleAudioPress} />
      )}

      {/* <Button
        title={
          liveServerID == serverID
            ? soundPlaybackObj?.isPlaying
              ? "Pause"
              : soundPlaybackObj?.isLoaded && !soundPlaybackObj?.isPlaying
              ? "Play"
              : playClicked && !soundPlaybackObj?.isLoaded
              ? "Loading"
              : playClicked && (!soundPlaybackObj || soundPlaybackObj == null)
              ? "Loading"
              : "Play"
            : playbackStatus?.isPlaying
            ? "Pause"
            : playbackStatus?.isLoaded && !playbackStatus?.isPlaying
            ? "Play"
            : playClicked && !playbackStatus?.isLoaded
            ? "Loading"
            : "Play"
        }
        onPress={handleAudioPress}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    marginHorizontal: 20,
  },
});
export default RadioPlayer;
