function toggleMenu() {
    const navLinks = document.getElementById("nav_links");
    navLinks.classList.toggle("show");
}

const form = document.getElementById("ravenForm");
const button = document.getElementById("sendRavenBtn");
const statusText = document.getElementById("formStatus");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        button.classList.add("sending");
        button.disabled = true;
        statusText.textContent = "Your raven is taking flight...";

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                statusText.textContent = "Message delivered successfully.";
                form.reset();
                button.classList.remove("sending");
                button.classList.add("sent");
                button.querySelector(".btn_text").textContent = "Raven Sent";
            } else {
                throw new Error("Form submission failed.");
            }
        } catch (error) {
            statusText.textContent = "The raven lost its way. Please try again.";
            button.classList.remove("sending");
            button.disabled = false;
        }
    });
}