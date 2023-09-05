import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View } from 'react-native';
import { getItemById } from './Repo';

const ItemQRCode = ({ itemId }) => {
  const qrData = JSON.stringify(itemId); // Encode item data as JSON string

  return (
    <View>
      <QRCode
        value={qrData}
        size={200}
      />
    </View>
  );
};

export default ItemQRCode;
