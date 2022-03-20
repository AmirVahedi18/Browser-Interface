var currentDate = new Date();
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();
var currntMuonth = currentDate.getMonth();
var currentDateInMonth = currentDate.getDate();
var usingTowlveHours = false;

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

function timeInterval() {
  setTimeout(function runSeconds() {
    seconds++;
    setSeconds();
    setTimeout(runSeconds, 1000);
  }, 1000);
}

function setSeconds() {
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    setMinutes();
  }
  rotateScarf("secondScarf", seconds, minutes, hours);
  rotateScarf("minuteScarf", seconds, minutes, hours);
  updateProgress();
  usingTowlveHours ? towlveTime() : setDigitalClock();
}

function setMinutes() {
  if (minutes == 60) {
    minutes = 0;
    hours++;
    setHours();
  }
  rotateScarf("hourScarf", seconds, minutes, hours);
}

function setHours() {
  if (hours == 24) {
    hours = 0;
    goodTime();
  }
}

function setDigitalClock(hour = hours, minute = minutes, second = seconds) {
  digitalClock.innerHTML = `${hour} : ${setZero(minute)} : ${setZero(second)}`;
}

function towlveTime() {
  var changedHours = hours;
  if (changedHours > 12) {
    changedHours -= 12;
    ampm.innerHTML = " PM";
  } else {
    ampm.innerHTML = " AM";
  }
  setDigitalClock(changedHours);
}
