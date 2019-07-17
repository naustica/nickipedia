var WindowBox = /** @class */ (function () {
    function WindowBox(_a) {
        var _this = this;
        var triggerID = _a.triggerID, modalID = _a.modalID, closeWindowID = _a.closeWindowID;
        this.toggleWindow = function () {
            _this.modal.classList.toggle("show-window");
        };
        this.windowOnClick = function (event) {
            if (event.target === _this.modal) {
                _this.toggleWindow();
            }
        };
        this.trigger = document.querySelector(triggerID);
        this.modal = document.querySelector(modalID);
        this.closeWindow = document.querySelector(closeWindowID);
        if (this.trigger !== null && this.modal !== null && this.closeWindow !== null) {
            this.trigger.addEventListener("click", this.toggleWindow);
            this.closeWindow.addEventListener("click", this.toggleWindow);
            window.addEventListener("click", this.windowOnClick);
        }
    }
    return WindowBox;
}());
var composeWindow = new WindowBox({ triggerID: "#poop-button", modalID: "#compose-poop-window", closeWindowID: "#close-compose-window" });
var uploadWindow = new WindowBox({ triggerID: "#upload-button", modalID: "#upload-window", closeWindowID: "#close-upload-window" });
//# sourceMappingURL=main.js.map