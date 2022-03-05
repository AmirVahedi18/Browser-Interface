"use strict";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var heightOfWindow;
var widthOfWindow;
var currentDate;
var hours;
var minutes;
var seconds;
var widthOfProgress;
var heightOfProgress;
var progress;
var heightOfSun;
var usingTowlveHours = true;
var isSun = null;

var sunrise = {
  hours: 6,
  minutes: 35,
  toStringSunrise: function () {
    return setZero(this.hours.toString()) + ":" + setZero(this.minutes);
  },
};

var sunset = {
  hours: 18,
  minutes: 1,
  toStringSunset: function () {
    return setZero(this.hours.toString()) + ":" + setZero(this.minutes);
  },
};

setTimeVars();
const brackpointOfSunrise = sunrise.hours * 3600 + sunrise.minutes * 60;
const brackpointOfSunset = sunset.hours * 3600 + sunset.minutes * 60;
var spentInSeconds = hours * 3600 + minutes * 60 + seconds;
var sunInSky = brackpointOfSunset - brackpointOfSunrise;
var sunIsNotInSky = 86400 - sunInSky;

inisialation();

function inisialation() {
  updateResolution();
  setTimeVars();
  goodTime();
  setDate();
  setTransitionToOClocks();
  setSunriseAndSunsetInfo();
  timeInterval();
  setSeconds();
  setMinutes();
  setHours();
  setWidthAndHeight();
  calcProgress();
  setProgress();
  calcHeightOfSun();
  positionTheSun();
}

// Function to initialize the time variables
function setTimeVars() {
  currentDate = new Date();
  hours = currentDate.getHours();
  minutes = currentDate.getMinutes();
  seconds = currentDate.getSeconds();
}

// Function to set the good time comment
function goodTime() {
  var goodTimeComment;
  if (hours >= 5 && hours < 12) {
    goodTimeComment = "Good Morning!";
  } else if (hours >= 12 && hours < 17) {
    goodTimeComment = "Good Afternoon!";
  } else if (hours >= 17 && hours < 21) {
    goodTimeComment = "Good Evening!";
  } else {
    goodTimeComment = "Good Night!";
  }
  document.getElementById("goodTime").innerHTML += goodTimeComment;
}

// Function to set the currnet date (weekday, month, date, year) comment
function setDate() {
  document.getElementById("dateComment").innerHTML =
    days[currentDate.getDay()] +
    ", " +
    months[currentDate.getMonth()] +
    ", " +
    currentDate.getDate() +
    ", " +
    currentDate.getFullYear();
}

// Function to position the numbers around the clock
function setTransitionToOClocks() {
  for (var i = 0; i < 12; i++) {
    document.getElementById("oClock-" + i).style.transform =
      "translate(175px, 0) rotateZ(" + i * 30 + "deg)";
    document.getElementById("oClock-" + i).children[0].style.transform =
      "rotateZ(-" + i * 30 + "deg)";
  }
}

// Function to position the scarfs
function rotateScarfs() {
  var degree = seconds * 6 - 90;
  document.getElementById("secondScarf").style.transform =
    "translate(200px, 200px) rotateZ(" + degree + "deg)";
  var degree = minutes * 6 + seconds * (6 / 60) - 90;
  document.getElementById("minuteScarf").style.transform =
    "translate(200px, 200px) rotateZ(" + degree + "deg)";
  var degree = hours * 30 + minutes * 0.5 + seconds * (30 / 3600) - 90;
  document.getElementById("hourScarf").style.transform =
    "translate(200px, 200px) rotateZ(" + degree + "deg)";
}

// Time interval of the programm
function timeInterval() {
  setTimeout(function runSeconds() {
    seconds++;
    setSeconds();
    setTimeout(runSeconds, 1000);
  }, 1000);
}

// Function to set the seconds
function setSeconds() {
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    setMinutes();
  }
  secondActions();
  usingTowlveHours ? towlveTime() : setDigitalClock();
}

// Function to set the minutes
function setMinutes() {
  if (minutes == 60) {
    minutes = 0;
    hours++;
    setHours();
  }
}

// Function to set the hours
function setHours() {
  if (hours == 24) {
    hours = 0;
    goodTime();
  }
}

// Function to set the time to digital clock
function setDigitalClock(hour = hours, minute = minutes, second = seconds) {
  document.getElementById("digitalClock").innerHTML = `${setZero(
    hour
  )} : ${setZero(minute)} : ${setZero(second)}`;
}

// Function for actions that take in each seconds
function secondActions() {
  rotateScarfs();
  calcProgress();
  setProgress();
  calcHeightOfSun();
  positionTheSun();
}

// Function to apply 12 hours time
function towlveTime() {
  var changedHours = hours;
  if (changedHours > 12) {
    changedHours -= 12;
    document.getElementById("ampm").innerHTML = " PM";
  } else {
    document.getElementById("ampm").innerHTML = " AM";
  }
  setDigitalClock(changedHours);
}

// Function to add zero to the single number
function setZero(number) {
  if (Math.abs(number).toString().length == 1) {
    return "0" + number;
  } else {
    return number;
  }
}

// Function to initial the height and width of the progress from style file
function setWidthAndHeight() {
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

// Function to calculate how much of the day is spent
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

// Function to change the style of sun or moon when changed
function changeSunOrMoon(isSun) {
  if (isSun) {
    replaceClasses("sunOrMoon", "fa-moon", "fa-sun");
    replaceClasses("sunOrMoon", "text-info", "text-warning");
    replaceClasses("sunriseInfo", "order-last", "order-first");
    replaceClasses("sunsetInfo", "order-first", "order-last");
    setTransform("sunriseInfo", "translate(-50%, 0)");
    setTransform("sunsetInfo", "translate(50%, 0)");
  } else {
    replaceClasses("sunOrMoon", "fa-sun", "fa-moon");
    replaceClasses("sunOrMoon", "text-warning", "text-info");
    replaceClasses("sunriseInfo", "order-first", "order-last");
    replaceClasses("sunsetInfo", "order-last", "order-first");
    setTransform("sunriseInfo", "translate(50%, 0)");
    setTransform("sunsetInfo", "translate(-50%, 0)");
  }
  function replaceClasses(id, oldClass, newClass) {
    document.getElementById(id).classList.replace(oldClass, newClass);
  }
  function setTransform(id, value) {
    document.getElementById(id).style.transform = value;
  }
}

// Function to set the progress to the style file
function setProgress() {
  document.documentElement.style.setProperty("--progress", progress);
}

// Function to calsulate the height of sun in progress
function calcHeightOfSun() {
  var localProgress;
  progress < 0.5 ? (localProgress = 1 - progress) : (localProgress = progress);
  return (heightOfSun = Math.sqrt(
    (Math.pow(heightOfProgress, 2) *
      (Math.pow(widthOfProgress / 2, 2) -
        Math.pow((localProgress * widthOfProgress) / 2, 2))) /
      Math.pow(widthOfProgress / 2, 2)
  ));
}

// Function to position the sun in progress
function positionTheSun() {
  document.getElementById("sunOrMoon").style.top =
    (heightOfProgress - heightOfSun).toString() + "px";
  document.getElementById("sunOrMoon").style.left =
    (progress * widthOfProgress).toString() + "px";
}

// Function to set sunset and sunrise info
function setSunriseAndSunsetInfo() {
  document.getElementById("sunriseInfo").innerHTML += sunrise.toStringSunrise();
  document.getElementById("sunsetInfo").innerHTML += sunset.toStringSunset();
}

// Function to set the variable of height and width of user screen
function setResolution() {
  document.documentElement.style.setProperty(
    "--width-of-screen",
    widthOfWindow + "px"
  );
  document.documentElement.style.setProperty(
    "--height-of-screen",
    heightOfWindow + "px"
  );
}

// Function to update the size of window
function updateResolution() {
  widthOfWindow = window.innerWidth;
  heightOfWindow = window.innerHeight;
  setResolution();
}

window.onresize = onResizeFunctions;

function onResizeFunctions() {
  updateResolution();
  setWidthAndHeight();
  calcHeightOfSun();
  positionTheSun();
}
