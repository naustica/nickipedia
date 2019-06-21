var composeWindow = document.querySelector(".compose-poop-window");
var poopButton = document.querySelector("#poop-button");
var closeButton = document.querySelector(".close-button");

function toggleComposeWindow() {
  composeWindow.classList.toggle("show-compose-poop-window");
}

function windowOnClick(event) {
  if (event.target == composeWindow) {
    toggleComposeWindow();
  }
}

poopButton.addEventListener("click", toggleComposeWindow);
closeButton.addEventListener("click", toggleComposeWindow);
window.addEventListener("click", windowOnClick)
