var questionCounter = 0; //Tracks question number
var selections = []; //Array containing user choices
var radios = document.getElementsByName('answer');

var firstDiv = createQuestionElement(questionCounter);
//document.getElementById('quiz').appendChild(firstDiv);
$('#quiz').append(firstDiv).fadeIn();

// Click handler for the 'next' button
$('#next').on('click', function () {
    select();

    if (selections[questionCounter] === undefined) {
        alert('Please make a selection!');
    } else {
        questionCounter++;
        $('#quiz').fadeOut(function () {
            $('#question').remove();

            //document.getElementById('prev').setAttribute('style', 'display:inline');
            $('#prev').css('display', 'inline');

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                //document.getElementById('quiz').appendChild(nextQuestion);
                $('#quiz').append(nextQuestion).fadeIn();
                if (selections[questionCounter] !== undefined) {
                    radios[selections[questionCounter]].checked = true;
                    //$('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }
            } else {
                //document.getElementById('quiz')
                //    .appendChild(displayScore());
                var scoreElem = displayScore();
                $('#quiz').append(scoreElem).fadeIn();
                /*document.getElementById('next')
                    .setAttribute('style', 'display:none');
                document.getElementById('prev')
                    .setAttribute('style', 'display:none');
                    */
                $('#next').css('display', 'none');
                $('#prev').css('display', 'none');
                $('#start').css('display', 'inline');
            }
        });
    }
});

// Click handler for the 'prev' button
$('#prev').on('click', function () {
    select();

    questionCounter--;

    $('#quiz').fadeOut(function () {
        $('#question').remove();

        if (questionCounter === 0) {
            document.getElementById('prev').setAttribute('style', 'display:none');
        }

        var prevQuestion = createQuestionElement(questionCounter);
        //document.getElementById('quiz').appendChild(prevQuestion);
        $('#quiz').append(prevQuestion).fadeIn();
        radios[selections[questionCounter]].checked = true;
        //$('input[value=' + selections[questionCounter] + ']').prop('checked', true);

    });
});

// Click handler for the 'Start Over' button
$('#start').click(function () {
    questionCounter = 0;
    for (var i = 0, max = selections.length; i < max; i++) {
        selections[i] = undefined;
    }

    $('#quiz').fadeOut(function () {
        $('#score').remove();
        firstDiv = createQuestionElement(questionCounter);
        $('#quiz').append(firstDiv).fadeIn();

        $('#next').css('display', 'inline');
        $('#start').css('display', 'none');
    });
});

// Creates and returns the div that contains the questions and 
// the answer selections
function createQuestionElement(index) {
    //  Old method, done with pure JS
    /*
    var qElement = document.createElement('div');
    qElement.setAttribute('id', 'question');

    var header = document.createElement('h2');
    header.innerHTML = 'Question ' + (index + 1) + ":";
    qElement.appendChild(header);

    var question = document.createElement('p');
    question.innerHTML = questions[index].question;
    qElement.appendChild(question);

    var radioButtons = createRadios(index);
    qElement.appendChild(radioButtons);
    
    return qElement;
*/

    //  Done using jQuery
    var qElement = $('<div>', {
        id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
}

// Creates a list of the answer choices as radio inputs
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

// Reads the user selection
function select() {
    for (var inputVal = 0; inputVal < radios.length; inputVal++) {
        if (radios[inputVal].checked) {
            selections[questionCounter] = +radios[inputVal].value;
        }
    }
    //selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

// Computes score and returns a paragraph element to be displayed
function displayScore() {
    var score = document.createElement('p');
    score.setAttribute('id', 'score');

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
            numCorrect++;
        }
    }
    //console.log(typeof (selections[0]));
    //console.log(typeof (questions[0].correctAnswer));

    score.innerHTML = 'You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!';
    return score;
}