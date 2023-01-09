import { getData } from "./xhrRequest.js";
const apiUrl = "https://newsdata.io/api/1/news?apikey=";
const apiKey = config.my_key;
const country = location.pathname.split("/").splice(1, 1);
let lang;
let pageNr = 0;
let newsArr = [];
let searchWord;
let search;

function init() {
    let prev = document.getElementById("prev");
    prev.addEventListener("click", prevPage)

    let next = document.getElementById("next");
    next.addEventListener("click", nextPage);

    let anchorLinks = document.querySelectorAll(".menu a");
    anchorLinks.forEach(a => {
        a.addEventListener("click", loadCategoryPage);
    });
    //--------------------------------------------
    search = document.getElementById("searchForm");
    inputSearch = search.querySelector("input");
    search.addEventListener("submit", searchNews);
    //--------------------------------------------
    language();
} //End init
window.addEventListener("load", init);
//----------------------------------------------
function language() {
    switch (country[0]) {
        case "se":
            lang = "sv";
            break;
        case "ru":
            lang = "ru";
            break;
        case "tr":
            lang = "tr";
            break;
        case "ua":
            lang = "uk";
            break;
        default:
            lang = "en";
    };
    getNewsCat();
} //End language
//----------------------------------------------
function getNewsCat() {
    searchWord = decodeURIComponent(location.search.substring(1));
    let contentEl = document.getElementById("content");
    let searchForm = document.getElementById("searchForm")

    if (searchWord) {
        contentEl.classList.remove("hide");
        searchForm.classList.add("hide");
        publishNews()
        return;
    } else {
        searchForm.classList.remove("hide");
        contentEl.classList.add("hide");
    }
} //End getNewsCat
//----------------------------------------------
async function publishNews() {
    let searchTitel = document.getElementById("search_word");
    searchTitel.innerHTML = searchWord;

    let articelsContainer = document.querySelector(".news .article-container");

    articelsContainer.innerHTML = " ";

    let response = await getData(apiUrl + apiKey + "&language=" + lang + "&q=" + searchWord + "&page=" + pageNr);

    for (let i = 0; i < response.results.length; i++) {
        newsArr.push(response.results[i])
    };

    let foundedArticels = document.getElementById("count");
    foundedArticels.innerHTML = response.totalResults;

    for (let i = 0; i < 10; i++) {
        let date = newsArr[i].pubDate.split(" ");
        let anchorEl = document.createElement("a");
        anchorEl.href = newsArr[i].link;
        anchorEl.target = "_blank";
        if (newsArr[i].image_url) {
            anchorEl.innerHTML = `
                         <h4>${newsArr[i].title}</h4>
                         <span>${date[0]}</span>
                         <img src="${newsArr[i].image_url}" alt="${newsArr[i].title}">
                     `
            articelsContainer.appendChild(anchorEl);
        } else {
            anchorEl.innerHTML = `
                         <h4>${newsArr[i].title}</h4>
                         <span>${date[0]}</span>
                         <img src="https://dummyimage.com/640/666666/fff.png&text=Image+Missing" alt="Image Missing">
                     `
            articelsContainer.appendChild(anchorEl);
        }
    }
    newsArr.splice(0, 10)
    let actuelPageEl = document.getElementById("actuel");
    actuelPageEl.innerHTML = pageNr + 1;
    let totPageNr = document.getElementById("total");
    totPageNr.innerHTML = Math.ceil(response.totalResults / 10);


    if (pageNr == 0) {
        prev.style.display = "none";
    } else {
        prev.style.display = "block";
    }

    if (pageNr == response.totalResults) {
        next.style.display = "none";
    } else {
        next.style.display = "block";
    }


} //End publishNews
//----------------------------------------------
function prevPage(e) {
    e.preventDefault();
    pageNr--;
    publishNews();
} //End prevPage
//----------------------------------------------
function nextPage(e) {
    e.preventDefault();
    pageNr++;
    publishNews();
} //End nextPage
//----------------------------------------------
function searchNews(e) {
    e.preventDefault();
    if (inputSearch.value === "") {
        inputSearch.placeholder = "The search field is empty";
        return;
    };
    location.assign("?" + inputSearch.value);
};