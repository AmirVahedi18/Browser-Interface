function createCalendar() {
  let containerOfCalendar = document.getElementById("containerOfCalendar");
  let monthes = calendar["monthes"];
  for (let eachMonth of monthes) {
    let monthElement = createMonthElement(eachMonth);
    containerOfCalendar.appendChild(monthElement);
  }
}

function createMonthElement(jsonElement) {
  let indexOfMonth = jsonElement["index"];
  let indexOfStartingDayInWeekDay = jsonElement["indexOfStartingDayInWeekDay"];
  let numberOfDays = jsonElement["numberOfDays"];
  let numberOfDaysOfLastMonth = jsonElement["numberOfDaysOfLastMonth"];
  let containerOfEachMonth = document.createElement("div");
  let titleOfMonth = document.createElement("h6");
  titleOfMonth.classList.add(
    "fs-6",
    "fw-light",
    "m-0",
    "pb-1",
    "border-bottom",
    "mb-1"
  );
  titleOfMonth.innerHTML = months[indexOfMonth];
  containerOfEachMonth.appendChild(titleOfMonth);
  let containerOfDayItems = document.createElement("div");
  containerOfDayItems.classList.add("row", "pt-1");
  for (let i = 0; i < 7; i++) {
    let daysOfWeek = document.createElement("span");
    daysOfWeek.classList.add("weekDays", "mb-1");
    daysOfWeek.innerHTML = daysAbbr[i];
    containerOfDayItems.appendChild(daysOfWeek);
  }
  let numberOfRemainedItems = 42;
  for (let i = indexOfStartingDayInWeekDay - 1; i >= 0; i--) {
    let lastMonthDays = document.createElement("span");
    lastMonthDays.classList.add("text-muted");
    lastMonthDays.innerHTML = numberOfDaysOfLastMonth - i;
    containerOfDayItems.appendChild(lastMonthDays);
    numberOfRemainedItems--;
  }
  for (let i = 0; i < numberOfDays; i++) {
    let daysOfThisMonth = document.createElement("span");
    if (currntMuonth == indexOfMonth && currentDateInMonth == i + 1) {
      daysOfThisMonth.classList.add("bg-primary");
    }
    daysOfThisMonth.innerHTML = i + 1;
    containerOfDayItems.appendChild(daysOfThisMonth);
    numberOfRemainedItems--;
  }
  for (let i = 0; i < numberOfRemainedItems; i++) {
    let nextMonthDays = document.createElement("span");
    nextMonthDays.classList.add("text-muted");
    nextMonthDays.innerHTML = i + 1;
    containerOfDayItems.appendChild(nextMonthDays);
  }
  containerOfEachMonth.appendChild(containerOfDayItems);
  return containerOfEachMonth;
}
