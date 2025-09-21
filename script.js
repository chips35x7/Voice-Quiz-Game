const questions = [
  { q: "What color are bananas when they are ripe?", a: "yellow" },
  { q: "What is 5 minus 2?", a: "three" },
  { q: "What is the opposite of hot?", a: "cold" },
  { q: "Which animal is known as the king of the jungle?", a: "lion" },
  { q: "How many days are in a week?", a: "seven" },
  { q: "What planet do we live on?", a: "earth" },
  { q: "What is ten multiplied by two?", a: "twenty" },
  { q: "Who wrote the play Romeo and Juliet?", a: "shakespeare" },
  { q: "What gas do humans need to breathe to stay alive?", a: "oxygen" },
  { q: "If you mix red and blue paint, what color do you get?", a: "purple" },
];

let current = 0;
const questionBox = document.getElementById("questionBox");
const spokenText = document.getElementById("spokenText");
const feedback = document.getElementById("feedback");

// Text-to-Speech
function speak(text) {
  speechSynthesis.cancel(); // stop previous speech
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Start Game
function startGame() {
  feedback.innerText = "";
  current = 0;
  askQuestion();
}

// Ask Question
function askQuestion() {
  const question = questions[current].q;
  questionBox.innerText = question;
  speak(question);
  startListening();
}

// Listen to Answer
function startListening() {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const userAnswer = event.results[0][0].transcript.toLowerCase();
    spokenText.innerText = `You said: ${userAnswer}`;
    checkAnswer(userAnswer);
  };

  recognition.onerror = (event) => {
    feedback.innerText = `Error: ${event.error}`;
  };
}

// Check Answer
function checkAnswer(answer) {
  const correct = questions[current].a.toLowerCase();
  if (answer.includes(correct)) {
    feedback.innerText = "✅ Correct!";
    speak("Correct!");
    current++;
    if (current < questions.length) {
      setTimeout(askQuestion, 1500); // small pause before next Q
    } else {
      speak("Well done! You've finished the game.");
      questionBox.innerText = "🎉 Game Complete!";
    }
  } else {
    feedback.innerText = "❌ Try again.";
    speak("That is not correct. Try again.");
    setTimeout(askQuestion, 1500); // retry same question
  }
}
