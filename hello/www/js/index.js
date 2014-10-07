var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        loadRemoteContent();
        nfc.addNdefListener(onNfc, success, failure);
        nfc.addTagDiscoveredListener(
                onNfc,
                function () {
                    console.log("Listening for non-NDEF tags.");
                },
                failure
            );
    }
};

function appendDebug(message) {
    var debug = document.getElementById('debug');
    debug.innerHTML = debug.innerHTML + ' ' + message + '<br>';
}

function onNfc(nfcEvent) {
    // display the tag as JSON
    scannSuccesCallBack(nfc.bytesToHexString(nfcEvent.tag.id));
    //alert(JSON.stringify("tag read"));
}

function success(result) {
    alert("Listening for NFC Messages");
}
function failure(reason) {
    alert("Failed to add NDEF listener");
}

function loadRemoteContent() {
    $("#mainbody").load("http://192.168.178.13:52878/Home/RemoteContent");

}

function scanBarcode() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          scannSuccesCallBack(result.text);
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}
