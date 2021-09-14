import {CheckAvailable} from "./check-available";

export function RenderUser(userData) {
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
    joinDate.textContent = "Joined " + createDate;
    bio.textContent = userData.bio || "This profile has no bio";
    repos.textContent = userData.public_repos;
    followers.textContent = userData.followers;
    following.textContent = userData.following;
    CheckAvailable(location, userData.location);
    CheckAvailable(twitter, userData.twitter_username);
    CheckAvailable(githubLink, userData.blog);
    CheckAvailable(company, userData.company);
}