function createQuestionElement(index) {
    var qDiv = document.createElement('div');
    qDiv.setAttribute('id', 'question');

    var header = document.createElement('h2');
    header.innerHTML = 'Question ' + (index + 1) + ":";

    var question = document.createElement('p');
    question.innerHTML = questions[index].question;

    qDiv.appendChild(header);
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

    para.innerHTML = 'You got ' + numCorrect + ' questions out of ' +
        questions.length + ' right!!!';
    return para;
}

function select() {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selections[questionCounter] = radios[i].value;
        }
    }
}

var questionCounter = 0;
var selections = [];
var radios = document.getElementsByName('answer');

var firstDiv = createQuestionElement(questionCounter);
document.getElementById('quiz').appendChild(firstDiv);

$('#next').on('click', function () {
    select();

    if (selections[questionCounter] === undefined) {
        alert('Please make a selection!');
    } else {
        questionCounter++;
        $('#question').remove();
        
        document.getElementById('prev').setAttribute('style', 'display:inline');

        if (questionCounter < questions.length) {
            var nextQuestion = createQuestionElement(questionCounter);
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
    select();

    questionCounter--;
    $('#question').remove();

    if(questionCounter == 0){
        document.getElementById('prev').setAttribute('style', 'display:none');
    }

    var prevQuestion = createQuestionElement(questionCounter);
    document.getElementById('quiz').appendChild(prevQuestion);
    radios[selections[questionCounter]].checked = true;
});


