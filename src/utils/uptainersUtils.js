import { items, products } from "../utils/SeedData.js";
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

export function convertKgToTons(kg) {
  if (kg >= 1000) {
    return (kg / 1000).toFixed(2) + " t";
  } else {
    return kg + " kg";
  }
}

export function Calculate_co2_Equivalent(co2_total) {
  const co2_pers = 10;
  const conv_factor = 4 / 10;
  const calc_pers = co2_pers * conv_factor;
  const calc_total = co2_total * conv_factor;

  return {
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
async function fetchAllItemsTakenByUser(userId) {
  const allItems = await getAllItems();
  const allItemsTakenByUser = allItems
    .filter((item) => item.itemTakenUser === userId && item.itemTaken !== false) || [];
  console.log("allItemsTakenByUser:", allItemsTakenByUser);
  return allItemsTakenByUser;
}

async function fetchAllItemsTakenFromUser(userId) {
  const allUserItems = await getItemsFromUser(userId);
  const allItemsTakenFromUser = allUserItems.filter((item) => item.itemTaken !== false);
  console.log("allItemsTakenFromUser:", allItemsTakenFromUser);
  return allItemsTakenFromUser;
}

// Fetches CO2 footprint of a product from the database
async function fetchProductCO2(item) {
  const productInfo = await getProductById(item.itemproduct);
  return productInfo.co2Footprint || 0;
}

//----------------------UPDATE STATS-----------------------//

// Updates all stats based on all taken items by every user
function updateGeneralStats(generalStats, co2Footprint, itemTakenDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const itemDate = new Date(itemTakenDate);
  itemDate.setHours(0, 0, 0, 0);

  generalStats.allNumberTakenItems += 1;
  generalStats.allTakenItemsCO2 += co2Footprint;

  if (itemDate.getTime() === today.getTime()) {
    generalStats.todayNumberTakenItems += 1;
    generalStats.todayTakenItemsCO2 += co2Footprint;
  } else if (itemDate.getTime() === yesterday.getTime()) {
    generalStats.yesterdayNumberTakenItems += 1;
    generalStats.yesterdayTakenItemsCO2 += co2Footprint;
  }

  const yearMonthKey = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}`;
  generalStats.allTakenItemsMonth[yearMonthKey] =
    (generalStats.allTakenItemsMonth[yearMonthKey] || 0) + 1;
}

// Updates user statistics based on a single taken item
function updateUserStats(stats, co2Footprint) {
  stats.userTakenItems += 1;
  stats.userTakenItemsCO2 += co2Footprint;
  stats.userDonatedItems += 1;
  stats.userDonatedItemsCO2 += co2Footprint;
}

// Updates uptainer statistics
function updateUptainerStats(allUptainersStats, item, co2Footprint) {
  const uptainer = allUptainersStats[item.itemUptainerId];
  if (uptainer) {
    uptainer.itemsReused += 1;
    uptainer.savedCO2 += co2Footprint;
  }
}

//----------------------PROCESS STATS-----------------------//
// Process functions sets up the initial stats, 
// and then updates them based on the data fetched from the DB.

async function processGeneralStats(allItems) {
  let generalStats = {
    allNumberTakenItems: 0,
    allTakenItemsCO2: 0,
    allTakenItemsMonth: {},
    todayNumberTakenItems: 0,
    todayTakenItemsCO2: 0,
    yesterdayNumberTakenItems: 0,
    yesterdayTakenItemsCO2: 0,
  };
console.log("generalStats:", generalStats);
  await Promise.all(
    allItems.map(async (item) => {
      try {
        const co2Footprint = await fetchProductCO2(item);
        updateGeneralStats(generalStats, co2Footprint, item.itemTakenDate);
      } catch (error) {
        console.error(`Errors occurred during processing general stats:`, error);
      }
    })
  );

  return generalStats;
}

async function processUserStats(allTakenItemsByUser, allTakenItemsFromUser) {
  let userStats = {
    userTakenItems: 0,
    userTakenItemsCO2: 0,
    userDonatedItems: 0,
    collectedUserItems: 0,
    collectedUserItemsCO2: 0,
  };

  await Promise.all(
    allTakenItemsByUser.map(async (item) => {
      try {
        const co2Footprint = await fetchProductCO2(item);
        updateUserStats(userStats, co2Footprint);
      } catch (error) {
        console.error(`Error processing user item ${item.itemId}:`, error);
      }
    }),
    allTakenItemsFromUser.map(async (item) => {
      try {
        const co2Footprint = await fetchProductCO2(item);
        updateUserStats(userStats, co2Footprint);
      } catch (error) {
        console.error(`Error processing user item ${item.itemId}:`, error);
      }
    }));

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

  await Promise.all(
    allItems.map(async (item) => {
      try {
        if (item.itemTaken) {
          const co2Footprint = await fetchProductCO2(item);
          updateUptainerStats(allUptainersStats, item, co2Footprint);
        }
      } catch (error) {
        console.error(`Errors occured during processing uptainer stats:`,error);
      }
    })
  );
  return allUptainersStats;
}

//----------------------CALCULATE STATS-----------------------//
// Calculate functions call the process functions,
// and return the final stats that will be used in the relevant components.

async function calculateGeneralStats() {
  const allTakenItems = await fetchAllTakenItems();
  const generalStats = await processGeneralStats(allTakenItems);
  return generalStats;
}

async function calculateUserStats(userId) {
  const allUserTakenItems = await fetchAllItemsTakenByUser(userId);
  const allUserDonatedItems = await fetchAllItemsTakenFromUser(userId);
  const userStats = await processUserStats(allUserTakenItems, allUserDonatedItems);
  return userStats;
}

async function calculateUptainerStats() {
  const allUptainers = await getAllUptainers();
  const allItems = await fetchAllTakenItems();
  const allUptainersStats = await processUptainerStats(allItems, allUptainers);

  const sortedUptainers = Object.values(allUptainersStats).sort(
    (a, b) => b.itemsReused - a.itemsReused
  );
  const mostAchievingUptainers = sortedUptainers
    .filter((uptainer) => uptainer.itemsReused > 0)
    .sort((a, b) => b.savedCO2 - a.savedCO2)
    .slice(0, 3);

  return { sortedUptainers, mostAchievingUptainers };
}

// Export functions return relevant stats that will be used in the components.
// For Stat.js component
export async function getAllStats() {
  try {
    let stats;
    const generalStats = await calculateGeneralStats();
    const uptainerStats = await calculateUptainerStats();

    stats = {
      allTakenItems: generalStats.allNumberTakenItems,
      todayTakenItems: generalStats.todayNumberTakenItems,
      yesterdayTakenItems: generalStats.yesterdayNumberTakenItems,
      allTakenItemsMonth: generalStats.allTakenItemsMonth,
      bestUptainer: uptainerStats.sortedUptainers[0],
      top3Uptainers: uptainerStats.mostAchievingUptainers,
    };

    return stats;
  } catch (error) {
    console.error("Error calculating statistics:", error);
    throw error;
  }
}

// For YourStats.js component
export async function getUserStats(userId) {
  try {
    let stats;
    const userStats = await calculateUserStats(userId);
    console.log("userStats:", userStats);
    stats = {
      userTakenItems: userStats.userTakenItems,
      userTakenItemsCO2: userStats.userTakenItemsCO2,
      userDonatedItems: userStats.userDonatedItems,
      collectedUserItems: userStats.collectedUserItems,
      collectedUserItemsCO2: userStats.collectedUserItemsCO2,
    };
    return userStats;
  } catch (error) {
    console.error("Error calculating user statistics:", error);
    throw error;
  }
}

 /*  co2FootprintTaken: 0,
    co2FootprintNotTaken: 0,
    itemsDonated: 0,
    itemsCollected: 0, */

// OLD STATS CALCULATIONS - CAN BE REMOVED AFTER TESTING
/* export async function CalculateStatistic() {
  // Load all items from database
  const items = await getAllItems();
  // test getAllItems from repo:
  console.log("items from firestore for calStats:", items);

  // Load all Uptainers from database
  const allUptainers = await getAllUptainers();
  const userCurrent = await getCurrentUser();
  // Create variables for counting
  let allNumberTakenItems = 0;
  let todayNumberTakenItems = 0;
  let yesterdayNumberTakenItems = 0;
  let allTakenItemsCO2 = 0;
  let todayTakenItemsCO2 = 0;
  let yesterdayTakenItemsCO2 = 0;

  //Date today
  const today = new Date();

  //Date yersterday
  const yesterday = new Date(today - 86400000);

  //Create a dictionary for counting reused items by month
  const allTakenItemsMonth = {};
  //Create all Uptainers in allUptainersStat
  const allUptainersStat = allUptainers.reduce((acc, uptainer) => {
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

  for (const item of items) {
    //for each item (remember async & await) && PromisAll
    const itemUptainer = allUptainersStat[item["itemUptainer"]];
    const productInfo = await getProductById(item["itemproduct"]);
    //Counting how many times Uptainer was used for putting item
    if (itemUptainer) {
      if (item["itemUser"] == userCurrent["id"]) {
        itemUptainer["numberUsers"] += 1;
      }
    }
    //Filter items, which was taken
    if (item.itemTaken == true) {
      //Counting how many times Uptainer was used for taking item
      if (itemUptainer) {
        if (item["itemTakenUser"] == userCurrent["id"]) {
          itemUptainer["numberUsers"] += 1;
        }
        itemUptainer["itemsReused"] += 1;
        //Getting info about co2Footprint this item
        //const productInfo = await getProductById(item["itemproduct"]);
        itemUptainer["savedCO2"] += productInfo["co2Footprint"];
      }
      allNumberTakenItems += 1;
      allTakenItemsCO2 += productInfo["co2Footprint"];
      //Filter reused items, which have itemTakenDate. itemTakenDate should has format "YYYY-MM-DD" (like itemTakenDate: "2023-12-06")
      if (item.itemTakenDate) {
        const itemTakenDate = new Date(item.itemTakenDate);
        if (itemTakenDate.toLocaleDateString() == today.toLocaleDateString()) {
          todayNumberTakenItems += 1;
          todayTakenItemsCO2 += productInfo["co2Footprint"];
        }
        if (
          itemTakenDate.toLocaleDateString() == yesterday.toLocaleDateString()
        ) {
          yesterdayNumberTakenItems += 1;
          yesterdayTakenItemsCO2 += productInfo["co2Footprint"];
        }
        if (
          allTakenItemsMonth[
            itemTakenDate.getFullYear().toString() +
              "-" +
              (itemTakenDate.getMonth() + 1).toString()
          ]
        ) {
          allTakenItemsMonth[
            itemTakenDate.getFullYear().toString() +
              "-" +
              (itemTakenDate.getMonth() + 1).toString()
          ] += 1;
        } else {
          allTakenItemsMonth[
            itemTakenDate.getFullYear().toString() +
              "-" +
              (itemTakenDate.getMonth() + 1).toString()
          ] = 1;
        }
      }
    }
  }
  //Definition of the most popular Uptainer
  //const bestUptainerId = Object.entries(allUptainersStat).reduce((acc, curr) => acc[1]["numberUsers"] > curr[1]["numberUsers"] ? acc : curr)[0];
  //const bestUptainer = allUptainersStat[bestUptainerId];
  //Sorting by number of users
  const sortedUptainers = Object.values(allUptainersStat).sort(function (
    uptainer1,
    uptainer2
  ) {
    return uptainer2["numberUsers"] - uptainer1["numberUsers"];
  });
  //Filtering uptainers with number of users > 0
  const sortedFiltredUptainers = sortedUptainers.filter(function (uptainer) {
    return uptainer["numberUsers"] > 0;
  });

  const mostAchievingUptainers = Object.entries(allUptainersStat)
    .map(([uptainerId, uptainer]) => ({
      uptainerId,
      uptainerName: uptainer.uptainerName,
      uptainerLocation: `${uptainer.uptainerStreet},${uptainer.uptainerCity}`,
      itemsReused: uptainer.itemsReused,
      Co2Savings: uptainer.savedCO2,
    }))
    .sort((a, b) => b.Co2Savings - a.Co2Savings);

  //Create result after counting reused items
  result = {
    allTakenItems: allNumberTakenItems,
    allTakenItemsCO2: allTakenItemsCO2,
    todayTakenItems: todayNumberTakenItems,
    todayTakenItemsCO2: todayTakenItemsCO2,
    yesterdayTakenItems: yesterdayNumberTakenItems,
    yesterdayTakenItemsCO2: yesterdayTakenItemsCO2,
    allTakenItemsMonth: allTakenItemsMonth, //{"2023-Dec": 1, "2023-Jul": 1, "2023-Nov": 1, "2023-Sep": 1}
    //bestUptainer: bestUptainer,
    bestUptainers: sortedFiltredUptainers,
    top3Uptainers: mostAchievingUptainers,
  };
  //Print for checking
  //console.log(result)
  return result;
} */
