// script.js
let pollResults = {};

function submitVote() {
    const selectedOption = document.querySelector('input[name="poll-option"]:checked');
    if (selectedOption) {
        const vote = selectedOption.value;

        if (pollResults[vote]) {
            pollResults[vote]++;
        } else {
            pollResults[vote] = 1;
        }

        updateResults();
        saveResultsToTextFile();
    }
}

function updateResults() {
    const resultsContent = document.getElementById("results-content");
    resultsContent.innerHTML = "";

    for (const option in pollResults) {
        resultsContent.innerHTML += `${option}: ${pollResults[option]}\n`;
    }
}

function saveResultsToTextFile() {
    const textToSave = JSON.stringify(pollResults, null, 2);
    const blob = new Blob([textToSave], { type: "text/plain" });
    const a = document.createElement("a");
    a.download = "poll-results.txt";
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
