import { items as TestItems } from "../utils/Testdata.js";
import {
  getAllItems,
  getAllUptainers,
  getProductById,
  getCurrentUser,
  getItemsFromUser,
  getDraftFromUser,
  getAllProducts,
} from "../utils/Repo";
import { t } from "../Languages/LanguageHandler.js";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5.js";
import { firebaseAurth } from "./Firebase.js";

export const calculateDistance = (
  { latitude: lat1, longitude: lon1 },
  { latitude: lat2, longitude: lon2 }
) => {
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
    const distanceA = calculateDistance(
      { latitude, longitude },
      { latitude: a.uptainerLongitude, longitude: a.uptainerLongitude }
    );
    const distanceB = calculateDistance(
      { latitude, longitude },
      { latitude: b.uptainerLongitude, longitude: b.uptainerLongitude }
    );
    return distanceA - distanceB;
  });

  return sortedList;
};


export function convertKgToTons(amountInKg) {
  if (amountInKg >= 1000) {
    return (amountInKg / 1000).toFixed(2) + " T.";
  } else {
    return amountInKg + " kg";
  }
}
export const setUptainersByIds = async (uptainers) => {
  let res = {}
  uptainers.forEach(u => {
    res[u.uptainerId] = u;

  });
  return res;

}

export function Calculate_co2_Equivalent(co2_total) {
  const co2_pers = 10;
  const conv_factor = 4 / 10;
  const calc_pers = co2_pers * conv_factor;
  const calc_total = co2_total * conv_factor;

  return {
    co2_pers: co2_pers,
    personalEquivalent: Math.round(calc_pers),
    totalEquivalent: Math.round(calc_total),
  };
}

// STATS CALCULATIONS:

//----------------FETCH DATA FROM DATABASE-----------------//

// Fetches all items taken from the database
async function fetchAllTakenItems() {
  const allItems = await getAllItems();
  if (!allItems) return [];
  const allTakenItems = allItems.filter((item) => item.itemTaken !== false);
  return allTakenItems;
}

// Fetches all items taken by a user from the database.
async function fetchAllItemsTakenByUser() {
  let userId = firebaseAurth.currentUser.uid
  userId = "lywlgHhkOcXEa53j9jPADYoWmr22"
  //const allItems = await getAllItems();
  const allItems = TestItems
  const allItemsTakenByUser =
    allItems.filter(
      (item) => item.itemTakenUser === userId && item.itemTaken !== false
    ) || [];
  return allItemsTakenByUser;
}

async function fetchAllItemsTakenFromUser() {
  let userId = firebaseAurth.currentUser.uid
  userId = "lywlgHhkOcXEa53j9jPADYoWmr22"
  //const allUserItems = await getItemsFromUser(userId);
  const allUserItems = TestItems.filter((item) => item.itemUser === userId)
  const allItemsTakenFromUser = allUserItems.filter(
    (item) => item.itemTaken !== false
  );
  return allItemsTakenFromUser;
}

// Fetches CO2 footprint of a product from the database
async function fetchProductCO2(items) {
  let totalco2Footprint = 0
  const products = await getAllProducts()


  for (let a = 0; a < items.length; a++) {
    const co2Footprint = products.find((product) => product.productId === items[a].itemproduct)?.co2Footprint || 0
    items[a].co2Footprint = co2Footprint
    totalco2Footprint += co2Footprint
  }

  return totalco2Footprint
}

//----------------------UPDATE STATS-----------------------//

// Updates all stats based on all taken items by every user
function updateGeneralStats(generalStats, totalco2Footprint, items) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);



  generalStats.allNumberTakenItems = items.length;
  generalStats.allTakenItemsCO2 = totalco2Footprint;

  items.map((item) => {
    const itemDate = new Date(item.itemTakenDate);
    itemDate.setHours(0, 0, 0, 0);

    if (itemDate.getTime() === today.getTime()) {
      generalStats.todayNumberTakenItems += 1;
      generalStats.todayTakenItemsCO2 += item.co2Footprint;
    } else if (itemDate.getTime() === yesterday.getTime()) {
      generalStats.yesterdayNumberTakenItems += 1;
      generalStats.yesterdayTakenItemsCO2 += item.co2Footprint;
    }


    const yearMonthKey = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}`;
    generalStats.allTakenItemsMonth[yearMonthKey] = (generalStats.allTakenItemsMonth[yearMonthKey] || 0) + 1;
  })


}


// Updates uptainer statistics
function updateUptainerStats(allUptainersStats, items) {
  items.map((item) => {
    const uptainer = allUptainersStats[item.itemUptainer];
    if (uptainer) {
      uptainer.itemsReused += 1;
      uptainer.savedCO2 += item.co2Footprint;
    }
  })
}

//----------------------PROCESS STATS-----------------------//
// Process functions sets up the initial stats,
// and then updates them based on the data fetched from the DB.

async function processGeneralStats(allTakenItems) {
  let generalStats = {
    allNumberTakenItems: 0,
    allTakenItemsCO2: 0,
    allTakenItemsMonth: {},
    todayNumberTakenItems: 0,
    todayTakenItemsCO2: 0,
    yesterdayNumberTakenItems: 0,
    yesterdayTakenItemsCO2: 0,
  };

  try {
    const totalco2Footprint = await fetchProductCO2(allTakenItems);
    updateGeneralStats(generalStats, totalco2Footprint, allTakenItems);
  } catch (error) {
    console.error(`Errors occurred during processing general stats:`, error);
  }

  return generalStats;
}

async function processUserStats(allTakenItemsByUser, allTakenItemsFromUser) {
  let userStats = {
    userTakenItems: 0,
    userTakenItemsCO2: 0,
    userDonatedItems: 0,
    userDonatedItemsCO2: 0
  }

  try {
    userStats.userTakenItems = allTakenItemsByUser.length;
    userStats.userTakenItemsCO2 = await fetchProductCO2(allTakenItemsByUser);
    userStats.userDonatedItems = allTakenItemsFromUser.length;
    userStats.userDonatedItemsCO2 = await fetchProductCO2(allTakenItemsFromUser);
  } catch (error) {
    console.error(`Error processing user item ${item.itemId}:`, error);
  }

  return userStats;
}

async function processUptainerStats(allItems, allUptainers) {
  let allUptainersStats = allUptainers.reduce((acc, uptainer) => {
    acc[uptainer.uptainerId] = {
      uptainerCity: uptainer.uptainerCity,
      uptainerName: uptainer.uptainerName,
      uptainerStreet: uptainer.uptainerStreet,
      uptainerId: uptainer.uptainerId,
      itemsReused: 0,
      savedCO2: 0,
      numberUsers: 0,
      uptainerDescription: uptainer.uptainerDescription,
      uptainerImage: uptainer.uptainerImage,
      uptainerLatitude: uptainer.uptainerLatitude,
      uptainerLongitude: uptainer.uptainerLongitude,
      uptainerQR: uptainer.uptainerQR,
      uptainerZip: uptainer.uptainerZip,
    };
    return acc;
  }, {});

  try {
    takenItems = allItems.filter((item) => item.itemTaken === true)
    await fetchProductCO2(takenItems);
    updateUptainerStats(allUptainersStats, takenItems);
  } catch (error) {
    console.error(`Errors occured during processing uptainer stats:`, error);
  }

  return allUptainersStats;
}

//----------------------CALCULATE STATS-----------------------//
// Calculate functions call the process functions,
// and return the final stats that will be used in the relevant components.

export async function calculateGeneralStats() {
  const allTakenItems = await fetchAllTakenItems();
  //const generalStats = await processGeneralStats(allTakenItems);
  const generalStats = await processGeneralStats(TestItems.filter((item) => item.itemTaken === true));
  return generalStats;
}

async function calculateUserStats() {
  const allUserTakenItems = await fetchAllItemsTakenByUser();
  const allUserDonatedItems = await fetchAllItemsTakenFromUser();
  const userStats = await processUserStats(
    allUserTakenItems,
    allUserDonatedItems
  );
  return userStats;
}

async function calculateUptainerStats() {
  const allUptainers = await getAllUptainers();
  //const allItems = await fetchAllTakenItems();
  const allItems = TestItems.filter((item) => item.itemTaken == true)
  const allUptainersStats = await processUptainerStats(allItems, allUptainers);
  
  const sortedUptainers = (Object.values(allUptainersStats).sort(
    (a, b) => b.itemsReused - a.itemsReused
  )).slice(0,3).filter((uptainer)=>uptainer.itemsReused>0)

  const mostAchievingUptainers = sortedUptainers[0]

  return { sortedUptainers, mostAchievingUptainers };
}

async function calculateTotalCO2Savings(generalStats) {


  const todayCO2Saved = convertKgToTons(generalStats.todayTakenItemsCO2);
  const yesterdayCO2Saved = convertKgToTons(generalStats.yesterdayTakenItemsCO2);
  const totalCO2Saved = generalStats.allTakenItemsCO2;

  return {
    todayCO2Saved,
    yesterdayCO2Saved,
    totalCO2Saved,
  };
}

// Export functions return relevant stats that will be used in the components.
// For Stat.js component
export async function getAllItemAndUptainerStats(generalStats) {
  try {
    let stats;

    const uptainerStats = await calculateUptainerStats();


    stats = {
      allTakenItems: generalStats.allNumberTakenItems,
      todayTakenItems: generalStats.todayNumberTakenItems,
      yesterdayTakenItems: generalStats.yesterdayNumberTakenItems,
      allTakenItemsMonth: generalStats.allTakenItemsMonth,
      bestUptainer: uptainerStats.mostAchievingUptainers,
      top3Uptainers: uptainerStats.sortedUptainers,
    };

    return stats;
  } catch (error) {
    console.error("Error calculating statistics:", error);
    throw error;
  }
}


// For Stat.js
export async function getAllCO2Stats(generalStats) {
  try {
    let co2Stats;
    const calculatedCO2 = await calculateTotalCO2Savings(generalStats);
    co2Stats = {
      todayCO2Saved: calculatedCO2.todayCO2Saved,
      yesterdayCO2Saved: calculatedCO2.yesterdayCO2Saved,
      totalCO2Saved: calculatedCO2.totalCO2Saved,
    };
    return co2Stats;
  } catch (error) {
    console.error("Error calculating CO2 statistics:", error);
    throw error;
  }
}

// For YourStats.js
export async function getUserStats() {
  try {
    let stats;
    const userStats = await calculateUserStats();
    stats = {
      userTakenItems: userStats.userTakenItems,
      userDonatedItems: userStats.userDonatedItems,
      totalC02Saved: userStats.userTakenItemsCO2 + userStats.userDonatedItemsCO2,
    };
    return stats;
  } catch (error) {
    console.error("Error calculating user statistics:", error);
    throw error;
  }
}