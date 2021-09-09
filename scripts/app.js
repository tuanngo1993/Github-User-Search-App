const axios = require('axios');

let searchInput = document.getElementById('user-search-app');

axios.get('https://api.github.com/users/octocat')
    .then(response => {
        const userData = response.data;
        const createDate = new Date(Date.parse(userData.created_at)).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        console.log(userData);
        let content = searchInput.innerHTML;
        content = content.replace(/{%USER_NAME%}/g, userData.name);
        content = content.replace(/{%LOGIN_NAME%}/g, userData.login);
        content = content.replace(/{%AVATAR%}/g, userData.avatar_url);
        content = content.replace(/{%CREATE_DATE%}/g, createDate);
        content = content.replace(/{%BIO%}/g, userData.bio || '');
        content = content.replace(/{%REPOS%}/g, userData.public_repos);
        content = content.replace(/{%FOLLOWERS%}/g, userData.followers);
        content = content.replace(/{%FOLLOWING%}/g, userData.following);
        content = content.replace(/{%LOCATION%}/g, userData.location);
        content = content.replace(/{%SOCIAL_MEDIA%}/g, userData.twitter_username || 'Not Available');
        content = content.replace(/{%GITHUB_LINK%}/g, userData.blog);
        content = content.replace(/{%COMPANY%}/g, userData.company);
        searchInput.innerHTML = content;
    })
