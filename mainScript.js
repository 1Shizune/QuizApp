document.getElementById('numQuestions').onclick = () =>{ /* Get the user input from the main page on how many questions they want their quiz to have */
    let num = prompt("How many questions do you want this quiz to have? The default number is 10 questions.");
    num = parseInt(num);

    if(!num || num <= 0){
        alert("Please enter a valid positive number.");
        return
    }

    window.location.href = `game.html?numQuestions=${num}`;

};

