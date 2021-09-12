const axios = require("axios");

function handleResults(error) {
  let noResults = document.querySelector(".no-results");
  if (!error) {
    noResults.classList.add("hidden");
  } else {
    noResults.classList.remove("hidden");
  }
}

function handleCheckAvailable(selector, data) {
  if (data) {
    selector.textContent = data;
    selector.parentNode.classList.remove("opacity-30");
    if (selector.tagName === "A") {
      selector.href = data;
      selector.title = data;
      selector.classList.remove("pointer-events-none");
    }
  } else {
    selector.textContent = "Not Available";
    selector.parentNode.classList.add("opacity-30");
    if (selector.tagName === "A") {
      selector.classList.add("pointer-events-none");
    }
  }
}

function handleRenderUser(userData) {
  if (!userData) return;

  let avatar = document.querySelector(".avatar");
  let userName = document.querySelector(".user-name");
  let loginName = document.querySelector(".login-name");
  let joinDate = document.querySelector(".join-date");
  let bio = document.querySelector(".bio");
  let repos = document.querySelector(".repos");
  let followers = document.querySelector(".followers");
  let following = document.querySelector(".following");
  let location = document.querySelector(".location");
  let twitter = document.querySelector(".twitter");
  let githubLink = document.querySelector(".github-link");
  let company = document.querySelector(".company");
  let items = document.querySelectorAll(".item");
  const createDate = new Date(
    Date.parse(userData.created_at)
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  avatar.src = userData.avatar_url;
  userName.textContent = userData.name;
  loginName.textContent = `@${userData.login}`;
  joinDate.textContent = 'Joined ' + createDate;
  bio.textContent = userData.bio || "This profile has no bio";
  repos.textContent = userData.public_repos;
  followers.textContent = userData.followers;
  following.textContent = userData.following;
  handleCheckAvailable(location, userData.location);
  handleCheckAvailable(twitter, userData.twitter_username);
  handleCheckAvailable(githubLink, userData.blog);
  handleCheckAvailable(company, userData.company);
}

function handleChangeUser(e) {
  if (e.target.value === "") return;

  handleGetUser(e.target.value).then((user) => handleRenderUser(user));
}

async function handleGetUser(user = "tuanngo1993") {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`);
    handleResults();
    return response.data;
  } catch (error) {
    handleResults(error);
  }
}

function handleLightButton() {
  const items = document.querySelector('.theme-btn').querySelectorAll('span');
  
  document.documentElement.classList.remove("dark");
  items[0].textContent = "Dark";
  items[1].querySelector('img').src = "./assets/icon-moon.svg";
}

function handleDarkButton() {
  const items = document.querySelector('.theme-btn').querySelectorAll('span');

  document.documentElement.classList.add("dark");
  items[0].textContent = "Light";
  items[1].querySelector('img').src = "./assets/icon-sun.svg";
}
  
function handleTheme() {
  if(this.window) {
    if(localStorage.theme === "dark" ) {
      handleDarkButton();
    } else {
      handleLightButton();
    }
  } else {
      if (
          localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        localStorage.theme = "light";
        handleLightButton();
      } else {
        localStorage.theme = "dark";
        handleDarkButton();
      }
  }
}

// Start run app from here
document.addEventListener('DOMContentLoaded', () => {
  handleTheme();
})

handleGetUser().then((user) => handleRenderUser(user));

let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");
let themeBtn = document.querySelector(".theme-btn");
searchInput.addEventListener("change", handleChangeUser);
searchBtn.addEventListener("click", searchInput.onchange);
themeBtn.addEventListener("click", handleTheme);
