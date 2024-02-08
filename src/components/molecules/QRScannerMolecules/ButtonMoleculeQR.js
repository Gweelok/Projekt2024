// ButtonMolecule.js
import React from "react";
import PressableAtom from "../../atoms/QRScannerAtoms/PressableAtomQR";
import { Buttons, styles } from "../../../styles/styleSheet"; 

const ButtonMolecule = ({
  onPress,
  title,
  disabled,
  buttonStyle,
  textStyle,
}) => {
  return (
    <PressableAtom
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      textStyle={textStyle}
    >
      {title}
    </PressableAtom>
  );
};

export default ButtonMolecule;
