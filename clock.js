var currentSec = getSecondsToday();

var seconds = currentSec / 60 % 1;
var minutes = currentSec / 3600 % 1;
var hours = currentSec / 43200 % 1;

setTime(60 * seconds, "second");
setTime(3600 * minutes, "minute");
setTime(43200 * hours, "hour");

function setTime(left, hand) {
  $(".clock__" + hand).css("animation-delay", "" + left * -1 + "s");
}

function getSecondsToday() {
  let now = new Date();
  var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  let today = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());

  let diff = utc - today;
  return Math.round(diff / 1000);
}
