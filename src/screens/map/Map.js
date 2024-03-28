import Screen from "../../templates/standardScreens/screen";

import React from "react";
import StationsMap from "../../components/mapDisplay/stations-map/StationsMap";

const Map = () => {
  return (
    <Screen>
      <StationsMap/>
    </Screen>
  );
};

export default Map;
