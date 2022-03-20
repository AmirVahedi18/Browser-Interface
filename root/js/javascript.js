"use strict";

const daysAbbr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

var user;
var notes;
var linksAndFolders;
var calendar;
var heightOfWindow;
var widthOfWindow;

inisialation();

async function inisialation() {
  user = await getDataFromJSON("user");
  notes = await getDataFromJSON("notes");
  linksAndFolders = await getDataFromJSON("links");
  calendar = await getDataFromJSON("calendar");
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
  setWidthAndHeightOfProgress();
  heightOfSun = calcHeightOfSun();
  positionTheSun();
  window.onresize = onResizeFunctions;
}

function setZero(number) {
  if (Math.abs(number).toString().length == 1) {
    return "0" + number;
  } else {
    return number;
  }
}

function onResizeFunctions() {
  updateResolution();
  setWidthAndHeightOfProgress();
  heightOfSun = calcHeightOfSun();
  positionTheSun();
}

function updateResolution() {
  widthOfWindow = window.innerWidth;
  heightOfWindow = window.innerHeight;
  setResolution();
}

function setResolution() {
  document.documentElement.style.setProperty(
    "--width-of-window",
    widthOfWindow + "px"
  );
  document.documentElement.style.setProperty(
    "--height-of-window",
    heightOfWindow + "px"
  );
}

async function getDataFromJSON(nameOfJsonFile) {
  return JSON.parse(
    await (await fetch(`./json/${nameOfJsonFile}.json`)).text()
  );
}

function downloadJSON(content, fileName, contentType, id) {
  let link = document.getElementById(id);
  let file = new Blob([content], { type: contentType });
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  console.log(content);
}
