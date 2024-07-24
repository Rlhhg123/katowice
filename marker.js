function collapse(places, map) {
  places.forEach((place, i) => {
    const marker = place.marker;
    place.screen = map.latLngToContainerPoint(marker.getLatLng());
    marker.setOpacity(1);
    marker.options.interactive = true;
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
        if (place.weight < places[index].weight) {
          marker.setOpacity(0);
          marker.options.interactive = false;
        } else {
          second.setOpacity(0);
          second.options.interactive = false;
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
