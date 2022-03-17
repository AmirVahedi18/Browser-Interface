// Function to initialaize notes
async function initialaizeRecentNotes() {
  switchToPreview();
  let recentNoteList = document.getElementById("recentNotesList");
  let lengthOfNotes = notes["notes"].length;
  for (let i = 0; i < lengthOfNotes; i++) {
    let note = notes["notes"][i];
    let newElement = createListItem(
      "note",
      note,
      "recentNotesList",
      i,
      true,
      true,
      true,
      true,
      false,
      2,
      "fa-edit text-info editIcon editNoteIconForListItem",
      "fa-trash-alt text-warning removeIcon removeNoteIconForListItem"
    );
    recentNoteList.appendChild(newElement);
    let clonedNewElement = newElement.cloneNode(true);
    clonedNewElement.querySelector("div.flex-column div.d-flex").remove();
    clonedNewElement.querySelector("a").removeAttribute("ondblclick");
    clonedNewElement.setAttribute("onclick", "clickATab('notes')");
    recentNotesListForHomeTab.appendChild(clonedNewElement);
  }
}

// Function to functionalaize icons of list of recent notes
function functionalaizeIconsOfNoteItems(classOfIcon, index) {
  switch (classOfIcon) {
    case "editNoteIconForListItem": {
      createNotePreview(index);
      break;
    }
    case "removeNoteIconForListItem": {
      removeNoteItem(index);
      break;
    }
  }
}

// Function to create a preview of note
async function createNotePreview(index) {
  let correspondingNote = notes["notes"][index];
  document.getElementById("titleOfNotePreview").innerHTML =
    correspondingNote["title"];
  document.getElementById("contentOfNotePreview").innerHTML =
    correspondingNote["content"];
  document.getElementById(
    "iconsForEditing"
  ).innerHTML = `<i class="fa fa-edit text-info px-1 editIcon pointerIcon" onclick="switchToEditing(${index})" ></i>
   <i class="fa fa-save text-info px-1 pe-2 saveIcon pointerIcon d-none" onclick="saveNewChanges(${index})"></i>
   <i class="fa fa-trash-alt text-warning px-1 removeIcon pointerIcon" onclick="removeNoteItem(${index})"></i>
   <i class="fa fa-times-circle text-danger px-1 closeIcon pointerIcon" onclick="clearPreview(${index})"></i>`;
}

// Functiont to switch to editing note
function switchToEditing(index) {
  document
    .getElementById("contentOfNotePreview")
    .classList.replace("d-block", "d-none");
  document
    .getElementById("textareaForEditing")
    .classList.replace("d-none", "d-block");
  document.getElementById("textareaForEditing").innerText =
    notes["notes"][index]["content"];
  changeIconOfEditToSave("edit");
  document.getElementById("notePreviewTitle").innerHTML = "Edit Note";
}

// Function to change the state of note to preview
function switchToPreview() {
  document
    .getElementById("contentOfNotePreview")
    .classList.replace("d-none", "d-block");
  document
    .getElementById("textareaForEditing")
    .classList.replace("d-block", "d-none");
}

// Function to clear preview
function clearPreview(index) {
  document.getElementById("contentOfNotePreview").innerHTML = null;
  document.getElementById("titleOfNotePreview").innerHTML = null;
  document.getElementById("iconsForEditing").innerHTML = null;
  indicateSelectedItemInList(index, "recentNotesList", false);
  document.getElementById("notePreviewTitle").innerHTML = "Preview";
}

// Function to change the display of icons
function changeIconOfEditToSave(mode) {
  let icons = document.getElementById("iconsForEditing").children;
  let editIcon = icons[0];
  let saveIcon = icons[1];
  switch (mode) {
    case "edit": {
      editIcon.classList.add("d-none");
      saveIcon.classList.remove("d-none");
      break;
    }
    case "save": {
      editIcon.classList.remove("d-none");
      saveIcon.classList.add("d-none");
      break;
    }
  }
}

// Function to save new note
function saveNewNote() {
  let titleOfNewNote = document.getElementById("titleOfNewNote").value.trim();
  let contentOfNewNote = document
    .getElementById("contentOfNewNote")
    .value.trim();
  if (titleOfNewNote == "" || contentOfNewNote == "") {
    alert("Plese Enter valid title or content...");
    return;
  }
  let saveDtate = new Date().getTime();
  let note = {
    title: titleOfNewNote,
    content: contentOfNewNote,
    date: saveDtate,
  };
  notes.notes.push(note);
  let lengthOfNotes = notes["notes"].length;
  let listItemOfNote = createListItem(
    "note",
    notes["notes"][lengthOfNotes - 1],
    "recentNotesList",
    lengthOfNotes - 1,
    true,
    true,
    true,
    true,
    false,
    2,
    "fa-edit text-info editIcon editNoteIconForListItem",
    "fa-trash-alt text-warning removeIcon removeNoteIconForListItem"
  );
  let recentNoteList = document.getElementById("recentNotesList");
  recentNoteList.appendChild(listItemOfNote);
  clearInputsAfterGettingInformation("titleOfNewNote", "contentOfNewNote");
  refreshRecentNote();
}

// Function to save new changes on a note
function saveNewChanges(index) {
  let changedContent = document.getElementById("textareaForEditing").value;
  notes["notes"][index]["content"] = changedContent;
  changeIconOfEditToSave("save");
  switchToPreview();
  refreshRecentNote();
  createNotePreview(index);
  document.getElementById("notePreviewTitle").innerHTML = "Preview";
}

// Function to reorder recent notes
function reorderRecentNotes(event, index) {
  if (index == 0) {
    return;
  }
  let listOfRecentNote = notes["notes"];
  event.ctrlKey
    ? shiftNthItemToTheMthPlace(index, 0, listOfRecentNote)
    : shiftNthItemToTheMthPlace(index, index - 1, listOfRecentNote);
  refreshRecentNote();
  createNotePreview(index);
}

// Function to remove a note item
function removeNoteItem(nthItem) {
  let noteList = notes["notes"];
  noteList = noteList.filter(function (value, index) {
    return index != nthItem;
  });
  notes["notes"] = noteList;
  clearPreview(nthItem);
  refreshRecentNote();
}

// Function to refresh the recent notes list
function refreshRecentNote() {
  document.getElementById("recentNotesList").innerHTML = null;
  initialaizeRecentNotes();
}
