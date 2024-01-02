export const calculateDistance = ({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 }) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
};

// Function to sort the Uptainers list by distance based on the user's location
export const sortUptainersByDistance = (userLocation, uptainersList) => {
  // Destructure latitude and longitude from userLocation
  const { latitude, longitude } = userLocation;

  // Sort uptainersList by distance from userLocation
  const sortedList = uptainersList.slice().sort((a, b) => {
    const distanceA = calculateDistance({ latitude, longitude }, {latitude: a.uptainerLongitude, longitude: a.uptainerLongitude});
    const distanceB = calculateDistance({ latitude, longitude }, {latitude: b.uptainerLongitude, longitude: b.uptainerLongitude});
    return distanceA - distanceB;
  });

  return sortedList;
};

export const convertKgToTons = (kg) => {
  if (kg >= 1000) {
    return (kg / 1000).toFixed(2) + " t";
  } else {
    return kg + " kg";
  }
};
export const comparison = "loads of washing and drying.";
export const convertCO2Saved = (fact, kg) => {
  const threshold = 100;
  if (kg >= threshold) {
    return Math.round(kg / threshold) + " ";
  } else {
    return kg + " " + comparison;
  }
};
export const calculateCO2Equivalent = (fact, kg) => {
  const equivalent = Math.round(fact * kg);
  const comparisonText = equivalent > 1 ? comparison + "s" : comparison; // Pluralize if necessary
  return `${equivalent} `;
};

export const Calculate_co2_Equivalent = (co2_pers, co2_total, conv_factor, comparison) => {
  console.log(
    "10 kg of CO2 is equivalent to approximately",
    Math.round(10 * conv_factor),
    comparison
  );

  console.log(
    "Your personal CO2 contribution is equivalent to approximately",
    Math.round(co2_pers * conv_factor),
    comparison
  );
  console.log(
    "So",
    co2_total,
    "kg would amount to approximately",
    Math.round(co2_total * conv_factor),
    comparison
  );

  const calc_pers = co2_pers * conv_factor;
  const calc_total = co2_total * conv_factor;

  return {
    personalEquivalent: Math.round(calc_pers),
    totalEquivalent: Math.round(calc_total),
  };
};
