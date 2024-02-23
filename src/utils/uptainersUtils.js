import {
  getAllItems,
  getAllUptainers,
  getItemsFromUser,
  getAllProducts,
} from "../utils/Repo";
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
    const distanceA = calculateDistance({ latitude, longitude }, {latitude: a.uptainerLatitude, longitude: a.uptainerLongitude});
    const distanceB = calculateDistance({ latitude, longitude }, {latitude: b.uptainerLatitude, longitude: b.uptainerLongitude});
    return distanceA - distanceB;
  });

  return sortedList;
};


export function convertKgToTons(amountInKg) {
  if (amountInKg >= 1000) {
    return (amountInKg / 1000).toFixed(2) + " T.";
  } else {
    return amountInKg + " Kg.";
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
  const allTakenItems = allItems.filter((item) => item.itemTaken != false);
  return allTakenItems;
}



// Fetches CO2 footprint of a product from the database
async function fetchProductCO2(items) {
  if (items.length == 0) {
    return 0
  }

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
function updateGeneralStats(generalStats, items) {



}






//----------------------CALCULATE STATS-----------------------//
// Calculate functions call the process functions,
// and return the final stats that will be used in the relevant components.

export async function calculateGeneralStats() {
  const generalStats = {
    allNumberTakenItems: 0,
    allTakenItemsCO2: 0,
    allTakenItemsMonth: {},
    todayNumberTakenItems: 0,
    todayTakenItemsCO2: 0,
    yesterdayNumberTakenItems: 0,
    yesterdayTakenItemsCO2: 0,
  };


  const allTakenItems = await fetchAllTakenItems();
  const totalTakenco2Footprint = await fetchProductCO2(allTakenItems);
  const today = new Date();
  const yesterday = new Date(today);
  today.setHours(0, 0, 0, 0);
  yesterday.setDate(today.getDate() - 1);




  generalStats.allNumberTakenItems = allTakenItems.length;
  generalStats.allTakenItemsCO2 = totalTakenco2Footprint;




  allTakenItems.map((item) => {
    if (item.itemTakenDate) {
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
    }
  })

  return generalStats;
}


async function calculateUptainerStats() {
  const allUptainers = await getAllUptainers();
  const allItems = await getAllItems()
  const currentMonth = new Date().getMonth()
  const userId = firebaseAurth.currentUser.uid
  //const userId = "8lKtUP0HFuVf0QMUXjxJIIo3QTC3"

  const allUptainersStats = allUptainers.reduce((acc, uptainer) => {
    acc[uptainer.uptainerId] = {
      ...uptainer,
      takenItems: 0,
      takenItemsThisMonth: 0,
      savedCO2: 0,
      droppedItems: 0,
      myDroppedItems: 0,
      myTakenItems: 0
    };
    return acc;
  }, {});

  // set co2Footprint to each item
  await fetchProductCO2(allItems);


  // loop over items and make calculations
  allItems.map((item) => {
    const uptainer = allUptainersStats[item.itemUptainer];
    if (uptainer) {
      if (item.itemTaken) {
        if (item.itemTaken == userId) {
          uptainer.myTakenItems += 1
        }

        const itemDate = new Date(item.itemTakenDate)
        if (itemDate.getMonth() == currentMonth) {
          uptainer.takenItemsThisMonth++
        }

        uptainer.takenItems += 1
        uptainer.savedCO2 += item.co2Footprint
      } else {
        if (item.itemUser == userId) {
          uptainer.myDroppedItems += 1
        }

        uptainer.droppedItems += 1
      }
    }
  })


  const sortedUptainersThisMonth = (Object.values(allUptainersStats).sort(
    (a, b) => b.takenItemsThisMonth - a.takenItemsThisMonth
  )).slice(0, 3)

  // currently not used in Stats
  const sortedUptainers = (Object.values(allUptainersStats).sort(
    (a, b) => b.takenItems - a.takenItems
  )).slice(0, 3)

  // currently not used in Stats
  const mostVisitedUptainers = (Object.values(allUptainersStats).sort(
    (a, b) => (b.droppedItems + b.takenItems) - (a.droppedItems + a.takenItems)
  )).slice(0, 3)

  // most visited uptainer based on user dropped + taken items
  const myMostVisitedUptainers = (Object.values(allUptainersStats).sort(
    (a, b) => (b.myDroppedItems + b.myTakenItems) - (a.myDroppedItems + a.myTakenItems)
  )).slice(0, 3)




  return {
    sortedUptainers,
    sortedUptainersThisMonth,
    mostVisitedUptainers,
    myMostVisitedUptainers
  }
}



// Export functions return relevant stats that will be used in the components.
// For Stat.js component
export async function getAllItemAndUptainerStats(generalStats) {
  const uptainerStats = await calculateUptainerStats();

  const stats = {
    allTakenItems: generalStats.allNumberTakenItems,
    todayTakenItems: generalStats.todayNumberTakenItems,
    yesterdayTakenItems: generalStats.yesterdayNumberTakenItems,
    allTakenItemsMonth: generalStats.allTakenItemsMonth,
    top3Uptainers: uptainerStats.sortedUptainers,
    top3UptainersThisMonth: uptainerStats.sortedUptainersThisMonth,
    mostVisitedUptainers: uptainerStats.mostVisitedUptainers,
    myMostVisitedUptainers: uptainerStats.myMostVisitedUptainers
  };

  return stats;
}


// For Stat.js
export async function getAllCO2Stats(generalStats) {
  return {
    todayCO2Saved: convertKgToTons(generalStats.todayTakenItemsCO2),
    yesterdayCO2Saved: convertKgToTons(generalStats.yesterdayTakenItemsCO2),
    totalCO2Saved: generalStats.allTakenItemsCO2
  }
}


export async function getUserStats() {
  var allUserCollectedItems = []
  var allUserDonatedItems = []

  const userId = firebaseAurth.currentUser.uid
  //const userId = "8lKtUP0HFuVf0QMUXjxJIIo3QTC3"
  const allUserItems = await getItemsFromUser(userId);


  allUserItems.map((item) => {
    if (item.itemTaken) {
      if (item.itemUser == userId) {
        allUserCollectedItems.push(item)
      }
    } else {
      allUserDonatedItems.push(item)
    }
  })




  const userStats = {
    userCollectedItems: allUserCollectedItems.length,
    userCollectedItemsCO2: await fetchProductCO2(allUserCollectedItems),
    userDonatedItems: allUserDonatedItems.length,
    userDonatedItemsCO2: await fetchProductCO2(allUserDonatedItems)
  }



  return {
    ...userStats,
    totalC02Saved: userStats.userCollectedItemsCO2 + userStats.userDonatedItemsCO2
  }
}