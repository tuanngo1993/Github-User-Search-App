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
  joinDate.textContent = createDate;
  bio.textContent = userData.bio;
  repos.textContent = userData.public_repos;
  followers.textContent = userData.followers;
  following.textContent = userData.following;
  handleCheckAvailable(location, userData.location);
  handleCheckAvailable(twitter, userData.twitter_username);
  handleCheckAvailable(githubLink, userData.blog);
  handleCheckAvailable(company, userData.company);
}

function handleChange(e) {
  if (e.target.value === "") return;

  handleGetUser(e.target.value).then((user) => handleRenderUser(user));
}

async function handleGetUser(user = "octocat") {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`);
    handleResults();
    return response.data;
  } catch (error) {
    handleResults(error);
  }
}

handleGetUser().then((user) => handleRenderUser(user));

let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");
searchInput.addEventListener("change", handleChange);
searchBtn.addEventListener("click", searchInput.onchange);
