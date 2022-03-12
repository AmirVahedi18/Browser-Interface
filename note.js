// Function to initialaize notes
function initialaizeRecentNotes() {
  switchToPreview();
  let recentNoteList = document.getElementById("recentNotesList");
  let lengthOfNotes = notes["notes"].length;
  for (let i = 0; i < lengthOfNotes; i++) {
    let note = notes["notes"][i];
    let listItemOfNote = createNoteItemList(note, i);
    recentNoteList.appendChild(listItemOfNote);
  }
}

function createNoteItemList(JSONNote, i) {
  let title = document.createElement("div");
  title.classList.add("fw-bold");
  title.innerHTML = JSONNote["title"];
  let caption = document.createElement("small");
  caption.innerHTML = JSONNote["content"].substring(0, 70) + "...";
  let header = document.createElement("div");
  header.classList.add("me-auto");
  header.appendChild(title);
  header.appendChild(caption);
  let date = document.createElement("div");
  date.classList.add("badge", "bg-primary", "p-2", "rounded-pill");
  let dateOfNote = new Date(JSONNote["date"]);
  let dateComment =
    dateOfNote.getFullYear() +
    "/" +
    setZero(dateOfNote.getMonth() + 1) +
    "/" +
    setZero(dateOfNote.getDate());
  date.innerHTML = dateComment;

  let icons = document.createElement("div");
  icons.classList.add(
    "d-flex",
    "justify-content-center",
    "text-center",
    "fs-5",
    "my-auto",
    "editAndRemoveIcons"
  );
  icons.innerHTML = `<a href="###" class="editNoteIcon"> <i class="fa fa-edit text-info px-1"></i> </a> 
   <a href="##" class="removeNoteIcon"> <i class="fa fa-trash-alt text-warning px-1"></i> </a>`;
  let dateAndIcons = document.createElement("div");
  dateAndIcons.classList.add(
    "d-flex",
    "flex-column",
    "justify-content-start",
    "align-items-center"
  );
  dateAndIcons.appendChild(date);
  dateAndIcons.appendChild(icons);

  let listItemOfNote = document.createElement("li");
  listItemOfNote.classList.add(
    "list-group-item",
    "w-100",
    "d-flex",
    "noteItemInList",
    "bg-primary",
    "bg-opacity-25",
    "text-light",
    "position-relative"
  );
  listItemOfNote.innerHTML = `<a href="#" class="stretched-link" onclick="createNotePreview(${i})"></a>`;
  listItemOfNote.appendChild(header);
  listItemOfNote.appendChild(dateAndIcons);
  listItemOfNote.onclick = switchToPreview;
  return listItemOfNote;
}

// Function to create a preview of note
async function createNotePreview(index) {
  let correspondingNote = notes["notes"][index];
  let titleOfNote = document.getElementById("titleOfNotePreview");
  titleOfNote.innerHTML = correspondingNote["title"];
  let contentOfNote = document.getElementById("contentOfNotePreview");
  contentOfNote.innerHTML = correspondingNote["content"];
  let iconsOfEditing = document.getElementById("iconsForEditing");
  iconsOfEditing.innerHTML = `<a href="#" onclick="switchToEditing(${index})" class="editNoteIcon noteIcon"> <i class="fa fa-edit text-info px-1"></i> </a>
   <a href="#" onclick="saveNewChanges(${index})" class="saveNoteIcon noteIcon d-none"> <i class="fa fa-save text-info px-1 pe-2"></i>
   <a href="#" class="removeNoteIcon noteIcon"> <i class="fa fa-trash-alt text-warning px-1"></i> </a>`;
}

// Functiont to switch to editiig note
function switchToEditing(index) {
  document.getElementById("contentOfNotePreview").style.display = "none";
  document.getElementById("textareaForEditing").style.display = "block";
  document.getElementById("textareaForEditing").innerText =
    notes["notes"][index]["content"];
  changeIconOfEditToSave("edit");
}

// Function to change the state of note to preview
function switchToPreview() {
  document.getElementById("contentOfNotePreview").style.display = "block";
  document.getElementById("textareaForEditing").style.display = "none";
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
  let titleOfNewNote = document.getElementById("titleOfNewNote").value;
  let contentOfNewNote = document.getElementById("contentOfNewNote").value;
  if (titleOfNewNote == "" || contentOfNewNote == "") {
    return;
  }
  console.log(titleOfNewNote, contentOfNewNote);
  let saveDtate = new Date().getTime();
  let note = {
    title: titleOfNewNote,
    content: contentOfNewNote,
    date: saveDtate,
  };
  notes.notes.push(note);
  let lengthOfNotes = notes["notes"].length;
  let listItemOfNote = createNoteItemList(
    notes["notes"][lengthOfNotes - 1],
    lengthOfNotes - 1
  );
  let recentNoteList = document.getElementById("recentNotesList");
  recentNoteList.appendChild(listItemOfNote);
}

// Function to save new changes on a note
function saveNewChanges(index) {
  let changedContent = document.getElementById("textareaForEditing").value;
  notes["notes"][index]["content"] = changedContent;
  changeIconOfEditToSave("save");
  switchToPreview();
  document.getElementById("recentNotesList").innerHTML = null;
  initialaizeRecentNotes();
  document.getElementById("contentOfNotePreview").innerHTML = changedContent;
}

// Function to download json file of notes
function downloadUserJSON(content, fileName, contentType) {
    let link = document.getElementById("downloadNoteJSON");
    let file = new Blob([content], { type: contentType });
    link.href = URL.createObjectURL(file);
    link.download = fileName;
  }