// import TrackPlayer, {
//   Event,
//   RepeatMode,
//   Capability,
// } from "react-native-track-player";
// import { playListData } from "./playlistData";

// export async function setupPlayer() {
//   let isSetup = false;
//   try {
//     await TrackPlayer.getActiveTrack();
//     isSetup = true;
//   } catch (error) {
//     await TrackPlayer.setupPlayer();
//     isSetup = true;
//   } finally {
//     return isSetup;
//   }
// }

// export async function addTrack() {
//   await TrackPlayer.add(playListData);
//   await TrackPlayer.setRepeatMode(RepeatMode.Queue);
// }

// export async function playbackService() {
//   await TrackPlayer.updateOptions({
//     stopWithApp: true,
//     capabilities: [
//       Capability.Play,
//       Capability.Pause,
//       Capability.SkipToNext,
//       Capability.SkipToPrevious,
//     ],
//     compactCapabilities: [Capability.Play, Capability.Pause],
//   });
//   TrackPlayer.addEventListener(Event.RemotePause, () => {
//     TrackPlayer.pause();
//   });
//   TrackPlayer.addEventListener(Event.RemotePlay, () => {
//     TrackPlayer.play();
//   });
//   TrackPlayer.addEventListener(Event.RemoteNext, () => {
//     TrackPlayer.skipToNext();
//   });
//   TrackPlayer.addEventListener(Event.RemotePrevious, () => {
//     TrackPlayer.skipToPrevious();
//   });
// }
