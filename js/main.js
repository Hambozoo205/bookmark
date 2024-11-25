
var form = document.getElementById("bookmarkForm");
var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var bookmarksList = document.getElementById("bookmarksList");


form.addEventListener("submit", function (e) {
    e.preventDefault();

    var siteName = siteNameInput.value;
    var siteURL = siteURLInput.value;

    if (!siteName || !siteURL) {
        alert("Please provide both Site Name and Site URL.");
        return;
    }


    var bookmark = { name: siteName, url: siteURL };
    saveBookmark(bookmark);


    siteNameInput.value = "";
    siteURLInput.value = "";


    renderBookmarks();
});


function saveBookmark(bookmark) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}


function removeBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks = bookmarks.filter(function (bookmark) {
        return bookmark.url !== url;
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
}


function renderBookmarks() {
    bookmarksList.innerHTML = "";

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks.forEach(function (bookmark) {
        var div = document.createElement("div");
        div.className = "bookmark";
        div.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button onclick="removeBookmark('${bookmark.url}')">Delete</button>
        `;
        bookmarksList.appendChild(div);
    });
}


renderBookmarks();

