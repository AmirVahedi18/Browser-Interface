function sayHiToUser() {
  let sayHiComment = "Hi ";
  user.firstName ? (sayHiComment += user.firstName) : null;
  user.lastName ? (sayHiComment += " " + user.lastName) : null;
  user.firstName || user.lastName
    ? (document.getElementById("sayHiToUser").innerHTML = sayHiComment + "!")
    : null;
}

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