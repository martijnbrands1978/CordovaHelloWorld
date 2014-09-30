/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        checkLed();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function checkLed() {
    window.plugins.flashlight.available(function (isAvailable) {
        if (isAvailable) {

            // switch on
            toggleLight();

        } else {
            alert("Flashlight not available on this device");
        }
    });
}

function appendDebug(message) {
    var debug = document.getElementById('debug');
    debug.innerHTML = debug.innerHTML + ' ' + message + '<br>';
}

function toggleLight() {
	window.plugins.flashlight.switchOn();
        appendDebug('Light on');
	setTimeout(function() {
	      window.plugins.flashlight.switchOff();
	      appendDebug('Light of'); // success/error callbacks may be passed
    }, 3000);
       
}

function openExternalSite(url) {

    var ref = window.open(url, '_blank', 'location=no');
    ref.addEventListener('exit', function () {
        //scanBarcode();
    });
    ref.addEventListener('loadstart', function (event) {
        //alert('start:  ' + event.url);
    });
}



function scanBarcode() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          appendDebug("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
          if (!result.cancelled) {
              if(parseInt(result.text) == 8712566269907)
                  openExternalSite('http://192.168.178.13:52878/Home/TagInfo?id=' + result.text)
              if (parseInt(result.text) == 87315943)
                  openExternalSite('http://192.168.178.13:52878/Home/TagInfo?id=' + result.text)
              if (parseInt(result.text) == 8711600608214)
                  openExternalSite('http://192.168.178.13:52878/Home/TagInfo?id=' + result.text)
          }
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}
