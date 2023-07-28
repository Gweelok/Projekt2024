import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Uptainer from './Uptainer';


const DUMMY_UPTAINERS = [
  {
    name: "Uptainer1",
    location: {
    latitude: 37.78925,
    longitude: -122.4324,
    }
  },
  {
    name: "Uptainer2",
    location: {
    latitude: 37.78989,
    longitude: -122.4123,
    }
  }
];

const sortUptainers = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedUptainers, setSortedUptainers] = useState([]);

  // Function to calculate distance between two points.
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance; // Return the calculated distance
  };

  // Helper function to convert degrees to radians
  const deg2rad = (angle) => {
    return angle * (Math.PI / 180);
  };

  // Function to sort the Uptainers list by distance based on the user's location
  const sortUptainersByDistance = (userLocation, uptainersList) => {
    const sortedList = uptainersList.slice().sort((a, b) => {
      const distanceA = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        a.latitude,
        a.longitude
      );

      const distanceB = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        b.latitude,
        b.longitude
      );

      return distanceA - distanceB;
    });

    return sortedList;
  };

  // Fetch user location on component mount
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation(position.coords);
      },
      error => console.log('Error getting user location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // Whenever the userLocation or Uptainers list changes, update the sortedUptainers state
  useEffect(() => {
    if (userLocation) {
      const sortedList = sortUptainersByDistance(userLocation, DUMMY_UPTAINERS);
      setSortedUptainers(sortedList);
    }
  }, [userLocation]);
  return (
    <View>
      {/* Display the list of sorted uptainers using the Uptainer component */}
      {sortedUptainers.map(uptainer => (
        <Uptainer
          key={uptainer.name}
          name={uptainer.name}
          location={uptainer.location}
          data={uptainer.data}
        />
      ))}
    </View>
  );
};

export default sortUptainers;