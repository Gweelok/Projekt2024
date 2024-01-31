import { products } from "../utils/SeedData";
import { getAllItems, getAllUptainers, getProductById, getCurrentUser, getDraftFromUser, getAllProducts } from "../utils/Repo";

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


export function convertKgToTons (kg) {
    if (kg >= 1000) {
      return (kg / 1000).toFixed(2) + " t";
    } else {
      return kg + " kg";
    }
  };

export function Calculate_co2_Equivalent (co2_total) {
    const co2_pers = 10;
    const conv_factor = 4 / 10;
    const calc_pers = co2_pers * conv_factor;
    const calc_total = co2_total * conv_factor;

    return {
      personalEquivalent: Math.round(calc_pers),
      totalEquivalent: Math.round(calc_total),
    };
  };

export async function CalculateStatistic () {
    // Load all items from database
  const items = await getAllItems();
  console.log("items from firestore for calStats:", items)
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
      const itemUptainer = allUptainersStat[item["itemUptainer"]];
      const productInfo = await getProductById(item["itemproduct"])
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
        allTakenItemsCO2 += productInfo["co2Footprint"]
        //Filter reused items, which have itemTakenDate. itemTakenDate should has format "YYYY-MM-DD" (like itemTakenDate: "2023-12-06")
        if (item.itemTakenDate) {
          const itemTakenDate = new Date(item.itemTakenDate);
          if (itemTakenDate.toLocaleDateString() == today.toLocaleDateString()) {
            todayNumberTakenItems += 1
            todayTakenItemsCO2 += productInfo["co2Footprint"]
          }
          if (itemTakenDate.toLocaleDateString() == yesterday.toLocaleDateString()) {
            yesterdayNumberTakenItems += 1
            yesterdayTakenItemsCO2 += productInfo["co2Footprint"]
          }
          if (allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()]) {
            allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()] += 1
          }
          else {
            allTakenItemsMonth[itemTakenDate.getFullYear().toString() + "-" + (itemTakenDate.getMonth() + 1).toString()] = 1
          }
        }
      }
    }
    //Definition of the most popular Uptainer
    //const bestUptainerId = Object.entries(allUptainersStat).reduce((acc, curr) => acc[1]["numberUsers"] > curr[1]["numberUsers"] ? acc : curr)[0];
    //const bestUptainer = allUptainersStat[bestUptainerId];
    //Sorting by number of users
    const sortedUptainers = Object.values(allUptainersStat).sort(function(uptainer1, uptainer2){
      return uptainer2["numberUsers"] - uptainer1["numberUsers"]
    })
    //Filtering uptainers with number of users > 0
    const sortedFiltredUptainers = sortedUptainers.filter(function(uptainer){
      return uptainer["numberUsers"] > 0
    })

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
      top3Uptainers: mostAchievingUptainers
    }
    //Print for checking
    //console.log(result)
    return result
  }