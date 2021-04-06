import React, { useState, useEffect } from "react";
import axios from "axios";
import Map, { Marker, NavigationControl } from "react-map-gl";
import Pin from "./Pin";

export default function MapBox() {
  const [myView, setmyView] = useState({
    latitude: 28.60,
    longitude: 77.18,
    width: "90vw",
    height: "85vh",
    zoom: 15,
  });
  const [deliveryLocations, setDeliveryLocations] = useState([]);

  useEffect(() => {
    setInterval(() => {
      axios
        .get("https://dev.api.xorp.io/middleware/v1/agents/location")
        .then((res) => {
          console.log(res.data.data);
          setDeliveryLocations(res.data.data);
        });
    }, 10000);
  }, []);
  return (
    <div>
      <Map
        {...myView}
        width="100vw"
        height="100vh"
        scrollZoom={true}
        doubleClickZoom={true}
        mapboxApiAccessToken="pk.eyJ1IjoicmFuaml0a3NoYWgiLCJhIjoiY2ticWNkanUzMmllczJybmN3NmV5NmxhbyJ9.xLeI2B_Zuvtze-APbGfctA"
        onViewportChange={setmyView}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <NavigationControl />
        {deliveryLocations?.map((location) => {
          return (
            <Marker key={location.agentId} longitude={location.longitude} latitude={location.latitude}>
              <Pin size="20" name={location.agentName} />
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
