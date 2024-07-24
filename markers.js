const markers = {};

[
  "museum",
  "monument",
  "attraction",
  "airport",
  "park",
  "historic",
  "church",
  "theatre",
].forEach((c) => {
  markers[c] = new L.Icon({
    iconUrl: `./assets/${c}.svg`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });
});

var userPosIcon = new L.Icon({
  iconUrl: "./assets/userPos.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export { markers, userPosIcon };
