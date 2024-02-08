import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import QRScannerOrganism from "../../organisms/QRScannerOrganisms/QRScannerOrganism";
import { styles } from "../../../styles/styleSheet";
import { t, useLanguage } from "../../../Languages/LanguageHandler";

const QRScannerTemplate = (props) => (
  <ScrollView>
      <QRScannerOrganism {...props} />
  </ScrollView>
);

export default QRScannerTemplate;
