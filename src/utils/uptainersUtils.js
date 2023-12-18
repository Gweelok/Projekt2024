export const calculateDistance = async (userLat, userLon, uptainerLat, uptainerLon) =>{
    let R = 6371.0710; // Radius of the Earth in KM
    let rlat1 = userLat * (Math.PI/180); // Convert degrees to radians
    let rlat2 = uptainerLat * (Math.PI/180); // Convert degrees to radians
    let difflat = rlat2-rlat1; // Radian difference (latitudes)
    let difflon = (uptainerLon-userLon) * (Math.PI/180); // Radian difference (longitudes)

    let distance = 2 * R * 
    Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)
        +Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return distance;
    
}