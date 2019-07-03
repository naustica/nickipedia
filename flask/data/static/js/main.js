var composeWindow = document.querySelector("#compose-poop-window");
var poopButton = document.querySelector("#poop-button");
var closeComposeWindowButton = document.querySelector("#close-compose-window");

var uploadWindow = document.querySelector("#upload-window");
var uploadButton = document.querySelector("#upload-button");
var closeUploadWindowButton = document.querySelector("#close-upload-window");

var composeInput = document.getElementById("compose-textarea");

function toggleComposeWindow() {
  composeWindow.classList.toggle("show-window");
}

function toggleUploadWindow() {
  uploadWindow.classList.toggle("show-window");
}


function windowOnClick(event) {
  if (event.target == composeWindow) {
    toggleComposeWindow();
  }
  else if (event.target == uploadWindow) {
    toggleUploadWindow();
  }
}

function dismissFlashMessage(messageWindow) {
  var flashMessage = messageWindow.parentNode;
  if (flashMessage.id == "flash-message") {
    flashMessage.remove();
  }
  else {
    console.log(messageWindow + "has no parent node with id 'flash-message'");
  }
}

poopButton.addEventListener("click", toggleComposeWindow);
closeComposeWindowButton.addEventListener("click", toggleComposeWindow);

uploadButton.addEventListener("click", toggleUploadWindow);
closeUploadWindowButton.addEventListener("click", toggleUploadWindow);

composeInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("compose-submit-button").click();
  }
});

window.addEventListener("click", windowOnClick)
