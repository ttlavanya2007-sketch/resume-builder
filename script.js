const pdfInput = document.getElementById("pdfInput");
const chooseButton = document.getElementById("chooseButton");
const analyzeButton = document.getElementById("analyzeButton");
const dropArea = document.getElementById("dropArea");
const fileName = document.getElementById("fileName");

let selectedFile = null;

chooseButton.addEventListener("click", () => pdfInput.click());

pdfInput.addEventListener("change", () => {
    if (pdfInput.files.length > 0) handleFile(pdfInput.files[0]);
});

function handleFile(file) {
    if (file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")) {
        alert("Please upload a PDF file.");
        pdfInput.value = "";
        selectedFile = null;
        analyzeButton.disabled = true;
        fileName.textContent = "";
        return;
    }

    selectedFile = file;
    fileName.textContent = "📄 " + file.name;
    analyzeButton.disabled = false;
}

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("dragover");
    const file = event.dataTransfer.files[0];
    if (file) handleFile(file);
});

analyzeButton.addEventListener("click", () => {
    if (!selectedFile) {
        alert("Please upload your resume first.");
        return;
    }

    analyzeButton.disabled = true;
    analyzeButton.textContent = "Analyzing demo...";

    setTimeout(() => {
        const demoScore = 78;

        document.getElementById("scoreValue").textContent = demoScore + "%";
        document.getElementById("scoreCircle").style.background =
            `conic-gradient(#7654f8 0% ${demoScore}%, #eeeaff ${demoScore}% 100%)`;
        document.getElementById("scoreLabel").textContent = "Good Match!";
        document.getElementById("scoreDescription").textContent =
            `Demo score: ${demoScore}%. Your actual resume has not been analyzed.`;

        document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" });

        analyzeButton.disabled = false;
        analyzeButton.textContent = "Analyze Again ✨";
    }, 1000);
});
