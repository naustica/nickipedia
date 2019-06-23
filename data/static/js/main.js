var composeWindow = document.querySelector("#compose-poop-window");
var poopButton = document.querySelector("#poop-button");
var closeComposeWindowButton = document.querySelector("#close-compose-window");

var uploadWindow = document.querySelector("#upload-window");
var uploadButton = document.querySelector("#upload-button");
var closeUploadWindowButton = document.querySelector("#close-upload-window");

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

function dismissFlashMessage() {
  var flashMessage = document.getElementById("flash-message");
  flashMessage.style.display = "none"
}

poopButton.addEventListener("click", toggleComposeWindow);
closeComposeWindowButton.addEventListener("click", toggleComposeWindow);

uploadButton.addEventListener("click", toggleUploadWindow);
closeUploadWindowButton.addEventListener("click", toggleUploadWindow);

window.addEventListener("click", windowOnClick)
