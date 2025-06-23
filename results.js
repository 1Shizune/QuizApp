const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
const entry = history.find(q => q.id === id);

const container = document.getElementById('results-container');



if(!entry){
    container.textContent = "Quiz result not found.";
}
    else{
            const results = entry.results;
            results.forEach((r, i) => {
            const div = document.createElement('div');
        
            const isCorrect = r.selected === r.correct;
            const status = isCorrect ? "Correct" : "Incorrect";

            div.style.backgroundColor = isCorrect ? "#1f7a1f" : "#FF220C";
            div.style.padding = "1rem";
            div.style.marginBottom = "1rem";
            div.style.borderRadius = "1rem";


            div.innerHTML = `
            <h3> Question ${i + 1}: ${r.question} </h3>
            <p> Your answer: <strong>${r.answers[r.selected]} </strong> </p>
            <p> Correct answer: <strong>${r.answers[r.correct]} </strong> </p>
            <p> Status: ${status} </p>
            <hr/>
            `;
        
            container.appendChild(div);
        });
    
    }
