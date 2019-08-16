const btn = document.querySelector(".btn");
let mymap = L.map('mapid').setView([0, 0], 1);
const sunnyIcon = L.icon({
  iconUrl: 'icons/Sunny.png',
  iconSize: [50, 50],
  iconAnchor: [22, 94],
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW51cmFkaXMiLCJhIjoiY2p5eThvNGdoMTk3eDNibXBmdjlxaTN0dSJ9.4--qIt8LkGdJrvrNjLHZsA', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

const launchPosition = () => {
  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getPosition()
    .then((position) => {
      mymap.setView([position.coords.latitude, position.coords.longitude], 13);
      L.marker([position.coords.latitude, position.coords.longitude], { icon: sunnyIcon }).addTo(mymap);
    })
    .catch((err) => {
      mymap.setView([0, 0], 1);
      console.error(err.message);

    });
}
btn.addEventListener("click", launchPosition);