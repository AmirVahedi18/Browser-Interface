function createLinkPreviewForHomeTab(index = 0) {
  let previewOfMostUsedLink = document.getElementById("previewOfMostUsedLink");
  let containerOfLinks = document.createElement("div");
  containerOfLinks.classList.add("row", "row-cols-6", "g-3", "m-3");
  let linksOfSelectedFolder = linksAndFolders["folders"][index]["links"];
  let numberOfLinksOfSelectedFolder = linksOfSelectedFolder.length;
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
  previewOfMostUsedLink.innerHTML = null;
  previewOfMostUsedLink.appendChild(containerOfLinks);
}



function creteCurrentMonthForHomeTab(currntMuonth) {
  let totalCalendarElement = document.getElementById("containerOfCalendar")
    .children[currntMuonth];
  let cloneOftotalCalendarElement = totalCalendarElement.cloneNode(true);
  currentMonthCalendar.appendChild(cloneOftotalCalendarElement);
}

function clickATab(whichTab) {
  switch (whichTab) {
    case "links": {
      document.getElementById("linkes-tab").click();
      break;
    }
    case "calendar": {
      document.getElementById("calendar-tab").click();
      break;
    }
    case "notes": {
      document.getElementById("notes-tab").click();
      break;
    }
  }
}
