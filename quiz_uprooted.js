const questions = [
    {
        question: "Question 1: You're chosen to be the Dragon's next apprentice. What do you do?",
        answers: [
            { text: "Beg to not be taken", value: 1 },
            { text: "Resign yourself to your fate", value: 2 },
            { text: "Stand stone still in shock", value: 3 },
            { text: "Run away", value: 4 }
        ]
    },
    {
        question: "Question 2: The Dragon is getting you to do magic for the first time. How do you feel?",
        answers: [
            { text: "You collapse after one spell", value: 4 },
            { text: "You feel drowsy but still standing", value: 1 },
            { text: "You feel the magic rush through your body but feel no after effects", value: 3 },
            { text: "You refuse to do magic point blank", value: 2 }
        ]
    },
    {
        question: "Question 3: Your best friend has been taken by the Wood. Do you go after her?",
        answers: [
            { text: "Yes absolutely", value: 3 },
            { text: "No I'm too afraid", value: 1 },
            { text: "No I'll be killed", value: 4 },
            { text: "The dragon won't let me", value: 2 }
        ]
    },
    {
        question: "Question 4: The dragon asks you to cast an illusion spell. What do you make appear?",
        answers: [
            { text: "A rose", value: 3 },
            { text: "An animal", value: 4 },
            { text: "Your family", value: 1 },
            { text: "A welcoming meal", value: 2 }
        ]
    },
    {
        question: "Question 5: You and your friends have made a decisive move against the Wood. What is your next move?",
        answers: [
            { text: "Burn it down", value: 2 },
            { text: "Wait and see what its countermove is", value: 1 },
            { text: "Gather forces to beat it back", value: 4 },
            { text: "Enter the wood and try to save the queen", value: 3 }
        ]
    }
];


let totalScore = 0;
let currentQuestion = 0;
const selectedAnswers = [];

const questionContainer = document.getElementById('question');
const choicesContainer = document.querySelector('.choices');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const explanationElement = document.getElementById('explanation');

// Ensure the next button is always visible
nextButton.style.display = 'block';

function loadQuestion() {
    const current = questions[currentQuestion];
    questionContainer.textContent = current.question;
    choicesContainer.innerHTML = '';
    current.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('choice');
        button.dataset.value = answer.value;
        button.innerHTML = `<span>${answer.text}</span>`;
        button.addEventListener('click', selectAnswer);

        if (selectedAnswers[currentQuestion] === answer.value) {
            button.classList.add('selected');
        }

        choicesContainer.appendChild(button);
    });

    // Show the explanation only for the first question
    if (currentQuestion === 0) {
        explanationElement.style.display = 'block';
    } else {
        explanationElement.style.display = 'none';
    }

    prevButton.style.display = currentQuestion > 0 ? 'block' : 'none';
}

function selectAnswer(e) {
    document.querySelectorAll('.choice').forEach(choice => {
        choice.classList.remove('selected');
    });
    e.currentTarget.classList.add('selected');
    const selectedValue = parseInt(e.currentTarget.dataset.value);
    selectedAnswers[currentQuestion] = selectedValue;
    totalScore = selectedAnswers.reduce((acc, val) => acc + (val || 0), 0);
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
    prevButton.style.display = currentQuestion > 0 ? 'block' : 'none';
});

prevButton.addEventListener('click', () => {
    currentQuestion--;
    if (currentQuestion >= 0) {
        loadQuestion();
    }
    nextButton.style.display = 'block'; // Ensure next button is visible
    prevButton.style.display = currentQuestion > 0 ? 'block' : 'none'; // Hide prev button on first question
});

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';

    let resultText = document.getElementById('result-text');
    let resultImage = document.getElementById('result-image');
    let resultCaption = document.getElementById('result-caption');

    if (totalScore <= 8) {
        resultText.textContent = "Your Next Book Is... From Blood and Ash by Jennifer L. Armentrout.";
        resultImage.src = "fromBloodAndAsh.png"; // Replace with the path to your image
        resultImage.style.display = 'block';
        resultCaption.innerHTML = 'Image from <a href="https://www.goodreads.com/book/show/52831200-from-blood-and-ash" target="_blank" aria-label="visit Goodreads.com">Goodreads</a>.';
    } else if (totalScore <= 12) {
        resultText.textContent = "Your Next Book Is... Once Upon A Broken Heart by Stephanie Garber.";
        resultImage.src = "onceUponBrokenHeart.png"; // Replace with the path to your image
        resultImage.style.display = 'block';
        resultCaption.innerHTML = 'Image from <a href="https://www.goodreads.com/series/321795-once-upon-a-broken-heart" target="_blank" aria-label="visit Goodreads.com">Goodreads</a>.';
    } else if (totalScore <= 16) {
        resultText.textContent = "Your Next Book Is... Howl's Moving Castle by Diana Wynne Jones.";
        resultImage.src = "howl.png"; // Replace with the path to your image
        resultImage.style.display = 'block';
        resultCaption.innerHTML = 'Image from <a href="https://www.goodreads.com/book/show/196253792-howl-s-moving-castlet" target="_blank" aria-label="visit goodreads.com">Goodreads</a>.';
    } else {
        resultText.textContent = "Your Next Book Is... The Serpent and the Wings of Night by Carissa Broadbent.";
        resultImage.src = "theSerpentandTheWingsOfNight.png"; // Replace with the path to your image
        resultImage.style.display = 'block';
        resultCaption.innerHTML = 'Image from <a href="https://us.macmillan.com/books/9781250343178/theserpentthewingsofnight" target="_blank" aria-label="visit macmillan.com">Macmillan</a>.';
    }

    resultCaption.style.display = 'block';
    document.getElementById('result-container').style.display = 'block';
}

// Add event listener for the restart button
document.getElementById('restart-button').addEventListener('click', restartQuiz);

function restartQuiz() {
    // Reset quiz state
    totalScore = 0;
    currentQuestion = 0;
    selectedAnswers.length = 0;

    // Hide result container
    document.getElementById('result-container').style.display = 'none';
    
    // Show quiz container and load the first question
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

loadQuestion();