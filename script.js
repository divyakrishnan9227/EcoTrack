const themeToggle = document.getElementById("theme-toggle");

// Toggle between light mode and dark mode
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    // Update the button icon
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});