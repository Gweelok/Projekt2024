// ButtonMolecule.js
import React from "react";
import PressableAtom from "../../atoms/QRScannerAtoms/PressableAtomQR"; // Adjust the path as needed
import { Buttons } from "../../../styles/styleSheet"; // Assuming Buttons contains styles

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
      style={[Buttons.main_button, buttonStyle]}
      textStyle={[Buttons.main_buttonText, textStyle]}
    >
      {title}
    </PressableAtom>
  );
};

export default ButtonMolecule;
