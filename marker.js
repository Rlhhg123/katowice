function collapse(places, map, currentPlace) {
  places.forEach((place, i) => {
    const marker = place.marker;
    place.screen = map.latLngToContainerPoint(marker.getLatLng());
    marker._icon.classList.remove("disabled");
  });

  places.forEach((place, i) => {
    const marker = place.marker;
    if (!marker.options.interactive) return;
    const position = place.screen;

    for (let index = i + 1; index < places.length; index++) {
      const second = places[index].marker;
      const secondPosition = places[index].screen;
      const distance = pitagoras(position, secondPosition);
      if (distance < 800) {
        if (
          (currentPlace == place.id ? Infinity : place.weight) <
          (currentPlace == places[index].id ? Infinity : places[index].weight)
        ) {
          marker._icon.classList.add("disabled");
        } else {
          second._icon.classList.add("disabled");
        }
      }
    }
  });
}

export { collapse };

function pitagoras(a, b) {
  const diff = { x: a.x - b.x, y: a.y - b.y };
  return diff.x * diff.x + diff.y * diff.y;
}
