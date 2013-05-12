/*var allQuestions = [
	{
		question: "Which American State is the best?", 
		choices: ['New York', 'Washington', 'Texas', 'California','Nevada'],
		correctAnswer: 3
	},
	{
		question: "Which country hasn't Gary been to?".
		choices:['Mexico','Argentina','Ecuador','Indonesia','Laos'],
		correctAnswer: 2
	},
	{
		question: "",
		choices:[],
		correctAnswer: 0
	}
];*/

var questions = [{
    question: "What is 2*5?",
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 2
}, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
}, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
}, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
}, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
}];


function createQuestionElement(index) {
    var qDiv = document.createElement('div');
    qDiv.setAttribute('id', 'question');
    var question = document.createElement('p');
    question.innerHTML = questions[index].question;
    qDiv.appendChild(question);
    qDiv.appendChild(createRadios(index));
    return qDiv;
}

function createRadios(index) {
    var radioList = document.createElement('ul');
    var item = '';
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
        item = document.createElement('li');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];

        item.innerHTML = input;
        radioList.appendChild(item);
    }

    return radioList;
}

function displayScore() {
    var para = document.createElement('p');
    var numCorrect = 0;

    for (var i = 0; i < selections.length; i++) {
        if (selections[i] == questions[i].correctAnswer) {
            numCorrect++;
        }
    }

    para.innerHTML = 'You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!';
    return para;
}

var questionCounter = 0;
var selections = [];
var firstDiv = createQuestionElement(questionCounter);
var radios = document.getElementsByName('answer');

document.getElementById('quiz').appendChild(firstDiv);

$('#next').on('click', function () {
    var nextQuestion;

    select();
    if (selections[questionCounter] === undefined) {
        alert('Please make a selection!');
    } else {
        questionCounter++;
        $('#question').remove();
        
        document.getElementById('prev').setAttribute('style', 'display:inline');

        if (questionCounter < questions.length) {
            nextQuestion = createQuestionElement(questionCounter);
            //$('#quiz').append(nextQuestion);
            document.getElementById('quiz').appendChild(nextQuestion);
            if(selections[questionCounter] !== undefined){
                radios[selections[questionCounter]].checked = true;
            }
        } else {
            document.getElementById('quiz').appendChild(displayScore());
            document.getElementById('next').setAttribute('style', 'display:none');
            document.getElementById('prev').setAttribute('style', 'display:none');
        }
    }
});

$('#prev').on('click', function () {
    var prevQuestion;

    select();
});


function select() {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selections[questionCounter] = radios[i].value;
        }
    }
}