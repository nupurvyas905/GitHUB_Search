const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const searchBox = document.getElementById("search");

const getUser = async (username) => {
    if (!username) return;  // Prevent empty API calls

    const response = await fetch(`${APIURL}${username}`);
    if (!response.ok) {
        main.innerHTML = `<p>User not found!</p>`;
        return;
    }

    const data = await response.json();
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="${data.name}">
            </div>
            <div class="user-info">
                <h2>${data.name || "No Name"}</h2>
                <p>${data.bio || "No Bio Available"}</p>

                <ul class="info">
                    <li>${data.followers} <strong>Followers</strong></li>
                    <li>${data.following} <strong>Following</strong></li>
                    <li>${data.public_repos} <strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = card;
    getRepos(username);
};

const getRepos = async (username) => {
    const repos = document.getElementById("repos");
    repos.innerHTML = "";  // Clear previous repos

    const response = await fetch(`${APIURL}${username}/repos`);
    if (!response.ok) return;

    const data = await response.json();
    data.forEach((item) => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "_blank";
        repos.appendChild(elem);
    });
};

const formSubmit = () => {
    const username = searchBox.value.trim();
    if (username) {
        getUser(username);
        searchBox.value = "";
    }
    return false;
};

searchBox.addEventListener("focusout", formSubmit);


