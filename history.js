const historyList = document.getElementById('history-list');
const history = JSON.parse(localStorage.getItem('quizHistory')) || [];

if(history.length === 0){
    historyList.textContent = "No past quizzes available to view."
}
    else{
        history.reverse().forEach(entry => {
            const div = document.createElement('div');
            div.className = 'history-entry';

            const { total, correct, time} = entry.summary;
            div.innerHTML= `
            <p> <strong> ${time} </strong> </p>
            <p> Questions: ${total} • Score: ${correct}/${total} </p>
            `;
        
            div.onclick = () => {
                window.location.href= `results.html?id=${entry.id}`;
            };

            div.style.cursor = 'pointer';
            div.style.borderBottom = '1px solid #ccc';
            div.style.padding = '10px 0';

            historyList.appendChild(div);
        
        });
    }

    document.getElementById('reset-history').onclick = () =>{
    if(confirm("Are you sure you want to delete your quiz history?")) {
        localStorage.removeItem('quizHistory');
        alert("Quiz History Has Been Cleared!");
        window.location.href = 'main.html';
    }
};