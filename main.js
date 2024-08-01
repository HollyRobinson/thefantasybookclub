// variables initilastion
let currentQuestion = 0; //tracks the index of the current question
let score = []; //sets up an array to store the scores of each answer
let selectedAnswersData = []; //empty array for the answers being selected
const totalQuestions =questions.length; //stores the total number of questions

// selects elements using document.querySelector() to display the elements for the quiz
const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');
const option6 = document.querySelector('.option6');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
//what the input is for 
function generateQuestions (index) {
    // selects description element
    const description = document.querySelector('.description p');
    
    // Display description only when first question is showing
    if (index === 0) {
        description.style.display = 'block';
    } else {
        description.style.display = 'none';
    }
    // Retrieves the current questions and its options from the questions array based on the index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    const option5Total = questions[index].answer5Total;
    const option6Total = questions[index].answer6Total;
    //updates the questions andoption HTML elements with current question and option
    questionEl.innerHTML = `${index + 1}. ${question.question}` 
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option5.setAttribute('data-total', `${option5Total}`);
    option6.setAttribute('data-total', `${option6Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
    option5.innerHTML = `${question.answer5}`
    option6.innerHTML = `${question.answer6}`
}

//selects checked radio button/user's answer
function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    //Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //increment the current question number (to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question change next to finish
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
            `<h1 class="final-score">Your score: ${totalScore}</h1>
                <div class="summary">
                    <h2>Here are your results!</h2>
                        <p>1 - 10: Liwei</p>
                        <figure>
                            <img src="liwei.png" alt="Artist impression of liwei">
                            <figcaption> Art by Grace Zhu. Image from <a href="https://www.suelynntan.com/books" target="_blank">Sue Lyn Tan</a>.</figcaption>
                        </figure>
                        
                        <p>If you are Liwei, you are kind and sensitive, yet you are also extremely protective of your 
                        loved ones. You prefer community to solitude and have a playful nature.</p>
                        <p>10 - 16: Xingyin</p>
                        <figure>
                            <img src="xingyin.png" alt="Artist impression of xingyin">
                            <figcaption> Art by Grace Zhu. Image from <a href="https://www.suelynntan.com/books" target="_blank">Sue Lyn Tan</a>.</figcaption>
                        </figure>
                        
                        <p>If you are Xingyin, you are strong and selfless, willing to go to any 
                        length to protect those you care about. You prefer solitude to community and have a reserved nature.</p>
                        <p>16 - 21: Wenzhei </p>
                        <figure>
                            <img src="wenzhi.png" alt="Artist impression of wenzhi">
                            <figcaption> Art by Grace Zhu. Image from <a href="https://www.suelynntan.com/books" target="_blank">Sue Lyn Tan</a>.</figcaption>
                        </figure>
                        
                        <p>If you are Wenzhi, you are capable and an achiever. You would burn the entire world for the people you care about. 
                        You prefer solitude to community and possess a fierce nature.</p>
                </div>
            <button class="restart">Restart Quiz</button>
            `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}

//add event listeners to buttons
generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);


