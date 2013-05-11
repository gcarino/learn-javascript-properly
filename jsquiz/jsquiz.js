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
    choices: [2,5,10,15,20],
    correctAnswer:2
},{
    question: "What is 3*6?",
    choices: [3,6,9,12,18],
    correctAnswer:4
},{
    question: "What is 8*9?",
    choices: [72,99,108,134,156],
    correctAnswer:0
},{
    question: "What is 1*7?",
    choices: [4,5,6,7,8],
    correctAnswer:3
},{
    question: "What is 8*8?",
    choices: [20,30,40,50,64],
    correctAnswer:4
}];


function createQuestionElement(index) {
    var qDiv = document.createElement('div');
    qDiv.setAttribute('id','question');
    var question = document.createElement('p');
    question.innerHTML = questions[index].question;
    qDiv.appendChild(question);
    qDiv.appendChild(createRadios(index));
    return qDiv;
}

function createRadios(index) {
    var radioList = document.createElement('ul');
    var str;
    for(var i=0; i<questions[index].choices.length ; i++){
        var item = document.createElement('li');
        var input = '<input type="radio" name="answer" value=' + i 
            + ' />';
        input += questions[index].choices[i];
        
        item.innerHTML =input;
        radioList.appendChild(item);
    }
    
    return radioList;
}

var questionCounter = 0;
var numCorrect = 0;
var firstDiv = createQuestionElement(questionCounter);
$('#quiz').append(firstDiv);

var radios = document.getElementsByName('answer');
//var button = document.getElementById('button');

$('#button').on('click', function() {
    if(radios[questions[questionCounter].correctAnswer].checked){
        numCorrect++;
    }
    
    questionCounter++;
    $('#question').remove();
    
    if(questionCounter<questions.length){
        var nextDiv = createQuestionElement(questionCounter);
        //$('#quiz').append(nextDiv);
        document.getElementById('quiz').appendChild(nextDiv);
    } else {
        document.getElementById('quiz').appendChild(displayScore());
    }
});

function displayScore() {
    var para = document.createElement('p');
    para.innerHTML = 'You got ' + numCorrect + ' questions out of ' +
        questions.length + ' right!!!';
    return para;
}


