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

function rotateScarf(idOfScarf, second, minute, hour) {
  let degree;
  switch (idOfScarf) {
    case "secondScarf": {
      degree = second * 6 - 90;
      break;
    }
    case "minuteScarf": {
      degree = minute * 6 + second * 0.1 - 90;
      break;
    }
    case "hourScarf": {
      degree = hour * 30 + minute * 0.5 + second * (30 / 3600) - 90;
      break;
    }
  }
  document.getElementById(
    idOfScarf
  ).style.transform = `translate(200px, 200px) rotateZ(${degree}deg)`;
}
