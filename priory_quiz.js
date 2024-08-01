let answers = {};

function selectOption(option, questionNumber) {
    // Unselect any previously selected option for this question
    document.querySelectorAll(`#question${questionNumber} .option`).forEach(el => {
        el.classList.remove('selected');
    });

    // Select the clicked option
    const selectedElement = document.querySelector(`#question${questionNumber} img[alt="Option ${option.toUpperCase()}${questionNumber}"]`);
    selectedElement.classList.add('selected');

    // Assign the answer
    answers[`question${questionNumber}`] = option === 'a' ? 1 : 2;

    // Log the answer to the console
    console.log(`Question ${questionNumber}: ${answers[`question${questionNumber}`]}`);
}

function showResults() {
    let totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `
        <p id="total-score">Total Score: ${totalScore}</p>
        <p>Congratulations!</p>
        <p>If you got between <strong>7 and 10</strong>, you are more like Tan&#233;.</p>
        <p>If you got between <strong>11 and 14</strong>, you are more like Eadaz.</p>
        <div id="girls-results">
            <img src="Images/tane.png">
            <figcaption>Tan&#233;</figcaption>
            <img src="Images/eadaz.png">
            <figcaption>Eadaz</figcaption>
            
        </div>
    `;
    resultsElement.classList.remove('hidden');
}


function clearQuiz() {
    // Clear the answers object
    answers = {};

    // Remove the selected class from all options
    document.querySelectorAll('.option').forEach(el => {
        el.classList.remove('selected');
    });

    // Hide the results paragraph
    const resultsElement = document.getElementById('results');
    resultsElement.classList.add('hidden');
    resultsElement.textContent = '';
}
