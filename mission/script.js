const selectElem = document.querySelector("#mode-select");
const logo = document.querySelector(".logo");

selectElem.addEventListener("change", changeTheme);

function changeTheme() {
  const selectedMode = selectElem.value;

  if (selectedMode === "dark") {
    document.body.classList.add("dark-mode");
    logo.src = "images/byui-logo-white.png";
  } else {
    document.body.classList.remove("dark-mode");
    logo.src = "images/byui-logo.png";
  }
}