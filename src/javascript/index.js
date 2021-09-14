import {LightButton, DarkButton} from "./theme-button";
import {RenderUser} from "./render-user";
import {GetUser} from "./get-user";
import '../styles/style.css';

function handleChangeUser(e) {
  if (e.target.value === "") return;

  GetUser(e.target.value).then((user) => RenderUser(user));
}

function handleTheme() {
  if (this) {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.theme = "light";
      LightButton();
    } else {
      localStorage.theme = "dark";
      DarkButton();
    }
  } else {
    if (localStorage.theme === "dark") {
      DarkButton();
    } else {
      LightButton();
    }
  }
}

// Start run app from here
document.addEventListener("DOMContentLoaded", () => {
  handleTheme();
});

GetUser().then((user) => RenderUser(user));

let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");
let themeBtn = document.querySelector(".theme-btn");
searchInput.addEventListener("change", handleChangeUser);
searchBtn.addEventListener("click", searchInput.onchange);
themeBtn.addEventListener("click", handleTheme);
