

var composeInput = document.getElementById("compose-textarea");



function dismissFlashMessage(messageWindow) {
  var flashMessage = messageWindow.parentNode;
  if (flashMessage.id == "flash-message") {
    flashMessage.remove();
  }
  else {
    console.log(messageWindow + "has no parent node with id 'flash-message'");
  }
}



composeInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("compose-submit-button").click();
  }
});

interface WindowBoxParameters {
  triggerID: string;
  modalID: string;
  closeWindowID: string;
}

class WindowBox {

  public trigger: any;
  public modal: any;
  public closeWindow: any;

  public constructor({triggerID, modalID, closeWindowID}: WindowBoxParameters) {
    this.trigger = document.querySelector(triggerID);
    this.modal = document.querySelector(modalID);
    this.closeWindow = document.querySelector(closeWindowID);

    if (this.trigger !== null && this.modal !== null && this.closeWindow !== null) {
      this.trigger.addEventListener("click", this.toggleWindow);
      this.closeWindow.addEventListener("click", this.toggleWindow);
      window.addEventListener("click", this.windowOnClick);
    }

  }
  toggleWindow = (): void => {
    this.modal.classList.toggle("show-window");
  }
  windowOnClick = (event): void => {
    if (event.target === this.modal) {
      this.toggleWindow();
    }
  }
}

const composeWindow = new WindowBox({triggerID: "#poop-button", modalID: "#compose-poop-window", closeWindowID: "#close-compose-window"});
const uploadWindow = new WindowBox({triggerID: "#upload-button", modalID: "#upload-window", closeWindowID: "#close-upload-window"});
