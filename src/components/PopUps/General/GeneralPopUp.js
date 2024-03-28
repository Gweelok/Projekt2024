import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import * as styles from "../../../styles/Stylesheet";
import { t, useLanguage } from "../../../languages/LanguageHandler";
import generalPopUpStyles from "./generalPopUpStyles";

const GeneralPopUp = ({
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  customButtonStyle,
}) => {
  const { currentLanguage } = useLanguage();
  const translatedMessage = t(message, currentLanguage);
  const translatedConfirmLabel = t(confirmLabel, currentLanguage);
  const translatedCancelLabel = t(cancelLabel, currentLanguage);

  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  return (
    <View>
      <Modal transparent animationType="none" onRequestClose={handleCancel}>
        <View style={generalPopUpStyles.modalBackground}>
          <View style={generalPopUpStyles.popUpContainer}>
            <Text style={generalPopUpStyles.messageText}>{message}</Text>
            <View style={generalPopUpStyles.buttonContainer}>
              <TouchableOpacity
                onPress={handleConfirm}
                style={[generalPopUpStyles.confirmButton, customButtonStyle]}
              >
                <Text style={styles.Buttons.main_buttonText}>
                  {confirmLabel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCancel}
                style={styles.Buttons.secondary_button}
              >
                <Text style={styles.Buttons.secondary_buttonText}>
                  {cancelLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GeneralPopUp;
