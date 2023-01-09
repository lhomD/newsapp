let wrapper; //Body element to add and remove dark mode
//Reference to the modals
let categoMod;
let langMod;
let searchMod;
//Reference to the buttons on the footer 
let langBtn;
let menuBtn;
let searchBtn;
let modeBtn;
let searchForm;
let searFormModal;
let goTopBtn;
let langPath;
//--------------------------------------------
function init() {
    //--------------------------------------------
    wrapper = document.querySelector(".wrapper");
    //--------------------------------------------
    modeBtn = document.getElementById("mode");
    modeBtn.addEventListener("click", changeTheme);
    //--------------------------------------------
    categoMod = document.getElementById("category");
    menuBtn = document.getElementById("menuBtn");
    menuBtn.addEventListener("click", showCat);
    //--------------------------------------------
    langMod = document.getElementById("language");
    langBtn = document.getElementById("langBtn");
    langBtn.addEventListener("click", showLang);
    //--------------------------------------------
    searchMod = document.getElementById("search");
    searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", showSearch);
    //--------------------------------------------
    searFormModal = document.getElementById("form");
    inputSearch = searFormModal.querySelector("input");
    searFormModal.addEventListener("submit", searchNews)
    //---------------------------------------------
    //----------------------------------------------
    let anchorLinks = document.querySelectorAll(".category_cards a");
    anchorLinks.forEach(a => {
        a.addEventListener("click", categoryUrl);
    });

    let goBackBtn = document.getElementById("backBtn");
    if (goBackBtn) {
        goBackBtn.addEventListener("click", goBack);
    }

    goTopBtn = document.querySelector(".toTop");
    goTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    });

    getTheme();
}//End init
window.addEventListener("load", init);
window.addEventListener('scroll', showArrov);
//--------------------------------------------
function showArrov() {
    if (window.scrollY > 300) {
        goTopBtn.classList.remove("hidden");
    } else {
        goTopBtn.classList.add("hidden");
    }
}
//--------------------------------------------
function searchNews(e) {
    e.preventDefault();
    let pathname = location.pathname.split("/");
    if (pathname.length == 4) {
        location.assign("../search/?" + inputSearch.value);
    } else {
        location.assign("./search/?" + inputSearch.value);
    }
}
//--------------------------------------------
function categoryUrl(e) {
    e.preventDefault();
    let urlAdress = encodeURIComponent(this.attributes[0].nodeValue);
    let pathname = location.pathname.split("/");
    if (pathname.length == 4) {
        location.assign("../news/?" + urlAdress);
    } else {
        location.assign("./news/?" + urlAdress);
    }
};
//--------------------------------------------
function goBack() {
    window.history.back();
}
//--------------------------------------------
/* Get localstoage */
function getTheme() {
    //Get localstorage data
    let themeMode = localStorage.getItem("mode");
    if (themeMode) {
        wrapper.classList.add(themeMode);
    }
    //------------------------------------------------------------------
    if (langPath) {
        location.href = langPath;
    } else {
        let anchorEl = document.querySelectorAll(".language a");
        anchorEl.forEach((aEl) => {
            aEl.addEventListener("click", (e) => {
                e.preventDefault();
                let lang = aEl.getAttribute("href");
                localStorage.setItem("lang", lang);
                location.href = lang;
            })
        });
    }
}
//--------------------------------------------
function changeTheme() {
    let wrapper = document.getElementById("wrapper");
    wrapper.classList.toggle("dark");
    if (!wrapper.classList.contains("dark")) {
        localStorage.setItem("mode", "");
    } else {
        localStorage.setItem("mode", "dark");
    }
};
//--------------------------------------------
function showLang() {
    langMod.classList.toggle("visible");
    langBtn.classList.toggle("active");
    categoMod.classList.remove("visible");
    menuBtn.classList.remove("active");
    searchMod.classList.remove("visible");
    searchBtn.classList.remove("active");
}
//--------------------------------------------
function showCat() {
    categoMod.classList.toggle("visible");
    menuBtn.classList.toggle("active");
    langMod.classList.remove("visible");
    langBtn.classList.remove("active");
    searchMod.classList.remove("visible");
    searchBtn.classList.remove("active");
}
//--------------------------------------------
function showSearch() {
    searchMod.classList.toggle("visible");
    searchBtn.classList.toggle("active");
    categoMod.classList.remove("visible");
    menuBtn.classList.remove("active");
    langMod.classList.remove("visible");
    langBtn.classList.remove("active");
}