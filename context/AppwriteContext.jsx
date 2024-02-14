import { View, Text } from "react-native";
import React, { FC, createContext } from "react";

import Appwrite from "./service";
import { PropsWithChildren } from "react";
import { useState } from "react";

export const AppwriteContext = createContext({
  appwrite: new Appwrite(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  soundd: null,
  setSoundd: () => {},
  soundPlaybackObj: null,
  setSoundPlaybackObj: () => {},
  liveServerID: null,
  setLiveServerID: () => {},
  notificationIdentifier: null,
  setNotificationIdentifier: () => {},
});

export const AppwriteProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [soundd, setSoundd] = useState(false);
  const [soundPlaybackObj, setSoundPlaybackObj] = useState(false);
  const [liveServerID, setLiveServerID] = useState(false);
  const [notificationIdentifier, setNotificationIdentifier] = useState(null);

  const defaultValue = {
    appwrite: new Appwrite(),
    isLoggedIn,
    setIsLoggedIn,
    soundd,
    setSoundd,
    soundPlaybackObj,
    setSoundPlaybackObj,
    liveServerID,
    setLiveServerID,
    notificationIdentifier,
    setNotificationIdentifier,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;
