import { CircleMarker, Popup } from "react-leaflet"

const velobikeAttribution = 'данные с сайта <a href="https://stations.velobike.ru/parkings/">Велобайк</a>'

function getBikeTypeLabel(bikeType) {
  switch (bikeType) {
    case "ordinary":
      return "механические"

    case "electric":
      return "электрические"

    default:
      return bikeType
  }
}

function getBikeTypeColor(stationType) {
  if (stationType.includes("ordinary")) {
    return "#61ba9e"
  }

  return "#ed3a35"
}

function ParkingMarker({ parking }) {
  return (
    <CircleMarker center={[parking.Position.Lat, parking.Position.Lon]} radius={5} color="#000000" weight={0.5} fillOpacity={1} fillColor={getBikeTypeColor(parking.StationTypes)} attribution={velobikeAttribution}>
      <Popup>
        <div style={{ display: "flex", flexDirection: "column", rowGap: "4px" }}>
          <div><b>Станция №{parking.Id}</b></div>
          <div><b>Адрес:</b> {parking.Address}</div>
          <div><b>Типы велосипедов:</b> {parking.StationTypes.map((type) => getBikeTypeLabel(type)).join(', ')}</div>
          <div><b>Механические велосипеды:</b> {parking.AvailableOrdinaryBikes}</div>
          <div><b>Электрические велосипеды:</b> {parking.AvailableElectricBikes}</div>
          <div><b>Свободных мест:</b> {parking.FreePlaces}</div>
        </div>
      </Popup>
    </CircleMarker>
  )
}

export default ParkingMarker;