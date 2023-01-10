import { getData } from "./xhrRequest.js";
let idx = 0; //Index to count
let interval = setInterval(changeIdx, 4000); //Interval time
let imgElem; //Referens to cards wich holds images on hero section
let hightToFixNav; //Referens to fixed hight of elements header and section of news

let latestNewsHero;
let mostReadedHero;
//----------------------------------------------
const apiUrl = "https://newsdata.io/api/1/news?apikey=";
const apiKey = config.my_key;
const country = location.pathname.split("/").splice(1, 1);
let lang;
//----------------------------------------------
let heroContainer;

let latestNewsArr = [];
let latestNewsNr = 0;

let topNewsArr = [];
let topNewsNr = 0;

let politicsArr = [];
let politicsNr = 0;

let businessArr = [];
let businessNr = 0;

let sportsArr = [];
let sportsNr = 0;

let healthArr = [];
let healthNr = 0;

let entertainmentArr = [];
let entertainmentNr = 0;

let technologyArr = [];
let technologyNr = 0;

//----------------------------------------------
function init() {
  //----------------------------------------------
  //Previous image slide
  let leftArr; //Left arrow
  leftArr = document.querySelector(".fa-chevron-left");
  leftArr.addEventListener("click", () => {
    idx--;
    changeImage();
    resetInterval();
  }); //End Previous image slide

  //----------------------------------------------
  //Next image slide
  let rightArr; //Right arrow
  rightArr = document.querySelector(".fa-chevron-right");
  rightArr.addEventListener("click", () => {
    idx++;
    changeImage();
    resetInterval();
  }); //End Next image slide

  //----------------------------------------------
  //Referenc to latest news header
  latestNewsHero = document.getElementById("latestNewsHero");
  latestNewsHero.addEventListener("click", toggleNews);

  //----------------------------------------------
  //Referenc to most readed news header
  mostReadedHero = document.getElementById("topNewsHero");
  mostReadedHero.addEventListener("click", toggleNews);

  //---------------------------------witch-------------
  /* Nav sticky details */
  let heroSection = document.querySelector(".hero");
  let newsFeed = document.querySelector(".newsFeed");
  hightToFixNav = heroSection.offsetHeight + newsFeed.offsetHeight + 30;

  language();

  heroContainer = document.getElementById("hero-imgContainer-images");
} // End init
window.addEventListener("load", init);
window.addEventListener("scroll", fixNav);
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
  }
  heroNews()
}
//----------------------------------------------
async function heroNews() {
  while (latestNewsArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&language=" + lang + "&category=top&country=" + country[0] + "&page=" + latestNewsNr);
    for (let i = 0; i < response.results.length; i++) {
      if (response.results[i].image_url) {
        latestNewsArr.push(response.results[i])
      }
    }
    latestNewsNr++;
  };

  for (let i = 0; i < 5; i++) {
    let heroEl = document.createElement("div");
    heroEl.classList.add("hero-imgContainer-images-cards");
    heroEl.innerHTML = `
               <img src="${latestNewsArr[i].image_url}" alt="${latestNewsArr[i].title}">
               <a href="${latestNewsArr[i].link}" target="_blank">${latestNewsArr[i].title}</a>
               `
    heroContainer.appendChild(heroEl)
  }
  latestNewsArr.splice(0, 5);
  imgElem = document.querySelectorAll(".hero-imgContainer-images-cards");
  latestNews();
  setTimeout(() => {
    topNews();
    politics();
  }, 3000)
  setTimeout(() => {
    business();
    sports();
  }, 6000)
  setTimeout(() => {
    health();
    entertainment();
    technology();
  }, 9000)
};
//----------------------------------------------
async function latestNews() {
  let articelsContainer = document.querySelector(".latestNewsHero .article-container");
  let loadrMore = document.querySelector(".latestNewsHero .loadMore");
  loadrMore.addEventListener("click", latestNews);

  while (latestNewsArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&language=" + lang + "&category=top&country=" + country[0] + "&page=" + latestNewsNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      latestNewsArr.push(response.results[i])
      /* } */
    }
    latestNewsNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = latestNewsArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.href = latestNewsArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
                      <h4>${latestNewsArr[i].title}</h4>
                      <span>${date[0]}</span>
                      <img src="${latestNewsArr[i].image_url}" alt="${latestNewsArr[i].title}">
                  `
    articelsContainer.appendChild(anchorEl)
  }
  latestNewsArr.splice(0, 5);
};
//----------------------------------------------
async function topNews() {
  let articelsContainer = document.querySelector(".topNewsHero .article-container");
  let loadrMore = document.querySelector(".topNewsHero .loadMore");
  loadrMore.addEventListener("click", topNews);

  while (topNewsArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&country=" + country[0] + "&category=business,politics,sports,technology&page=" + topNewsNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      topNewsArr.push(response.results[i])
      /* } */
    }
    topNewsNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = topNewsArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.href = topNewsArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
                      <h4>${topNewsArr[i].title}</h4>
                      <span>${date[0]}</span>
                      <img src="${topNewsArr[i].image_url}" alt="${topNewsArr[i].title}">
                  `
    articelsContainer.appendChild(anchorEl)
  }
  topNewsArr.splice(0, 5);
};
//----------------------------------------------
async function politics() {
  let articelsContainer = document.querySelector(".politics .article-container");
  let loadrMore = document.querySelector(".politics .loadMore")
  loadrMore.addEventListener("click", politics);

  while (politicsArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&country=" + country[0] + "&category=politics&page=" + politicsNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      politicsArr.push(response.results[i])
      /* } */
    }
    politicsNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = politicsArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.classList.add("article")
    anchorEl.href = politicsArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
              <img src="${politicsArr[i].image_url}" alt="${politicsArr[i].title}" loading="lazy">
              <h4 class="newsFeed-latestNewsFeed-article_titel">${politicsArr[i].title}</h4>
              <span class="newsFeed-latestNewsFeed-article_date">${date[0]}</span>
                  `

    articelsContainer.appendChild(anchorEl)
  }
  politicsArr.splice(0, 5);
};
//----------------------------------------------
async function business() {
  let articelsContainer = document.querySelector(".business .article-container");
  let loadrMore = document.querySelector(".business .loadMore")
  loadrMore.addEventListener("click", business);

  while (businessArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&country=" + country[0] + "&category=business&page=" + businessNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      businessArr.push(response.results[i])
      /* } */
    }
    businessNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = businessArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.classList.add("article")
    anchorEl.href = businessArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
              <img src="${businessArr[i].image_url}" alt="${businessArr[i].title}" loading="lazy">
              <h4 class="newsFeed-latestNewsFeed-article_titel">${businessArr[i].title}</h4>
              <span class="newsFeed-latestNewsFeed-article_date">${date[0]}</span>
                  `

    articelsContainer.appendChild(anchorEl)
  }
  businessArr.splice(0, 5);
};
//----------------------------------------------
async function sports() {
  let articelsContainer = document.querySelector(".sports .article-container");
  let loadrMore = document.querySelector(".sports .loadMore")
  loadrMore.addEventListener("click", sports);

  while (sportsArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&country=" + country[0] + "&category=sports&page=" + sportsNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      sportsArr.push(response.results[i])
      /* } */
    }
    sportsNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = sportsArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.classList.add("article")
    anchorEl.href = sportsArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
              <img src="${sportsArr[i].image_url}" alt="${sportsArr[i].title}" loading="lazy">
              <h4 class="newsFeed-latestNewsFeed-article_titel">${sportsArr[i].title}</h4>
              <span class="newsFeed-latestNewsFeed-article_date">${date[0]}</span>
                  `

    articelsContainer.appendChild(anchorEl)
  }
  sportsArr.splice(0, 5);
};
//----------------------------------------------
async function health() {
  let articelsContainer = document.querySelector(".health .article-container");
  let loadrMore = document.querySelector(".health .loadMore")
  loadrMore.addEventListener("click", health);

  while (healthArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&country=" + country + "&category=health&page=" + healthNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      healthArr.push(response.results[i])
      /* } */
    }
    healthNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = healthArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.classList.add("article")
    anchorEl.href = healthArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
              <img src="${healthArr[i].image_url}" alt="${healthArr[i].title}" loading="lazy">
              <h4 class="newsFeed-latestNewsFeed-article_titel">${healthArr[i].title}</h4>
              <span class="newsFeed-latestNewsFeed-article_date">${date[0]}</span>
              `
    articelsContainer.appendChild(anchorEl)
  }
  healthArr.splice(0, 5);
};
//----------------------------------------------
async function entertainment() {
  let articelsContainer = document.querySelector(".entertainment .article-container");
  let loadrMore = document.querySelector(".entertainment .loadMore")
  loadrMore.addEventListener("click", entertainment);
  while (entertainmentArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&country=" + country[0] + "&category=entertainment&page=" + entertainmentNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      entertainmentArr.push(response.results[i])
      /* } */
    }
    entertainmentNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = entertainmentArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.classList.add("article")
    anchorEl.href = entertainmentArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
              <img src="${entertainmentArr[i].image_url}" alt="${entertainmentArr[i].title}" loading="lazy">
              <h4 class="newsFeed-latestNewsFeed-article_titel">${entertainmentArr[i].title}</h4>
              <span class="newsFeed-latestNewsFeed-article_date">${date[0]}</span>
              `
    articelsContainer.appendChild(anchorEl)
  }
  entertainmentArr.splice(0, 5);
};
//----------------------------------------------
async function technology() {
  let articelsContainer = document.querySelector(".technology .article-container");
  let loadrMore = document.querySelector(".technology .loadMore")
  loadrMore.addEventListener("click", technology);

  while (technologyArr.length < 5) {
    let response = await getData(apiUrl + apiKey + "&country=" + country[0] + "&category=technology&page=" + technologyNr);
    for (let i = 0; i < response.results.length; i++) {
      /* if (response.results[i].image_url) { */
      technologyArr.push(response.results[i])
      /* } */
    }
    technologyNr++;
  };

  for (let i = 0; i < 5; i++) {
    let date = technologyArr[i].pubDate.split(" ");
    let anchorEl = document.createElement("a");
    anchorEl.classList.add("article")
    anchorEl.href = technologyArr[i].link;
    anchorEl.target = "_blank";
    anchorEl.innerHTML = `
              <img src="${technologyArr[i].image_url}" alt="${technologyArr[i].title}" loading="lazy">
              <h4 class="newsFeed-latestNewsFeed-article_titel">${technologyArr[i].title}</h4>
              <span class="newsFeed-latestNewsFeed-article_date">${date[0]}</span>
              `
    articelsContainer.appendChild(anchorEl)
  }
  technologyArr.splice(0, 5);
};
//----------------------------------------------
//Hero section index changer
function changeIdx() {
  changeImage();
  idx++;
} //End index changer
//----------------------------------------------
//Hero section image changer
function changeImage() {
  //Referens to the container to translate images
  let imgContainer = document.getElementById("hero-imgContainer-images");

  if (idx > imgElem.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = imgElem.length - 1;
  }

  let transValue = (idx * imgContainer.offsetWidth) / 10 + idx * 0.4;
  heroContainer.style.transform = "translateX(" + -transValue + "rem)";
} //End image changer
//----------------------------------------------
//Reset interval
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(changeIdx, 4000);
} //End Reset interval
//----------------------------------------------
//Toggling betwenn latest and most readed news
function toggleNews() {
  if (this.classList.contains("active")) {
    return;
  } else {
    latestNewsHero.classList.remove("active");
    mostReadedHero.classList.remove("active");
    this.classList.add("active");
    let showSection = document.querySelector("." + this.id);
    for (let i = 0; i < showSection.parentNode.children.length; i++) {
      showSection.parentNode.children[i].classList.remove("active")
    }
    showSection.classList.add("active")
  }
}
//----------------------------------------------
//Sticky navbar 
function fixNav() {
  let navElem = document.getElementById("nav");
  //----------------------------------------------
  if (window.scrollY > hightToFixNav) {
    navElem.classList.add("sticky");
  } else {
    navElem.classList.remove("sticky");
  }
  //----------------------------------------------
  let sections = document.querySelectorAll("nav ~ section");
  let ulList = document.querySelector(".nav ul")

  if (sections[0].getBoundingClientRect().top <= 100 && sections[0].getBoundingClientRect().bottom > 50) {
    ulList.children[0].classList.add("active");
    ulList.scrollLeft = ulList.children[0].offsetLeft - 16
  } else {
    ulList.children[0].classList.remove("active");
  }

  if (sections[1].getBoundingClientRect().top <= 100 && sections[1].getBoundingClientRect().bottom > 50) {
    ulList.children[1].classList.add("active");
    ulList.scrollLeft = ulList.children[1].offsetLeft - 16
  } else {
    ulList.children[1].classList.remove("active");
  }

  if (sections[2].getBoundingClientRect().top <= 100 && sections[2].getBoundingClientRect().bottom > 50) {
    ulList.children[2].classList.add("active");
    ulList.scrollLeft = ulList.children[2].offsetLeft - 16;
  } else {
    ulList.children[2].classList.remove("active");
  }

  if (sections[3].getBoundingClientRect().top <= 100 && sections[3].getBoundingClientRect().bottom > 50) {
    ulList.children[3].classList.add("active");
    ulList.scrollLeft = ulList.children[3].offsetLeft - 16;
  } else {
    ulList.children[3].classList.remove("active");
  }

  if (sections[4].getBoundingClientRect().top <= 100 && sections[4].getBoundingClientRect().bottom > 50) {
    ulList.children[4].classList.add("active");
  } else {
    ulList.children[4].classList.remove("active");
  }

  if (sections[5].getBoundingClientRect().top <= 100 && sections[5].getBoundingClientRect().bottom > 0) {
    ulList.children[5].classList.add("active");
  } else {
    ulList.children[5].classList.remove("active");
  }
}//End fixNav