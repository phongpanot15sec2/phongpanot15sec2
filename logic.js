// State Variables
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const categoryBadge = document.getElementById('category-badge');
const questionCount = document.getElementById('question-count');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

// Start Game Function
function startGame(category) {
    // 1. Filter Questions
    if (category === 'Mixed') {
        // Shuffle all questions and take 15
        currentQuestions = [...quizData].sort(() => 0.5 - Math.random()).slice(0, 15);
    } else {
        currentQuestions = quizData.filter(q => q.category.includes(category));
        // Shuffle specific category questions
        currentQuestions.sort(() => 0.5 - Math.random());
    }

    if (currentQuestions.length === 0) {
        alert("No questions found for this category!");
        return;
    }

    // 2. Reset State
    currentQuestionIndex = 0;
    score = 0;
    categoryBadge.textContent = category;

    // 3. Switch Screens
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    // 4. Load First Question
    loadQuestion();
}

// Load Question Function
function loadQuestion() {
    isAnswered = false;
    const currentQ = currentQuestions[currentQuestionIndex];

    // Update UI
    questionText.textContent = currentQ.question;
    questionCount.textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
    const progressPercent = ((currentQuestionIndex) / currentQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Render Options
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

// Check Answer Function
function checkAnswer(selectedIndex, btnElement) {
    if (isAnswered) return;
    isAnswered = true;

    const currentQ = currentQuestions[currentQuestionIndex];
    const correctIndex = currentQ.answer;
    const options = optionsContainer.children;

    if (selectedIndex === correctIndex) {
        score++;
        btnElement.classList.add('correct');
    } else {
        btnElement.classList.add('wrong');
        options[correctIndex].classList.add('correct'); // Show correct one
    }

    // Next Question Delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

// End Game Function
function endGame() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScore.textContent = score;
    document.querySelector('.total-score').textContent = `/ ${currentQuestions.length}`;

    const percent = (score / currentQuestions.length) * 100;
    if (percent === 100) {
        resultMessage.textContent = "สุดยอด! คุณคือผู้เชี่ยวชาญ AI";
    } else if (percent >= 80) {
        resultMessage.textContent = "เยี่ยมมาก!";
    } else if (percent >= 50) {
        resultMessage.textContent = "ทำได้ดี! พยายามอีกนิด";
    } else {
        resultMessage.textContent = "สู้ๆ! ลองใหม่อีกครั้งนะ";
    }
}

// Reset Function
function resetGame() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}
