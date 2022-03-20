function setValueToChangeFormInputs() {
  let changeNameForm = document.getElementById("changeNameForm");
  let inputs = changeNameForm.querySelectorAll("input");
  inputs[0].value = user.firstName;
  inputs[1].value = user.lastName;
}

function enableSubmit() {
  let submitChangeNameButton = document.getElementById(
    "submitChangeNameButton"
  );
  submitChangeNameButton.disabled = false;
}

// Function to get data from nameChangeForm
function getChangedNameFromInputs() {
  let changeNameForm = document.getElementById("changeNameForm");
  let inputs = changeNameForm.querySelectorAll("input");
  user.firstName = inputs[0].value;
  user.lastName = inputs[1].value;
  sayHiToUser();
  downloadJSON(
    JSON.stringify(user),
    "user.json",
    "text/plain",
    "downloadUserJSON"
  );
  let submitChangeNameButton = document.getElementById(
    "submitChangeNameButton"
  );
  submitChangeNameButton.disabled = true;
}
