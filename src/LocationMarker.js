import { useEffect, useState } from "react";
import { Circle, CircleMarker, Pane, Popup, useMap } from "react-leaflet";

function LocationMarker() {
  const map = useMap();

  const [locationPosition, setLocationPosition] = useState(null)
  const [locationAccuracy, setLocationAccuracy] = useState(null)

  useEffect(() => {
    map.on("locationfound", (e) => {
      setLocationPosition(e.latlng)
      setLocationAccuracy(e.accuracy)
    });

    map.on('locationerror', (e) => {
      alert(e.message);
    });

    map.locate()
  }, [map])

  if (!locationPosition) {
    return null
  }

  return (
    <CircleMarker center={locationPosition} radius={5} color="black" weight={0.5} fillOpacity={1} fillColor="#00efff">
      <Popup>
        Ваше местоположение ±{locationAccuracy.toFixed()} м
      </Popup>
    </CircleMarker>
  )
}

export default LocationMarker;