import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location';
import Uptainer from './Uptainer';
import { BoxLink } from "../styles/BoxLink";


///Asumming i have data
const photo = [
  { id: "1", imageSource: "https://via.placeholder.com/200x200" },
  { id: "2", imageSource: "https://via.placeholder.com/200x200" },
  { id: "3", imageSource: "https://via.placeholder.com/200x200" },
  { id: "4", imageSource: "https://via.placeholder.com/200x200" },
  { id: "5", imageSource: "https://via.placeholder.com/200x200" },
  { id: "6", imageSource: "https://via.placeholder.com/200x200" },
  { id: "7", imageSource: "https://via.placeholder.com/200x200" },
  { id: "8", imageSource: "https://via.placeholder.com/200x200" },
  { id: "9", imageSource: "https://via.placeholder.com/200x200" },
  // Add more image URLs as needed
];

const uptainersList = [
  {
    name: "Valby",
    location: "Allegrade",
    photos: photo,
    latitude: 55.6666,
    longitude: 12.1,
  },

  {
    name: "Valby 2",
    location: "ved fatka",
    photos: photo,
    latitude: 55.6666,
    longitude: 12.2,
  },
  {
    name: "Norrebo",
    location: "ved fatka",
    photos: photo,
    latitude: 55.6666,
    longitude: 12.3,
  },
{
  name: "Norrebo 2",
  location: "Allegrade",
  photos: photo,
  latitude: 55.6666,
  longitude: 12.4,
},
];





const SortUptainers = () => {
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
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          });
          setUserLocation(location.coords);
        } else {
          console.log('Permission to access location was denied');
        }
      } catch (error) {
        console.log('Error getting user location:', error);
      }
    };

    fetchUserLocation();
  }, []);

  // Whenever the userLocation or Uptainers list changes, update the sortedUptainers state
  useEffect(() => {
    if (userLocation) {
      const sortedList = sortUptainersByDistance(userLocation, uptainersList);
      setSortedUptainers(sortedList);
    }
  }, [userLocation, uptainersList]);


  //fn to help in rendering
  const renderUptainers = () => {
    // Create a new array without the first element
    const slicedUptainerData = sortedUptainers.slice(1);
  
    // rendering the rest of the Uptainer components
    return slicedUptainerData.map((item, index) => (
      <Uptainer
        key={index + 1}
        name={item.name}
        location={item.location}
        data={item.photos}
      />
    ));
    

  };

  return (
    <View>
      {/* Display the list of sorted uptainers using the Uptainer component */}
      {sortedUptainers[0] && (
        <Uptainer
          name={sortedUptainers[0].name}
          location={sortedUptainers[0].location}
          data={sortedUptainers[0].photos}
        />
      )}
        <BoxLink msg="Hvordan funger UPDROPP?"/>
        {renderUptainers()}
     
    </View>
  );
};

export default SortUptainers;

