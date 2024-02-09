// ButtonMolecule.js
import React from "react";
import PressableAtomQR from "../../atoms/QRScannerAtoms/PressableAtomQR";

const ButtonMolecule = ({
  t,
  title,
  currentLanguage,
  onPress,
  disabled,
  buttonStyle,
  textStyle,
}) => {
  return (
    <PressableAtomQR
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      textStyle={textStyle}
      buttonStyle={buttonStyle}
    >
      {t(title, currentLanguage)}
    </PressableAtomQR>
  );
};

export default ButtonMolecule;
