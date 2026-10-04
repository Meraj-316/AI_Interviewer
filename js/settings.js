const saveSettings = document.getElementById("saveSettings");
const logoutBtn = document.getElementById("logoutBtn");

if (saveSettings) {
    saveSettings.addEventListener("click", function () {

        const difficulty = document.getElementById("difficulty").value;
        const questionCount = document.getElementById("questionCount").value;

        const settings = {
            difficulty: difficulty,
            questionCount: questionCount,
            reminders: document.getElementById("reminderToggle").checked,
            performanceUpdates: document.getElementById("performanceToggle").checked
        };

        localStorage.setItem(
            "aiInterviewerSettings",
            JSON.stringify(settings)
        );

        alert("Settings saved successfully!");
    });
}


if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}


/* ================= LOAD SAVED SETTINGS ================= */

const savedSettings = localStorage.getItem("aiInterviewerSettings");

if (savedSettings) {

    const settings = JSON.parse(savedSettings);

    const difficulty = document.getElementById("difficulty");
    const questionCount = document.getElementById("questionCount");
    const reminderToggle = document.getElementById("reminderToggle");
    const performanceToggle = document.getElementById("performanceToggle");

    if (difficulty) {
        difficulty.value = settings.difficulty;
    }

    if (questionCount) {
        questionCount.value = settings.questionCount;
    }

    if (reminderToggle) {
        reminderToggle.checked = settings.reminders;
    }

    if (performanceToggle) {
        performanceToggle.checked = settings.performanceUpdates;
    }
}