"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { FaLock } from "react-icons/fa6";

type PropTypes = {
  name: string;
  coords: [number, number];
  zoom?: number;
};

const MapLock = (props: PropTypes) => {
  const { name, coords, zoom = 16 } = props;

  const icon = new Icon({
    iconUrl: "/image/icon/location.png",
    iconSize: [60, 60],
    iconAnchor: [20, 40],
  });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md">
      <MapContainer
        center={coords}
        zoom={zoom}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords} icon={icon}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
      <div className="absolute inset-0 z-10 cursor-not-allowed bg-black/5" />
      <span className="absolute top-2 right-2 z-20 flex items-center gap-2 rounded-md bg-black/60 px-3 py-1 text-xs text-white">
        <FaLock size={12} /> Lokasi terkunci
      </span>
    </div>
  );
};

export default MapLock;
