var PUSH_SOCKET_APP_ID = "5f3676d3978aae094d93f924";
var PUSH_SOCKET_APP_KEY =
  "BP7hPEzgV4ilFJ0oi1J4KxsqM6KNZ0x3dIYLIPPVKYz7wT3oFCnby9-s3GN4UZKWFIo12dop1_SAwu0fXP2znQM";
function subscribe() {
  console.log("came in subscribe button click");
  Notification.requestPermission(function (status) {
    console.log("Notification permission status:", status);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
        })
        .then(function (sub) {
          console.log("Endpoint URL: ", sub.endpoint);
          console.log(sub);
        })
        .catch(function (e) {
          if (Notification.permission === "denied") {
            console.warn("Permission for notifications was denied");
          } else {
            console.error("Unable to subscribe to push", e);
          }
        });
    });
  }
}

function displayNotif() {
  console.log("came in displayNotif button click");
  if (Notification.permission == "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification("Hello world!");
    });
  }
}
