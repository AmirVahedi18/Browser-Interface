async function initialaizeFoldersLink() {
  let listOfFoldersOfLinks = document.getElementById("listOfFoldersOfLinks");
  let lengthOfFolders = linksAndFolders["folders"].length;
  for (let i = 0; i < lengthOfFolders; i++) {
    let folder = linksAndFolders["folders"][i];

    let newElement = createListItem(
      "link",
      folder,
      "listOfFoldersOfLinks",
      i,
      true,
      true,
      false,
      true,
      true,
      2,
      "fa-edit text-info editIcon editNoteIconForListItem",
      "fa-trash-alt text-warning removeIcon removeNoteIconForListItem"
    );
    listOfFoldersOfLinks.appendChild(newElement);
  }
}

function createLinkPreview(index) {
  let previewOfFolder = document.getElementById("previewOfFolder");
  let containerOfLinks = document.createElement("div");
  containerOfLinks.classList.add("row", "row-cols-6", "g-3", "m-3");
  let selectedFolder = linksAndFolders["folders"][index];
  let linksOfSelectedFolder = selectedFolder["links"];
  let numberOfLinksOfSelectedFolder = linksOfSelectedFolder.length;
  document.getElementById("titleOfFolderPreview").innerHTML =
    selectedFolder["title"];
  document.getElementById(
    "iconsOfLinkPreview"
  ).innerHTML = `<i class="fa fa-plus text-info px-1 editIcon pointerIcon" onclick="addLinkToFolder(${index})" ></i>
  <i class="fa fa-save text-info px-1 pe-2 saveIcon pointerIcon d-none" onclick="saveNewChanges(${index})"></i>
  <i class="fa fa-trash-alt text-warning px-1 removeIcon pointerIcon d-block" id="selectLinksForDeletionIcon" onclick="selectLinksForDeletion(${index})"></i>
  <i class="fa fa-trash-alt text-danger px-1 removeIcon pointerIcon d-none" id="deleteSelectedLinksIcon" onclick="deleteSelectedLinks(${index})"></i>
  <i class="fa fa-times-circle text-danger px-1 closeIcon pointerIcon" onclick="clearPreviewLinkFolder(${index})"></i>`;
  for (let i = 0; i < numberOfLinksOfSelectedFolder; i++) {
    let linkURL = linksOfSelectedFolder[i]["linkURL"];
    let iconOfLinkURL = linksOfSelectedFolder[i]["iconURL"];
    let divContainerOfLink = document.createElement("div");
    let elementOfLink = document.createElement("a");
    elementOfLink.href = linkURL;
    elementOfLink.target = "_Blank";
    elementOfLink.classList.add("p-0");
    let imageOfLink = document.createElement("img");
    imageOfLink.src = iconOfLinkURL;
    imageOfLink.classList.add("w-100");
    elementOfLink.appendChild(imageOfLink);
    divContainerOfLink.appendChild(elementOfLink);
    containerOfLinks.appendChild(divContainerOfLink);
  }
  previewOfFolder.innerHTML = null;
  previewOfFolder.appendChild(containerOfLinks);
}

function removeLinkFolder(nthItem) {
  let folders = linksAndFolders["folders"];
  folders = folders.filter(function (value, index) {
    return index != nthItem;
  });
  linksAndFolders["folders"] = folders;
  refreshFolderList();
  clearPreviewLinkFolder(nthItem);
}

function refreshFolderList() {
  document.getElementById("listOfFoldersOfLinks").innerHTML = null;
  initialaizeFoldersLink();
}

function functionalaizeIconsOfLinkFolderItems(classOfIcon, index) {
  switch (classOfIcon) {
    case "editNoteIconForListItem": {
      createLinkPreview(index);
      break;
    }
    case "removeNoteIconForListItem": {
      removeLinkFolder(index);
      break;
    }
  }
}

function reorderLinkFolders(event, index) {
  if (index == 0) {
    return;
  }
  let listOfLinkFolders = linksAndFolders["folders"];
  event.ctrlKey
    ? shiftNthItemToTheMthPlace(index, 0, listOfLinkFolders)
    : shiftNthItemToTheMthPlace(index, index - 1, listOfLinkFolders);
  refreshFolderList();
  createLinkPreview(index);
}

function clearPreviewLinkFolder(index) {
  document.getElementById("previewOfFolder").innerHTML = null;
  document.getElementById("titleOfFolderPreview").innerHTML = null;
  document.getElementById("iconsOfLinkPreview").innerHTML = null;
  indicateSelectedItemInList(index, "listOfFoldersOfLinks", false);
  document.getElementById("linkPreviewTitle").innerHTML = "Preview";
}

function createNewLinkFolder() {
  let nameOfNewLinkFolder = document
    .getElementById("nameOfNewLinkFolder")
    .value.trim();
  let descriptionOfNewLinkFolder = document
    .getElementById("descriptionOfNewLinkFolder")
    .value.trim();

  if (nameOfNewLinkFolder == "" || descriptionOfNewLinkFolder == "") {
    alert("Plese Enter valid title or content...");
    return;
  }

  let folder = {
    title: nameOfNewLinkFolder,
    content: descriptionOfNewLinkFolder,
    links: [],
  };
  linksAndFolders["folders"].push(folder);
  let lengthOfLinkFolders = linksAndFolders["folders"].length;
  let listItemOfLinkFolder = createListItem(
    "link",
    linksAndFolders["folders"][lengthOfLinkFolders - 1],
    "listOfFoldersOfLinks",
    lengthOfLinkFolders - 1,
    true,
    true,
    false,
    true,
    false,
    2,
    "fa-edit text-info editIcon editNoteIconForListItem",
    "fa-trash-alt text-warning removeIcon removeNoteIconForListItem"
  );
  let listOfFoldersOfLinks = document.getElementById("listOfFoldersOfLinks");
  listOfFoldersOfLinks.appendChild(listItemOfLinkFolder);
  clearInputsAfterGettingInformation(
    "nameOfNewLinkFolder",
    "descriptionOfNewLinkFolder"
  );
  refreshFolderList();
}

var addLinkToWhichFolder = null;

function addLinkToFolder(index) {
  let selectedFolder = linksAndFolders["folders"][index];
  let selectedFolderTitle = selectedFolder["title"];
  let titleOfAdd = document.getElementById("addToFolder");
  titleOfAdd.style.transition = "all 0.5s";
  titleOfAdd.style.backgroundColor = "rgba(0, 0, 129, 0.8)";
  setTimeout(function () {
    titleOfAdd.style.transition = "all 3s";
    titleOfAdd.style.backgroundColor = "rgba(0, 0, 129, 0.0)";
  }, 1000);
  titleOfAdd.innerHTML = `Add to ${selectedFolderTitle}`;
  addLinkToWhichFolder = index;
  createLinkPreview(index);
}

function getDataFromInputsAndAddNewLink() {
  let urlOfNewLink = document.getElementById("urlInputOfNewLink").value.trim();
  let iconURLOfNewLink = document
    .getElementById("iconURLInputOfNewLink")
    .value.trim();
  if (urlOfNewLink == "" || iconURLOfNewLink == "") {
    alert("Plese Enter valid title or content...");
    return;
  }
  let link = {
    linkURL: urlOfNewLink,
    iconURL: iconURLOfNewLink,
  };
  if (addLinkToWhichFolder == null) {
    linksAndFolders["folders"][0]["links"].push(link);
    clearInputsAfterGettingInformation(
      "urlInputOfNewLink",
      "iconURLInputOfNewLink"
    );

    createLinkPreview(0);
  } else {
    linksAndFolders["folders"][addLinkToWhichFolder]["links"].push(link);
    clearInputsAfterGettingInformation(
      "urlInputOfNewLink",
      "iconURLInputOfNewLink"
    );
    createLinkPreview(addLinkToWhichFolder);
  }
}

function selectLinksForDeletion(index) {
  let previewOfFolder = document.getElementById("previewOfFolder");
  let divContainerOfLink = previewOfFolder.querySelector("div");
  let collectionOfLinks = divContainerOfLink.children;
  for (let eachLink of collectionOfLinks) {
    let linkOfEachLink = eachLink.querySelector("a");
    linkOfEachLink.removeAttribute("href");
    eachLink.classList.add("position-relative");
    let checkBoxInput = document.createElement("input");
    checkBoxInput.type = "checkbox";
    checkBoxInput.classList.add(
      "position-absolute",
      "start-100",
      "top-0",
      "form-check-input",
      "rounded-pill",
      "checkBoxInputForLinkDeletion"
    );
    eachLink.prepend(checkBoxInput);
  }
  document
    .getElementById("selectLinksForDeletionIcon")
    .classList.replace("d-block", "d-none");

  document
    .getElementById("deleteSelectedLinksIcon")
    .classList.replace("d-none", "d-block");
}

function deleteSelectedLinks(index) {
  let previewOfFolder = document.getElementById("previewOfFolder");
  let divContainerOfLink = previewOfFolder.querySelector("div");
  let collectionOfLinks = divContainerOfLink.children;
  let numberOfCollectionOfLinks = collectionOfLinks.length;
  let selectedFolder = linksAndFolders["folders"][index];
  let linksOfSelectedFolder = selectedFolder["links"];
  for (let i = 0; i < numberOfCollectionOfLinks; i++) {
    let checkBoxInputOfEachLink = collectionOfLinks[i].querySelector("input");
    let isCheckBoxChecked = checkBoxInputOfEachLink.checked;
    if (isCheckBoxChecked) {
      linksOfSelectedFolder = linksOfSelectedFolder.filter(function (
        value,
        index
      ) {
        return index != i;
      });
    }
  }
  linksAndFolders["folders"][index]["links"] = linksOfSelectedFolder;
  document
    .getElementById("selectLinksForDeletionIcon")
    .classList.replace("d-block", "d-none");

  document
    .getElementById("deleteSelectedLinksIcon")
    .classList.replace("d-none", "d-block");
  createLinkPreview(index);
}
