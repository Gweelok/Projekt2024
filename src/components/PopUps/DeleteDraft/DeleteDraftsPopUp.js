import React from 'react';
import GeneralPopUp from '../General/GeneralPopUp';
import { useLanguage, t } from '../../../languages/LanguageHandler';
import deleteDraftsPopUpStyles from "./deleteDraftsPopUpStyles";

const DeleteDraftsPopUp = ({ onConfirm, onCancel }) => {
  const { currentLanguage } = useLanguage();

  const messageKey = "MyDraftsScreen.closeButtonAsking";
  const confirmLabelKey = "MyDraftsScreen.closeButtonAnswerYes";
  const cancelLabelKey = "MyDraftsScreen.closeButtonAnswerNo";

  const translatedMessage = t(messageKey, currentLanguage);
  const translatedConfirmLabel = t(confirmLabelKey, currentLanguage);
  const translatedCancelLabel = t(cancelLabelKey, currentLanguage);

  const handleConfirm = () => {
    console.log("Confirm button pressed");
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    console.log("Cancel button pressed");
    onCancel && onCancel();
  };

  return (
    <GeneralPopUp
      message={translatedMessage}
      confirmLabel={translatedConfirmLabel}
      cancelLabel={translatedCancelLabel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      customButtonStyle={deleteDraftsPopUpStyles.customButtonStyle}
    />
  );
};

export default DeleteDraftsPopUp;
