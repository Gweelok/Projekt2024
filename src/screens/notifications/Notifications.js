import React, { useContext } from "react";
import { Text } from "react-native";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext"; //Temp
import { t, useLanguage } from "../../languages/LanguageHandler";

const Notifications = () => {
  const { currentLanguage } = useLanguage();
  const { isloading, setIsLoading } = useContext(LoaderContext); //Temp

  setIsLoading(false); //Temp

  return (
    <InteractiveScreen>
      <Text>{t("NotificationsScreen.Header", currentLanguage)}</Text>
    </InteractiveScreen>
  );
};

export default Notifications;
