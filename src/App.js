import { useEffect, useState } from "react";
import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet'
import LocationMarker from "./LocationMarker";
import ParkingMarker from "./ParkingMarker";
import "leaflet/dist/leaflet.css";

const initialPosition = [55.755864, 37.617698]

async function fetchParkings() {
  const timestamp = Date.now()
  const resp = await fetch(`https://stations.velobike.ru/ajax/parkings/?_=${timestamp}`)
  const data = await resp.json()
  return data
}

function App() {
  const [parkings, setParkings] = useState([])

  useEffect(() => {
    fetchParkings().then((parkings) => {
      setParkings(parkings.Items)
    }).catch(err => {
      alert(err.message)
      setParkings([])
    })
  }, [])

  return (
    <MapContainer center={initialPosition} zoom={10} style={{ width: "100%", height: "100%" }} attributionControl={false}>
      <AttributionControl prefix="Leaflet" />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {parkings.map(parking => <ParkingMarker key={parking.Id} parking={parking} />)}

      <LocationMarker />
    </MapContainer>
  );
}

export default App;
