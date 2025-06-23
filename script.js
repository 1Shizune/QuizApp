
const urlParameters = new URLSearchParams(window.location.search);
const numQuestions = parseInt(urlParameters.get('numQuestions')) || 10; /* 5 questions is the default for the quiz, or get the number of questions from the user input */


let questions = []; /* Declare an array to hold the questions */
let results = []; /* Track the users answers */
let currentQuestion = 0;


fetch('questions/questions.json') /* Get the questions from the json file */
.then(response => response.json())
.then(data => {
    questions = data;
    
    if(numQuestions > questions.length){
        alert(`Only ${questions.length} questions available. Using all of these available questions.`);
    }

    const shuffled = questions
    .map(q => ({q, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({q}) => q);

    quizQuestions = shuffled.slice(0, numQuestions);
    currentQuestion = 0;
    loadQuestion(currentQuestion);
})

.catch(error => {
    console.error("Failed to load questions:", error)
    const questionE1 = document.getElementById("question-text");
    if(questionE1){
        questionE1.textContent = "Failed to load questions.";
    } 
});

let quizQuestions = [];

function loadQuestion(index){
    const q = quizQuestions[index];
    if(!q){
        return;
    }
    document.getElementById("question-text").textContent = q.question;

    ["A", "B", "C", "D"].forEach(letter =>{
        const box = document.getElementById(letter);
        box.textContent = q[letter];
        box.style.backgroundColor = "";
        box.onclick = () => handleAnswerClick(letter, q.answer);
    });

}

function handleAnswerClick(selected, correct){ /* check whether the selected answer is correct or not */
    const q = quizQuestions[currentQuestion];
    
    results.push({
        question: q.question,
        selected: selected,
        correct: correct,
        answers: {A: q.A, B: q.B, C: q.C, D: q.D}
    });
    
    ["A","B","C","D"].forEach(letter => {
        const box = document.getElementById(letter);
        if(letter === correct){
            box.style.backgroundColor = "green";
        }
            else if(letter === selected){
                box.style.backgroundColor = "red";
            }
                else{
                    box.style.backgroundColor = "";
                }
    });

    setTimeout(() => {
        currentQuestion++;
        if(currentQuestion < quizQuestions.length){
            loadQuestion(currentQuestion);
        }
            else{
                const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
                const correctCount = results.filter(r => r.selected === r.correct).length;

                history.push({
                    id: Date.now(),
                    results,
                    summary: {
                        total: results.length,
                        correct: correctCount,
                        time: new Date().toLocaleString()  
                    }
                });
                localStorage.setItem('quizHistory', JSON.stringify(history));
                window.location.href = `results.html?id=${history[history.length - 1].id}`;
            }
    }, 1500);
}



