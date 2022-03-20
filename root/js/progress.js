// Function to initial the height and width of the progress from style file
var widthOfProgress;
var heightOfProgress;
var progress;
var heightOfSun;
var isSun = null;

var brackpointOfSunrise =
  sunrise.sunriseHours * 3600 + sunrise.sunriseMinutes * 60;
var brackpointOfSunset = sunset.sunsetHours * 3600 + sunset.sunsetMinutes * 60;
var spentInSeconds = hours * 3600 + minutes * 60 + seconds;
var sunInSky = brackpointOfSunset - brackpointOfSunrise;
var sunIsNotInSky = 86400 - sunInSky;

function updateProgress() {
  calcProgress();
  setProgress();
  heightOfSun = calcHeightOfSun();
  positionTheSun();
}

function setWidthAndHeightOfProgress() {
  widthOfProgress = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--width-of-day-progress"
    )
  );
  heightOfProgress = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--height-of-day-progress"
    )
  );
}

function calcProgress() {
  spentInSeconds++;
  var localSpentInSeconds = spentInSeconds;
  if (
    spentInSeconds >= brackpointOfSunrise &&
    spentInSeconds < brackpointOfSunset
  ) {
    localSpentInSeconds -= brackpointOfSunrise;
    if (isSun == false || isSun == null) {
      isSun = true;
      changeSunOrMoon(isSun);
    }
    return (progress = localSpentInSeconds / sunInSky);
  } else if (spentInSeconds >= brackpointOfSunset) {
    localSpentInSeconds -= brackpointOfSunset;
  } else if (spentInSeconds < brackpointOfSunrise) {
    localSpentInSeconds += 86400 - brackpointOfSunset;
  }
  if (isSun == true || isSun == null) {
    isSun = false;
    changeSunOrMoon(isSun);
  }
  return (progress = localSpentInSeconds / sunIsNotInSky);
}

function changeSunOrMoon(isSun) {
  if (isSun) {
    sunOrMoon.classList.remove("fa-moon", "text-info");
    sunOrMoon.classList.add("fa-sun", "text-warning");
    sunriseInfo.classList.remove("order-last");
    sunriseInfo.classList.add("order-first");
    sunsetInfo.classList.remove("order-first");
    sunsetInfo.classList.add("order-last");
    sunriseInfo.style.transform = "translate(-50%, 0)";
    sunsetInfo.style.transform = "translate(50%, 0)";
  } else {
    sunOrMoon.classList.remove("fa-sun", "text-warning");
    sunOrMoon.classList.add("fa-moon", "text-info");
    sunriseInfo.classList.remove("order-first");
    sunriseInfo.classList.add("order-last");
    sunsetInfo.classList.remove("order-last");
    sunsetInfo.classList.add("order-first");
    sunriseInfo.style.transform = "translate(50%, 0)";
    sunsetInfo.style.transform = "translate(-50%, 0)";
  }
}

function setProgress() {
  document.documentElement.style.setProperty("--progress", progress);
}

function calcHeightOfSun() {
  var localProgress;
  progress < 0.5 ? (localProgress = 1 - progress) : (localProgress = progress);
  return Math.sqrt(
    (Math.pow(heightOfProgress, 2) *
      (Math.pow(widthOfProgress / 2, 2) -
        Math.pow((localProgress * widthOfProgress) / 2, 2))) /
      Math.pow(widthOfProgress / 2, 2)
  );
}

function positionTheSun() {
  sunOrMoon.style.top = (heightOfProgress - heightOfSun).toString() + "px";
  sunOrMoon.style.left = (progress * widthOfProgress).toString() + "px";
}

function setSunriseAndSunsetInfo() {
  sunriseInfo.innerHTML += sunrise.toStringSunrise();
  sunsetInfo.innerHTML += sunset.toStringSunset();
}
