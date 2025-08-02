// Toggle Nav Menu (optional if you already have this)
function toggleMenu() {
    const navLinks = document.getElementById("nav_links");
    navLinks.classList.toggle("show");
}

// Load XP from localStorage or start with defaults
let ExpEntries = JSON.parse(localStorage.getItem("ExpEntries")) || [
  "Finished FreeCodeCamp – 10xp – 07/26/2025",
  "Worked out – 3xp – 07/24/2025",
  "Updated portfolio – 5xp – 07/20/2025"
];

let adminMode = false; // Only true when secret combo is pressed

// Render the XP log
function CharExpLog() {
    const LogContainer = document.getElementById("exp_log");
    LogContainer.innerHTML = "";

    ExpEntries.forEach((entry, index) => {
        const p = document.createElement("p");
        p.textContent = `• ${entry}`;

        if (adminMode) {
            const delBtn = document.createElement("button");
            delBtn.textContent = "❌";
            delBtn.style.marginLeft = "10px";
            delBtn.style.cursor = "pointer";
            delBtn.onclick = () => {
                ExpEntries.splice(index, 1);
                localStorage.setItem("ExpEntries", JSON.stringify(ExpEntries));
                CharExpLog();
            };
            p.appendChild(delBtn);
        }

        LogContainer.appendChild(p);
    });
}

// Add new XP
function addExp() {
    const input = document.getElementById("exp_input");
    const newEntry = input.value.trim();

    if (newEntry !== "") {
        const date = new Date();
        const dateStr = date.toLocaleDateString("en-US");
        const log = `${newEntry} – ${dateStr}`;

        ExpEntries.unshift(log);
        localStorage.setItem("ExpEntries", JSON.stringify(ExpEntries));
        input.value = "";
        CharExpLog();
    }
}

// Secret combo to toggle input + delete mode (Ctrl+Shift+X)
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "X") {
        const form = document.getElementById("exp_form_container");
        adminMode = !adminMode;
        form.style.display = adminMode ? "block" : "none";
        CharExpLog();
    }
});

// Initial render
CharExpLog();
