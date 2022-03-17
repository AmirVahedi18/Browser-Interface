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

const daysAbbr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

var user = {
  firstName: null,
  lastName: null,
};

var notes;
var noteItems;
var linksAndFolders;
var calendar;

var currentDate = new Date();
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getMinutes();
var currntMuonth = currentDate.getMonth();
var currentDateInMonth = currentDate.getDate();
var heightOfWindow;
var widthOfWindow;
var widthOfProgress;
var heightOfProgress;
var progress;
var heightOfSun;
var usingTowlveHours = true;
var isSun = null;

var sunrise = {
  sunriseHours: 6,
  sunriseMinutes: 35,
  toStringSunrise: function () {
    return (
      setZero(this.sunriseHours.toString()) + ":" + setZero(this.sunriseMinutes)
    );
  },
};

var sunset = {
  sunsetHours: 18,
  sunsetMinutes: 1,
  toStringSunset: function () {
    return (
      setZero(this.sunsetHours.toString()) + ":" + setZero(this.sunsetMinutes)
    );
  },
};

var brackpointOfSunrise =
  sunrise.sunriseHours * 3600 + sunrise.sunriseMinutes * 60;
var brackpointOfSunset = sunset.sunsetHours * 3600 + sunset.sunsetMinutes * 60;
var spentInSeconds = hours * 3600 + minutes * 60 + seconds;
var sunInSky = brackpointOfSunset - brackpointOfSunrise;
var sunIsNotInSky = 86400 - sunInSky;

window.onresize = onResizeFunctions;

inisialation();

async function inisialation() {
  await getUserInfoFromJSON();
  await getNotesFromJSON();
  await getLinksFromJSON();
  await getCalendarFromJSON();
  noteItems = notes["notes"];
  createLinkPreviewForHomeTab();
  initialaizeRecentNotes();
  initialaizeFoldersLink();
  createCalendar();
  creteCurrentMonthForHomeTab(currntMuonth);
  shiftNthItemToTheMthPlace();
  setValueToChangeFormInputs();
  sayHiToUser();
  goodTime();
  setDate();
  timeInterval();
  setSeconds();
  setMinutes();
  setHours();
  calcProgress();
  setProgress();
  setTransitionToOClocks();
  setSunriseAndSunsetInfo();
  updateResolution();
  setWidthAndHeight();
  calcHeightOfSun();
  positionTheSun();
}

// Function to change some parameters when window size is changes
function onResizeFunctions() {
  updateResolution();
  setWidthAndHeight();
  calcHeightOfSun();
  positionTheSun();
}

// function to get info from JSON file
async function getUserInfoFromJSON() {
  await fetch("./json/user.json")
    .then((response) => response.json())
    .then((json) => (user = json));
}

async function getNotesFromJSON() {
  await fetch("./json/notes.json")
    .then((response) => response.json())
    .then((json) => (notes = json));
}

async function getLinksFromJSON() {
  await fetch("./json/links.json")
    .then((response) => response.json())
    .then((json) => (linksAndFolders = json));
}

async function getCalendarFromJSON() {
  await fetch("./json/calendar.json")
    .then((response) => response.json())
    .then((json) => (calendar = json));
}

// function to say hi to the user
function sayHiToUser() {
  let sayHiComment = "Hi ";
  user.firstName ? (sayHiComment += user.firstName) : null;
  user.lastName ? (sayHiComment += " " + user.lastName) : null;
  user.firstName || user.lastName
    ? (document.getElementById("sayHiToUser").innerHTML = sayHiComment + "!")
    : null;
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
  let containerOfOClocks = document.getElementById("oClocks");
  for (var i = 1; i <= 12; i++) {
    let containerOfOClock = document.createElement("div");
    containerOfOClock.classList.add("oClock");
    let contentOfOClock = document.createElement("h1");
    contentOfOClock.innerHTML = i;
    containerOfOClock.appendChild(contentOfOClock);
    containerOfOClock.style.transform =
      "translate(175px, 0) rotateZ(" + i * 30 + "deg)";
    contentOfOClock.style.transform = "rotateZ(-" + i * 30 + "deg)";
    containerOfOClocks.appendChild(containerOfOClock);
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

// Function to download JSON file of user configs
function downloadJSON(content, fileName, contentType, id) {
  let link = document.getElementById(id);
  let file = new Blob([content], { type: contentType });
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  console.log(content);
}

function setValueToChangeFormInputs() {
  let changeNameForm = document.getElementById("changeNameForm");
  let inputs = changeNameForm.querySelectorAll("input");
  inputs[0].value = user.firstName;
  inputs[1].value = user.lastName;
}

function enableSubmit() {
  let submitChangeNameButton = document.getElementById(
    "submitChangeNameButton"
  );
  submitChangeNameButton.disabled = false;
}

// Function to get data from nameChangeForm
function getChangedNameFromInputs() {
  let changeNameForm = document.getElementById("changeNameForm");
  let inputs = changeNameForm.querySelectorAll("input");
  user.firstName = inputs[0].value;
  user.lastName = inputs[1].value;
  sayHiToUser();
  downloadJSON(
    JSON.stringify(user),
    "user.json",
    "text/plain",
    "downloadUserJSON"
  );
  let submitChangeNameButton = document.getElementById(
    "submitChangeNameButton"
  );
  submitChangeNameButton.disabled = true;
}
