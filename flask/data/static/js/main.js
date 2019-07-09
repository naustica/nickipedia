var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
composeInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("compose-submit-button").click();
    }
});
var WindowBox = /** @class */ (function () {
    function WindowBox() {
        var _this = this;
        this.toggleWindow = function () {
            _this.modal.classList.toggle("show-window");
        };
        this.windowOnClick = function (event) {
            if (event.target === _this.modal) {
                _this.toggleWindow();
            }
        };
        this.trigger = null;
        this.modal = null;
        this.closeWindow = null;
        if (this.trigger !== null && this.modal !== null && this.closeWindow !== null) {
            this.trigger.addEventListener("click", this.toggleWindow);
            this.closeWindow.addEventListener("click", this.toggleWindow);
            window.addEventListener("click", this.windowOnClick);
        }
    }
    return WindowBox;
}());
var ComposeWindow = /** @class */ (function (_super) {
    __extends(ComposeWindow, _super);
    function ComposeWindow() {
        var _this = _super.call(this) || this;
        _this.trigger = document.querySelector("#poop-button");
        _this.modal = document.querySelector("#compose-poop-window");
        _this.closeWindow = document.querySelector("#close-compose-window");
        if (_this.trigger !== null && _this.modal !== null && _this.closeWindow !== null) {
            _this.trigger.addEventListener("click", _this.toggleWindow);
            _this.closeWindow.addEventListener("click", _this.toggleWindow);
            window.addEventListener("click", _this.windowOnClick);
        }
        return _this;
    }
    return ComposeWindow;
}(WindowBox));
var UploadWindow = /** @class */ (function (_super) {
    __extends(UploadWindow, _super);
    function UploadWindow() {
        var _this = _super.call(this) || this;
        _this.trigger = document.querySelector("#upload-button");
        _this.modal = document.querySelector("#upload-window");
        _this.closeWindow = document.querySelector("#close-upload-window");
        if (_this.trigger !== null && _this.modal !== null && _this.closeWindow !== null) {
            _this.trigger.addEventListener("click", _this.toggleWindow);
            _this.closeWindow.addEventListener("click", _this.toggleWindow);
            window.addEventListener("click", _this.windowOnClick);
        }
        return _this;
    }
    return UploadWindow;
}(WindowBox));
var composeWindow = new ComposeWindow();
var uploadWindow = new UploadWindow();
