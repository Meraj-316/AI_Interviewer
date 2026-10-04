// ===============================
// GET STARTED BUTTONS
// ===============================

const getStartedButton =
    document.getElementById("getStarted");

const navGetStarted =
    document.getElementById("navGetStarted");


function openDashboard() {

    window.location.href = "dashboard.html";

}
const loginButton =
    document.getElementById("loginBtn");

if (loginButton) {

    loginButton.addEventListener("click", openDashboard);

}

if (getStartedButton) {

    getStartedButton.addEventListener(
        "click",
        openDashboard
    );

}


if (navGetStarted) {

    navGetStarted.addEventListener(
        "click",
        openDashboard
    );

}


// ===============================
// LEARN MORE
// ===============================

const learnMore =
    document.getElementById("learnMore");

if (learnMore) {

    learnMore.addEventListener("click", () => {

        document
            .getElementById("features")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


// ===============================
// NAVIGATION
// ===============================

const navLinks =
    document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});