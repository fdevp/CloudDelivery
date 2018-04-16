"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignalrConnectionStates;
(function (SignalrConnectionStates) {
    SignalrConnectionStates[SignalrConnectionStates["connected"] = 1] = "connected";
    SignalrConnectionStates[SignalrConnectionStates["connecting"] = 0] = "connecting";
    SignalrConnectionStates[SignalrConnectionStates["disconnected"] = 4] = "disconnected";
    SignalrConnectionStates[SignalrConnectionStates["reconnecting"] = 2] = "reconnecting";
})(SignalrConnectionStates = exports.SignalrConnectionStates || (exports.SignalrConnectionStates = {}));
//# sourceMappingURL=SignalrConnectionState.js.map