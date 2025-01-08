function displayTime() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  if (document.querySelector(".clock")){
    document.querySelector(".clock").innerHTML = time;
  }
}
setInterval(displayTime, 1000);