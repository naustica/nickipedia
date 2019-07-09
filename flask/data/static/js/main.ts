

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

class WindowBox {

  public trigger: any;
  public modal: any;
  public closeWindow: any;

  public constructor() {
    this.trigger = null;
    this.modal = null;
    this.closeWindow = null;

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

class ComposeWindow extends WindowBox {

    constructor() {
      super();
      this.trigger = document.querySelector("#poop-button");
      this.modal = document.querySelector("#compose-poop-window");
      this.closeWindow = document.querySelector("#close-compose-window");

      if (this.trigger !== null && this.modal !== null && this.closeWindow !== null) {
        this.trigger.addEventListener("click", this.toggleWindow);
        this.closeWindow.addEventListener("click", this.toggleWindow);
        window.addEventListener("click", this.windowOnClick);
      }
    }
}

class UploadWindow extends WindowBox {

  constructor() {
    super();
    this.trigger = document.querySelector("#upload-button");
    this.modal = document.querySelector("#upload-window");
    this.closeWindow = document.querySelector("#close-upload-window");

    if (this.trigger !== null && this.modal !== null && this.closeWindow !== null) {
      this.trigger.addEventListener("click", this.toggleWindow);
      this.closeWindow.addEventListener("click", this.toggleWindow);
      window.addEventListener("click", this.windowOnClick);
    }
  }
}

const composeWindow = new ComposeWindow();
const uploadWindow = new UploadWindow();
