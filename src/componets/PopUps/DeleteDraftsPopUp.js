import React from 'react';
import GeneralPopUp from './GeneralPopUp';

const DeleteDraftsPopUp = ({ onConfirm, onCancel}) => { 
  
  const customButtonStyle = {
    backgroundColor: "#ff0000",
    borderRadius: 0,
    borderColor: "#ff0000",
    alignItems: 'center',
  };

  const handleConfirm = () => {
    console.log('Confirm button pressed');
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    console.log('Cancel button pressed');
    onCancel && onCancel();
  };

  return (
    <GeneralPopUp
      message="Er du sikker på at du vil slette denne kladde?"
      confirmLabel="Slet kladde"
      cancelLabel="Annuller"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      customButtonStyle={customButtonStyle}
    />
  );
};

export default DeleteDraftsPopUp;