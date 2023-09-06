import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View } from 'react-native';
import { brands } from './SeedData';

const ItemQRCode = ({ brands }) => {
  const qrData = JSON.stringify(brands); // Encode item data as JSON string

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
