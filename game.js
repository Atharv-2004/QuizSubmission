// // const question = document.getElementById('question');
// alert("game.js is loaded");

// const question = document.getElementById('question');
// // rest of your code...

document.addEventListener('DOMContentLoaded', (event) => {
    const questionElement = document.getElementById('question');
    const choices = Array.from(document.getElementsByClassName('choice-text'));
    const questionCounterText = document.getElementById('question-counter'); // Ensure this element exists in your HTML
    const scoreText = document.getElementById('score');
    const progressBarFull = document.getElementById('progress-bar-full');

    let currentQuestion = {};
    let acceptingAnswers = false;
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];

    const questions = [
        {
            question: 'Which HTML tag is used to define an inline style?',
            choice1: '<script>',
            choice2: '<css>',
            choice3: '<style>',
            choice4: '<span>',
            answer: 3,
        },
        {
            question: 'Which property is used to change the text color in CSS?',
            choice1: 'text-color',
            choice2: 'font-color',
            choice3: 'text-style',
            choice4: 'color',
            answer: 4,
        },
        {
            question: 'Which of the following is the correct way to comment in HTML?',
            choice1: '// Comment',
            choice2: '<!-- Comment -->',
            choice3: '/* Comment */',
            choice4: '<! Comment>',
            answer: 2,
        },
    ];

    const SCORE_POINTS = 100;
    const MAX_QUESTIONS = questions.length;

    const startGame = () => {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
    };

    const getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign('end.html');
        }

        questionCounter++;
        questionCounterText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        questionElement.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    };

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === 'correct') {
                incrementScore(SCORE_POINTS);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });

    const incrementScore = num => {
        score += num;
        scoreText.innerText = `Score: ${score}`;
    };

    startGame();
});