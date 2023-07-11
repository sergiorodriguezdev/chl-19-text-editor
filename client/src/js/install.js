const butInstall = document.getElementById("buttonInstall");
let installEvent;

// Logic for installing the PWA
// Ensure 'Install' button is visible and store event data in global variable
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.visibility = "visible";
  installEvent = event;
});

// Use global event variable to display app installation pop up
butInstall.addEventListener("click", async () => {
    installEvent.prompt();
});

// Once app is installed, disable 'Install' button and update its text
window.addEventListener("appinstalled", (event) => {
  console.log("App has been installed", event);
  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Installed!";
});
