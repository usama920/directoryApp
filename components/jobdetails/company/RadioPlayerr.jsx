import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
// import TrackPlayer from "react-native-track-player";

import { Audio } from "expo-av";
import { song } from "../../../constants/images";

const RadioPlayerr = ({ logo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState(null);

  const [sound, setSound] = useState();

  const handleAudioPress = async () => {
    // console.log(sound);
    // console.log(sound.sound);
    // console.log(sound.status);
    console.log(playbackStatus);
    // console.log(sound?.isLoaded);
    // console.log(sound?.isPlaying);

    if (!playbackStatus?.isLoaded) {
      console.log("playClicked");
      setPlayClicked(true);
      return;
    }
    if (playbackStatus?.isLoaded && !playbackStatus?.isPlaying) {
      console.log("playSound");
      await sound.sound.playAsync();
      return;
    }

    if (playbackStatus?.isPlaying) {
      console.log("pauseSound");
      await sound.sound.pauseAsync();
    }
  };

  useEffect(() => {
    const playSound = async () => {
      if (
        playClicked &&
        playbackStatus?.isLoaded &&
        !playbackStatus?.isPlaying
      ) {
        await sound.sound.playAsync();
        setPlayClicked(false);
      }
    };
    playSound();
  }, [playbackStatus]);

  useEffect(() => {
    const loadSound = async () => {
      // const playbackObjj = await Audio.Sound();
      // await playbackObjj.loadAsync({
      //   uri: "hhttps://azuracast.casthost.net/listen/azuratest_radio/radio.mp3",
      // });

      // playbackObjj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      // const playbackObj = await playbackObj.createAsync(
      const playbackObj = await Audio.Sound.createAsync({
        uri: "https://azuracast.casthost.net/listen/azuratest_radio/radio.mp3",
      });
      setSound(playbackObj);

      playbackObj.sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    };
    loadSound();

    // return () => {
    //   if (sound) {
    //     sound.sound.unloadAsync();
    //   }
    // };
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    console.log(status);
    setPlaybackStatus(status);
  };

  return (
    <View>
      {/* {sound && <Text>Radio Player</Text>} */}
      <Button
        title={
          playbackStatus?.isPlaying
            ? "Pause"
            : playbackStatus?.isLoaded && !playbackStatus?.isPlaying
            ? "Play"
            : playClicked && !playbackStatus?.isLoaded
            ? "Loading"
            : "Play"
        }
        onPress={handleAudioPress}
      />
    </View>
  );
};

export default RadioPlayerr;
