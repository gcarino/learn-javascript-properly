(function() {
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices

    var firstDiv = createQuestionElement(questionCounter);
    $('#quiz').append(firstDiv).fadeIn();

    // Click handler for the 'next' button
    $('#next').on('click', function () {
        // Suspend click listener during fade animation
        if($('#quiz').is(':animated')) {        
            return false;
        }

        select();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            $('#quiz').fadeOut(function () {
                $('#question').remove();

                $('#prev').css('display', 'inline');

                if (questionCounter < questions.length) {
                    var nextQuestion = createQuestionElement(questionCounter);
                    $('#quiz').append(nextQuestion).fadeIn();
                    if (!(isNaN(selections[questionCounter]))) {
                        $('input[value='+selections[questionCounter]+']').prop('checked', true);
                    }
                } else {
                    var scoreElem = displayScore();
                    $('#quiz').append(scoreElem).fadeIn();
                    $('#next').css('display', 'none');
                    $('#prev').css('display', 'none');
                    $('#start').css('display', 'inline');
                }
            });
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function () {
        if($('#quiz').is(':animated')) {
            return false;
        }

        select();
        questionCounter--;

        // Removes 'Prev' button on first question
        $('#quiz').fadeOut(function () {
            $('#question').remove();

            if (questionCounter === 0) {
                document.getElementById('prev').setAttribute('style', 'display:none');
            }

            var prevQuestion = createQuestionElement(questionCounter);
            $('#quiz').append(prevQuestion).fadeIn();
            $('input[value=' + selections[questionCounter] + ']').prop('checked', true);

        });
    });

    // Click handler for the 'Start Over' button
    $('#start').click(function () {
        if($('#quiz').is(':animated')) {
            return false;
        }

        questionCounter = 0;
        selections = [];

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
        var radioList = $('<ul>')
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>')
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function select() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>',{id: 'score'});

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' 
        + questions.length + ' right!!!');
        return score;
    }
}());