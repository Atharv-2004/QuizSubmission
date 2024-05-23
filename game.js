window.addEventListener('DOMContentLoaded', () => {
    const questionEl = document.querySelector('#question');
    const choicesEls = document.querySelectorAll('.choice-text');
    const questionCounterEl = document.querySelector('#question-counter');
    const scoreEl = document.querySelector('#score');
    const progressBarEl = document.querySelector('#progress-bar-full');
  
    const SCORE_POINTS = 100;
    const ANSWER_DISPLAY_TIME = 1000;
    let currentQuestionIndex = 0;
    let score = 0;
    let isAnswerLocked = false;
  
    const questions = [
      {
        text: 'Which HTML tag is used to define an inline style?',
        options: ['<script>', '<css>', '<style>', '<span>'],
        answer: 2,
      },
      {
        text: 'Which property is used to change the text color in CSS?',
        options: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 3,
      },
      {
        text: 'Which of the following is the correct way to comment in HTML?',
        options: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        answer: 1,
      },
    ];
  
    const resetState = () => {
      currentQuestionIndex = 0;
      score = 0;
      isAnswerLocked = false;
      updateScoreDisplay();
      showQuestion();
    };
  
    const showQuestion = () => {
      const question = questions[currentQuestionIndex];
      questionEl.textContent = question.text;
      choicesEls.forEach((choiceEl, index) => {
        choiceEl.textContent = question.options[index];
      });
      updateQuestionCounter();
      updateProgressBar();
    };
  
    const updateQuestionCounter = () => {
      questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    };
  
    const updateProgressBar = () => {
      const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
      progressBarEl.style.width = `${progress}%`;
    };
  
    const updateScoreDisplay = () => {
      scoreEl.textContent = `Score: ${score}`;
    };
  
    const handleAnswer = (choiceIndex) => {
      if (isAnswerLocked) return;
  
      isAnswerLocked = true;
      const question = questions[currentQuestionIndex];
  
      choicesEls.forEach((choiceEl, index) => {
        if (index === choiceIndex) {
          if (index === question.answer) {
            score += SCORE_POINTS;
            updateScoreDisplay();
            choiceEl.parentElement.classList.add('correct');
          } else {
            choiceEl.parentElement.classList.add('incorrect');
          }
        } else if (index === question.answer) {
          choiceEl.parentElement.classList.add('correct');
        }
      });
  
      setTimeout(() => {
        choicesEls.forEach(choiceEl => choiceEl.parentElement.classList.remove('correct', 'incorrect'));
        currentQuestionIndex++;
  
        if (currentQuestionIndex >= questions.length) {
          localStorage.setItem('mostRecentScore', score);
          window.location.assign('end.html');
        } else {
          isAnswerLocked = false;
          showQuestion();
        }
      }, ANSWER_DISPLAY_TIME);
    };
  
    choicesEls.forEach((choiceEl, index) => {
      choiceEl.addEventListener('click', () => handleAnswer(index));
    });
  
    resetState();
  });
  