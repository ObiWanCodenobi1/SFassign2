let score = 0;
let time = 30;
let questionNo = 0; 
let numberOfQuestions = 20;

function countdown(){
    document.getElementById("timer").innerHTML = "time left: "+time;
    --time;
    if(time == -1){
        time = 30;
        user_answers.push("");
        nextQuestion();
    }
    return time;
}

let interval = setInterval(countdown,1000);

api_url = "https://opentdb.com/api.php?amount=20&type=multiple";
async function getQuestions(){
    const response = await fetch(api_url); 
    const data = await response.json(); 
    console.log(data.results);
    result = data.results;
    nextQuestion();
}

function nextQuestion(){
    if(questionNo>=numberOfQuestions){
        clearInterval(interval);
        end();
        return;
    }
    let question = result[questionNo].question;
    correct = result[questionNo].correct_answer;
    incorrect = result[questionNo].incorrect_answers;
    
    document.getElementById("question").innerHTML = question;
    correct_option = "opt1";
    document.getElementById("opt1").innerHTML = correct;
    document.getElementById("opt2").innerHTML = incorrect[0];
    document.getElementById("opt3").innerHTML = incorrect[1];
    document.getElementById("opt4").innerHTML = incorrect[2];

    questionNo++;
    document.getElementById("QuestionNo").innerHTML = "Question No: " + questionNo;
    time = 30;
}

user_answers = [];
function answer(option){
    user_answers.push(document.getElementById(option).innerHTML);
    if(document.getElementById(option).innerHTML == correct){
        document.getElementById(option).style.backgroundColor = "green";
        score++;
    }
    else{
        document.getElementById(option).style.backgroundColor = "red";
        document.getElementById(correct_option).style.backgroundColor = "green";
    }
    delay = setTimeout(function() {
        nextQuestion()
        document.getElementById(option).style.backgroundColor = "#0d6efd";
        document.getElementById(correct_option).style.backgroundColor = "#0d6efd";
    }, 1000);
}

function end(){
    document.getElementById("question").innerHTML = "<p>Congratulations on completing the quiz! Your hard work and dedication truly paid off. Great job!</p>";
    document.getElementById("question").innerHTML += "<p id = 'score'> score: " + score +"</p><p>"
    for(i = 0; i < numberOfQuestions; i++){
        document.getElementById("question").innerHTML += "Question: " + result[i].question + "<br>";
        document.getElementById("question").innerHTML += "Correct Answer: " + result[i].correct_answer + "<br>";
        document.getElementById("question").innerHTML += "Your Answer: " + user_answers[i] + "<br>";
    }
    document.getElementById("question").innerHTML += "</div>"
    document.getElementById("restart").style.display = "block";
    document.getElementById("opt1").style.display = "none";
    document.getElementById("opt2").style.display = "none";
    document.getElementById("opt3").style.display = "none";
    document.getElementById("opt4").style.display = "none";
}

function restart(){
    score = 0;
    questionNo = 0;
    document.getElementById("restart").style.display = "none";
    getQuestions();
    document.getElementById("opt1").style.display = "block";
    document.getElementById("opt2").style.display = "block";
    document.getElementById("opt3").style.display = "block";
    document.getElementById("opt4").style.display = "block";
}