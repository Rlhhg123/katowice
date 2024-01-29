var silent = false;
const u = (url) => {
  if (url.startsWith("http")) {
    var win = window.open(url, "_blank");
    win.focus();
  }
  if (url.startsWith("#")) {
    if (url.startsWith("#mainmenu")) {
      mainmenu.classList.remove("hidden");
    }
    if (url.startsWith("#map")) {
      mainmenu.classList.add("hidden");
      url = trimPrefix(url, "#map:");
      place = places[url];
      if (place) {
        map.setView(new L.LatLng(place.lat, place.lon), 19);
        displayPlace(url);
      }
    } else {
      tooltips.style.height = "0%";
    }
  }
};

window.addEventListener("popstate", function () {
  if (!silent) {
    u(window.location.hash);
  }
  silent = false;
});

function trimPrefix(str, prefix) {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  } else {
    return str;
  }
}
