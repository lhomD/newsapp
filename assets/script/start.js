function init() {
    let langPath = localStorage.getItem("lang");
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
} //En init
window.addEventListener("load", init)