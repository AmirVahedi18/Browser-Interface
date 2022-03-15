function createList(isOrderd, isNumbered, isFlush) {
  let myList = null;
  if (isOrderd) {
    myList = document.createElement("ol");
  } else {
    myList = document.createElement("ul");
  }

  myList.classList.add("list-group");

  if (isFlush) {
    myList.classList.add("list-group-flush");
  }

  if (isNumbered) {
    myList.classList.add("list-group-numbered");
  }
  return myList;
}

function createListItem(
  noteOrLink,
  JSONElement,
  idOfOlOrUlList,
  index,
  hasTitle,
  hasCaption,
  hasDate,
  hasFAIcons,
  hasNumberOfLinks,
  howManyFAIcons,
  ...iconClasses
) {
  let title = null;
  let caption = null;
  let header = document.createElement("div");
  header.classList.add("me-auto");
  let date = null;
  let icons = null;
  let dateAndIcons = document.createElement("div");
  let numberOfLinks = null;
  dateAndIcons.classList.add(
    "d-flex",
    "flex-column",
    "justify-content-start",
    "align-items-center"
  );
  let radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = "radioInputForNoteItem";
  radioInput.classList.add("isFoucesd", "d-none", "stretched-link");

  if (hasTitle) {
    title = document.createElement("div");
    title.classList.add("fw-bold");
    title.innerHTML = JSONElement["title"];
    header.appendChild(title);
  }

  if (hasCaption) {
    caption = document.createElement("small");
    caption.innerHTML = JSONElement["content"].substring(0, 70) + "...";
    header.appendChild(caption);
  }

  if (hasDate) {
    date = document.createElement("div");
    date.classList.add("badge", "bg-primary", "p-2", "rounded-pill");
    let dateOfNote = new Date(JSONElement["date"]);
    let dateComment =
      dateOfNote.getFullYear() +
      "/" +
      setZero(dateOfNote.getMonth() + 1) +
      "/" +
      setZero(dateOfNote.getDate());
    date.innerHTML = dateComment;
    dateAndIcons.appendChild(date);
  }

  if (hasNumberOfLinks) {
    numberOfLinks = document.createElement("div");
    numberOfLinks.classList.add("badge", "bg-primary", "p-2", "rounded-pill");
    numberOfLinks.innerHTML = `${JSONElement["links"].length} links`;
    dateAndIcons.appendChild(numberOfLinks);
  }

  if (hasFAIcons) {
    icons = document.createElement("div");
    icons.classList.add(
      "d-flex",
      "justify-content-center",
      "text-center",
      "fs-5",
      "my-auto"
    );
    for (let i = 0; i < howManyFAIcons; i++) {
      let classes = iconClasses[i];
      let numbersOfClasses = iconClasses[i].split(" ").length;
      let mainClassOfIcon = iconClasses[i].split(" ")[numbersOfClasses - 1];
      let HTMLOfEachIcon = `<i class="fa ${classes} px-1 pointerIcon"
      onclick="functionalaizeIconsOfItems('${mainClassOfIcon}', ${index}, '${noteOrLink}')"></i>`;
      icons.innerHTML += HTMLOfEachIcon;
    }
    dateAndIcons.appendChild(icons);
  }

  let listItem = document.createElement("li");
  listItem.classList.add(
    "list-group-item",
    "w-100",
    "d-flex",
    "noteItemInList",
    "bg-primary",
    "bg-opacity-10",
    "text-light",
    "position-relative",
    "listItemHover"
  );
  listItem.innerHTML = `<a class="stretched-link"
  onclick="createPreview(${index}, '${noteOrLink}'); indicateSelectedItemInList(${index}, '${idOfOlOrUlList}', true);"
  ondblclick="reorder(event, ${index}, '${noteOrLink}')"></a>`;
  listItem.appendChild(radioInput);
  listItem.appendChild(header);
  listItem.appendChild(dateAndIcons);
  listItem.onclick = switchToPreview;
  return listItem;
}

// Function to indicate the selected item
function indicateSelectedItemInList(index, idOfOlOrUlList, isSelected) {
  let allListItems = document.getElementById(idOfOlOrUlList).children;
  let selectedListItem = allListItems[index];
  let inputOfItem = selectedListItem.querySelector("input");
  isSelected ? (inputOfItem.checked = true) : (inputOfItem.checked = false);
  for (let eachLiItem of allListItems) {
    let inputOfEachLiItem = eachLiItem.querySelector("input");
    if (inputOfEachLiItem.checked) {
      eachLiItem.classList.replace("bg-opacity-10", "bg-opacity-25");
    } else {
      eachLiItem.classList.replace("bg-opacity-25", "bg-opacity-10");
    }
  }
}

// Function to reorder list
function shiftNthItemToTheMthPlace(n, m, list) {
  if (n > m) {
    for (let i = n; i > m; i--) {
      let temp = list[i];
      list[i] = list[i - 1];
      list[i - 1] = temp;
    }
  }
}

function createPreview(index, noteOrLink) {
  switch (noteOrLink) {
    case "note": {
      createNotePreview(index);
      break;
    }
    case "link": {
      createLinkPreview(index);
      break;
    }
  }
}

function functionalaizeIconsOfItems(mainClassOfIcon, index, noteOrLink) {
  switch (noteOrLink) {
    case "note": {
      functionalaizeIconsOfNoteItems(mainClassOfIcon, index);
      break;
    }
    case "link": {
      functionalaizeIconsOfLinkFolderItems(mainClassOfIcon, index);
      break;
    }
  }
}

function reorder(event, index, noteOrLink) {
  switch (noteOrLink) {
    case "note": {
      reorderRecentNotes(event, index);
      break;
    }
    case "link": {
      reorderLinkFolders(event, index);
      break;
    }
  }
}

function clearInputsAfterGettingInformation(...idOfInputs) {
  for (let eachInput of idOfInputs) {
    console.log(document.getElementById(eachInput));
    document.getElementById(eachInput).value = null;
  }
}
