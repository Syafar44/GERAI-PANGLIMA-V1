"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const Map = () => {
  const position: [number, number] = [-1.7802342357458938, 116.14915693673032]; 

  const gerai: {
    name: string;
    coords: [number, number];
    icon: Icon;
  }[] = [
    {
      name: "Gerai Panglima",
      coords: [-0.4776853819479284, 117.13719689829813],
      icon: new Icon({
        iconUrl: "image/icon/location.png",
        iconSize: [60, 60],
        iconAnchor: [20, 40],
      }),
    },
    {
      name: "Gerai Panglima Apt Purwanoto",
      coords: [-0.3709727811860131, 117.25706159523004],
      icon: new Icon({
        iconUrl: "image/icon/location.png",
        iconSize: [60, 60],
        iconAnchor: [20, 40],
      }),
    },
    {
      name: "Gerai Panglima Bandara sepinggan",
      coords: [-1.2619600226935757, 116.89824465771892],
      icon: new Icon({
        iconUrl: "image/icon/location.png",
        iconSize: [60, 60],
        iconAnchor: [20, 40],
      }),
    },
  ];

  return (
    <MapContainer
      center={position}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="rounded-md z-40"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {gerai.map((o, i) => (
        <Marker key={i} position={o.coords} icon={o.icon}>
          <Popup>{o.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
