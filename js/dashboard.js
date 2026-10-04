// ===============================
// DASHBOARD NAVIGATION
// ===============================

const navItems = document.querySelectorAll(".nav-item");

// navItems.forEach(item => {

//     item.addEventListener("click", function (event) {

//         event.preventDefault();

//         navItems.forEach(nav => {
//             nav.classList.remove("active");
//         });

//         this.classList.add("active");

//     });

// });

navItems.forEach(item => {

    item.addEventListener("click", function () {

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// ===============================
// SEARCH
// ===============================

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase();

        const interviews =
            document.querySelectorAll(".interview-item");

        interviews.forEach(interview => {

            const text =
                interview.textContent.toLowerCase();

            if (text.includes(searchValue)) {
                interview.style.display = "flex";
            } else {
                interview.style.display = "none";
            }

        });

    });

}


// ===============================
// RECOMMENDED CARDS
// ===============================

const recommendationCards =
    document.querySelectorAll(".recommend-card");

recommendationCards.forEach(card => {

    card.addEventListener("click", () => {

        const title =
            card.querySelector("h3").textContent;

        console.log("Selected:", title);

        // Later you can redirect to the interview page:
        // window.location.href = "interview.html";

    });

});


// ===============================
// VIEW ALL
// ===============================

const viewAll =
    document.querySelector(".view-all");

if (viewAll) {

    viewAll.addEventListener("click", () => {

        console.log("Opening interview history...");

        // Later:
        // window.location.href = "history.html";

    });

}