function displayTime() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  document.querySelector(".clock").innerHTML = time;
}
setInterval(displayTime, 1000);