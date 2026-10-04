const editProfileBtn = document.getElementById("editProfileBtn");
const profileModal = document.getElementById("profileModal");
const closeProfileModal = document.getElementById("closeProfileModal");
const profileForm = document.getElementById("profileForm");

if (editProfileBtn && profileModal) {
    editProfileBtn.addEventListener("click", function () {
        profileModal.classList.add("active");
    });
}

if (closeProfileModal && profileModal) {
    closeProfileModal.addEventListener("click", function () {
        profileModal.classList.remove("active");
    });
}

if (profileModal) {
    profileModal.addEventListener("click", function (event) {
        if (event.target === profileModal) {
            profileModal.classList.remove("active");
        }
    });
}

if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("profileName").value.trim();
        const email = document.getElementById("profileEmail").value.trim();

        if (!name || !email) {
            alert("Please fill in all required fields.");
            return;
        }

        alert("Profile updated successfully!");

        profileModal.classList.remove("active");
    });
}