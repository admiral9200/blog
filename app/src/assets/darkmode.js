function refreshToggleButton() {
    document.getElementById("toggle-theme").innerHTML = (currentTheme == "dark" ? "🌞" : "🌑");
}

function setTheme(theme) {
    if (theme == "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem('theme', 'light');
    }
    if (document.readyState == "interactive" || document.readyState == "complete")
        refreshToggleButton();
}

var currentTheme = "light";

function toggleTheme() {
    if (currentTheme == "light") {
        currentTheme = "dark";
        setTheme("dark");
    }
    else {
        currentTheme = "light";
        setTheme("light");
    }
}

if (!localStorage.getItem('theme')) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = "dark";
    } else {
        currentTheme = "light";
    }
} else {
    currentTheme = localStorage.getItem('theme');
}

setTheme(currentTheme);

window.addEventListener("load", function () {
    refreshToggleButton();
    document.documentElement.classList.add("animate");
});

exports.toggleTheme = toggleTheme;