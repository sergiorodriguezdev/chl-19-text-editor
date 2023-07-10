const butInstall = document.getElementById("buttonInstall");
let installEvent;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.visibility = "visible";
  installEvent = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
    installEvent.prompt();
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App has been installed", event);
  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Installed!";
});
