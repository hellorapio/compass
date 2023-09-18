import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./styles/Map.module.css";
import { useCities } from "../hooks/useCities";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";
import useURLPosition from "../hooks/useURLPosition";

const Map: FC = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    52, 14,
  ]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPos,
    position: positionGeo,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useURLPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);

  useEffect(() => {
    if (positionGeo) setMapPosition([positionGeo.lat, positionGeo.lng]);
  }, [positionGeo]);

  return (
    <div className={styles.map}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPos ? "Loading..." : "Set Your Position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.leafletMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePos position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangePos: FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick: FC = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
};

export default Map;
