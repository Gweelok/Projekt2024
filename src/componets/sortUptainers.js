import {getAllUptainers} from '../utils/Repo'
import React, { useEffect, useState } from 'react';
import { BoxLink } from "../styles/BoxLink";
import * as Location from 'expo-location';
import { View } from 'react-native';
import Uptainer from './Uptainer';
import GlobalStyle from "../styles/GlobalStyle";


const SortUptainers = ({navigation}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedUptainers, setSortedUptainers] = useState([]);
  const [uptainersList, setUptainerList] = useState([]);

 

  // Function to calculate distance between two points.
  const calculateDistance = ({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 }) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
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

    // Destructure latitude and longitude from userLocation
    const { latitude, longitude } = userLocation; 

    // Sort uptainersList by distance from userLocation
    const sortedList = uptainersList.slice().sort((a, b) => {
      const distanceA = calculateDistance({ latitude, longitude }, a);
      const distanceB = calculateDistance({ latitude, longitude }, b);
      return distanceA - distanceB;
    });
  
    return sortedList;
  };
useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch the list of uptainers
      const uptainerList = await getAllUptainers();
      
      setUptainerList(uptainerList);
      
    } catch (error) {
      console.log('Error:', error);
    }
  };

  fetchData();// Fetch data when component mounts
}, []);


  // Fetch user location and Uptainers list from the server
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
  
        // Request user's location permissions and get their current position
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
        console.log('Error:', error);
      }
    };
  
    fetchData();// Fetch data when component mounts
  }, []);



  // Whenever the userLocation or Uptainers list changes, update the sortedUptainers state
  useEffect(() => {
    if (userLocation) {
      const sortedList = sortUptainersByDistance(userLocation, uptainersList);
      setSortedUptainers(sortedList);
    }
  }, [userLocation, uptainersList]);


  

  // Function to render list of Uptainers
  const renderUptainers = () => {
    // Create a new array without the first element
    const displayedUptainers = userLocation ? sortedUptainers.slice(1) : uptainersList.slice(1);

 
    // Render Uptainer components
    return displayedUptainers.map((item) => (
      <Uptainer
        key={item.uptainerId}
        id={item.uptainerId}
        name={item.uptainerName}
        location={item.uptainerStreet}
        latitude={item.uptainerLat}
        longitude={item.uptainerLong}
      />
    ));
  };

 


  // Navigation function to info page
  const navigatetoinfo = () => {
    // todo all the below data should get from server
    // Navigate to InfoPage with predefined content
    navigation.navigate('Infopage', {
        title: "Five Uptainers are set to open in Kobenhavn area this year",
        content: [
            "Have you alwavs wanted to blog but are without a clue when it comes to doing so? Thispiece will provide basic" +
            " blogging information that can really help distinguish your blog frorthe competition, There is no reason to be scared!" +
            " Thanks to today's expanding technologyblogging is getting   easier all the time, You can pick up some great advice " +
            "from this articlewhich will prepare you to start blogging with confidence and effectivenest.",
            "Start your mailing list right away. The sooner you begin, the more time you wrill have to growyour list." +
            "This list will help you increase your revenue as time goes on. It is a serious mistak.to delay starting" +
            " your mailing list.",
            "Stay on top of what your competition is up to and then ensure you're always the " +
            "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking",
            "Stay on top of what your competition is up to and then ensure you're always the " +
            "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking",
            "Stay on top of what your competition is up to and then ensure you're always the " +
            "leader of thepack They are your rivals so you must follow their blogs, as well Remember, yourcompetitors are probabhy looking"
        ]
    });
  };
      // Determine the list of uptainers to use for rendering
  const uptainerList = userLocation ? sortedUptainers : uptainersList;
  console.log(uptainerList)
  return (
    
    <View>
      {/* Display the list of sorted uptainers using the Uptainer component */}
      {uptainerList[0] && (
        <Uptainer
            key={uptainerList[0].uptainerId}
            id={uptainerList[0].uptainerId}
            name={uptainerList[0].uptainerName}
            location={uptainerList[0].uptainerStreet}
            latitude={uptainerList[0].uptainerLat}
            longitude={uptainerList[0].uptainerLong}
        />
      )}
      {/* Display BoxLink component */}
    
      <BoxLink msg="Hvordan funger UPDROPP?" onPress={navigatetoinfo} style={GlobalStyle.BodyWrapper}/>
      {renderUptainers()}
     
    </View>
  );
};
export default SortUptainers;