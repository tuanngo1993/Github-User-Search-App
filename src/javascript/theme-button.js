import Moon from "../images/icon-moon.svg";
import Sun from "../images/icon-sun.svg";

export function LightButton() {
    const items = document.querySelector(".theme-btn").querySelectorAll("span");

    document.documentElement.classList.remove("dark");
    items[0].textContent = "Dark";
    items[1].querySelector("img").src = Moon;
}

export function DarkButton() {
    const items = document.querySelector(".theme-btn").querySelectorAll("span");

    document.documentElement.classList.add("dark");
    items[0].textContent = "Light";
    items[1].querySelector("img").src = Sun;
}