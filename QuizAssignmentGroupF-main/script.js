
const questions = [
    {
        id: 1,
        question: "Vad används let till i JavaScript? 1",
        answers: ["För att deklarera en konstant", "För att deklarera en variabel", "För att skapa en funktion", "För att skriva ut text"],
        correct: 1,

    },
    {
        id: 2,
        question: "Vad returnerar typeof 'Hello'? 2",
        answers: ["string", "text", "object", "char"],
        correct: 0
    },
    {
        id: 3,
        question: "Hur skriver man en kommentar på en rad i JavaScript? 3",
        answers: ["<!-- kommentar -->", "# kommentar", "// kommentar", "** kommentar **"],
        correct: 2
    },
    {
        id: 4,
        question: "Vad blir resultatet av '2' + 2? 4",
        answers: ["4", "22", "NaN", "undefined"],
        correct: 1
    },
    {
        id: 5,
        question: "5. Vad är true i JavaScript? 5",
        answers: ["En tal", "En text", "En boolean", "En array"],
        correct: 2,
    },
    {
        id: 6,
        question: "6. Vad är en array i JavaScript? 6",
        answers: ["En funktion", "En lista med värden", "Ett tal", "En loop"],
        correct: 1
    },
    {
        id: 7,
        question: "7. Vad är en variabel? 7",
        answers: ["Ett fast värde som aldrig ändras", "Ett sätt att lagra data", "En typ av kommentar", "En operator"],
        correct: 1
    },
    {
        id: 8,
        question: "8. Vad betyder === i JavaScript? 8",
        answers: ["Tilldelning", "Jämförelse av värde", "Jämförelse av värde och typ", "Inte lika med"],
        correct: 2
    }

];

let points = 0;
let showCurrentQuestion = 0;
let showResult = false;
let IsApproved = false;

let selectedAnswer = null;
showQuestion(showCurrentQuestion);


let nodeList = document.querySelectorAll("input");
let errorMsg = document.getElementById("user-error-message")
const paragraph = document.querySelector(".result-text")


function IsQuizApproved(points) {
    
    document.querySelector(".quiz-container").classList.add("hidden");
    document.querySelector(".final-result").removeAttribute("hidden");
   

    if (points >= 5) {
        
        paragraph.textContent = `Du blev godkänd totalt:${points} poäng av ${questions.length} 🥳.`;
        
    }
    else {
        
        paragraph.textContent = `Du blev tyvärr inte godkänd, du fick totalt:${points} poäng av ${questions.length}😢.`;
    }


}

function resetGame(){
    window.location.reload();
    
}
const resetButton = document.querySelector(".reset-game")
resetButton.addEventListener("click", resetGame)

function resetState() {
    selectedAnswer = null;

    nodeList.forEach(input => {
        let currentDiv = input.closest('.questions-container');
        input.disabled = false;
        input.checked = false;
        currentDiv.classList.remove("correct");
        currentDiv.classList.remove("wrong");
        errorMsg.textContent = "";
    })
}

function correctAnswer(currentQuestion, selectedAnswer) {

    let radioInput = document.getElementById(selectedAnswer);


    nodeList.forEach(input => {
        let currentDiv = input.closest('.questions-container');


        if (questions[currentQuestion].correct == input.id) {

            
            currentDiv.classList.add("correct")
            assignPoints(currentQuestion, selectedAnswer)

        } else {
            currentDiv.classList.add("wrong")
        }
        input.disabled = true;
    })





   

}

function assignPoints(currentQuestion, selectedAnswer) {
    if (questions[currentQuestion].correct == selectedAnswer) {

        points++
        
    
        document.querySelector(".point-counter").textContent = `Poäng: ${points}`;
    }
}

function userSelectedAnswer() {
    document.querySelector(".question-area").addEventListener('click', function (event) {
        if (event.target.checked === true) {
            selectedAnswer = event.target.id;
            correctAnswer(showCurrentQuestion, selectedAnswer);
        }
    });
}

function nextQuestion() {
    document.getElementById("next-question").addEventListener("click", function () {
        if (selectedAnswer === null) {
            errorMsg.textContent = "*Du måste välja ett svarsalternativ";
        } else {
            resetState();
            showCurrentQuestion++;
            showQuestion(showCurrentQuestion)
            

        }
        
    })


   
}


function showQuestion(questionIndex) {
    if (questionIndex <= questions.length - 1) {
        const QuestionHeaderText = `${questions[questionIndex].question} av ${questions.length}`;
        const showAnswer1 = questions[questionIndex].answers[0];
        const showAnswer2 = questions[questionIndex].answers[1];
        const showAnswer3 = questions[questionIndex].answers[2];
        const showAnswer4 = questions[questionIndex].answers[3];

        
        document.getElementById("question-text").textContent = QuestionHeaderText;

       
        document.getElementById("answer-text-1").textContent = showAnswer1;
        document.getElementById("answer-text-2").textContent = showAnswer2;
        document.getElementById("answer-text-3").textContent = showAnswer3;
        document.getElementById("answer-text-4").textContent = showAnswer4;
    } else {
        IsQuizApproved(points);
        
        
        
    }
}


nextQuestion();
userSelectedAnswer();