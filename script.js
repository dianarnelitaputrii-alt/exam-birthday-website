
const $ = (id) => document.getElementById(id);

// Opening button
$("openGiftButton").addEventListener("click", () => {
  $("birthday").scrollIntoView({ behavior: "smooth" });
});

// Letter reveal
$("envelopeButton").addEventListener("click", () => {
  const paper = $("letterPaper");
  const opening = paper.classList.contains("hidden");

  paper.classList.toggle("hidden");
  $("envelopeButton").setAttribute("aria-expanded", String(opening));
  $("envelopeButton").querySelector("span:nth-child(2)").textContent =
    opening ? "Close letter" : "Tap to open";
});

// Ten personal notes
const reasons = [
  "You keep trying, even when things get difficult.",
  "You have a patient side that I truly appreciate.",
  "You still make an effort to understand us.",
  "You have your own dreams and I want to see you reach them.",
  "You can make ordinary days feel meaningful.",
  "You remind me that relationships take effort from both sides.",
  "You have a kind heart. Keep it, and protect it too.",
  "You are someone I have shared so many memories with.",
  "You keep showing up, even after difficult days.",
  "Because you're you, Exam. That's already a lot."
];

const reasonGrid = $("reasonGrid");
let openedReasons = 0;

reasons.forEach((reason, index) => {
  const button = document.createElement("button");
  button.className = "reason-card";
  button.type = "button";

  button.innerHTML =
    `<span class="number">NOTE ${String(index + 1).padStart(2, "0")}</span>
    <span class="reason-text">Tap to reveal ♡</span>`;

  button.addEventListener("click", () => {
    if (!button.classList.contains("opened")) {
      button.classList.add("opened");
      button.querySelector(".reason-text").textContent = reason;
      openedReasons++;

      $("reasonHint").textContent = openedReasons === 10
        ? "You found all ten. Here's to many more good memories ♡"
        : `${openedReasons} of 10 little notes opened ♡`;
    }
  });

  reasonGrid.appendChild(button);
});

// Small quiz
const questions = [
  {
    q: "What are we celebrating today?",
    a: ["A random Tuesday", "Exam's birthday", "A school holiday"],
    correct: 1,
    yes: "That's right! It's your day, Sam ♡"
  },
  {
    q: "What do I hope for your future?",
    a: ["That you stop dreaming", "That you never try new things", "That your dreams come true"],
    correct: 2,
    yes: "Exactly. I'll always be rooting for you."
  },
  {
    q: "What's one thing we should keep learning?",
    a: ["How to understand each other better", "How to win every argument", "How to stay stubborn"],
    correct: 0,
    yes: "Correct. Let's keep growing, one step at a time ♡"
  }
];

let questionIndex = 0;

function renderQuestion() {
  const item = questions[questionIndex];

  $("quizCount").textContent =
    `QUESTION ${questionIndex + 1} OF ${questions.length}`;
  $("quizQuestion").textContent = item.q;
  $("quizFeedback").textContent = "";
  $("nextQuestion").classList.add("hidden");

  const list = $("answerList");
  list.innerHTML = "";

  item.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      [...list.children].forEach((child) => {
        child.disabled = true;
      });

      $("quizFeedback").textContent =
        index === item.correct
          ? item.yes
          : "Not quite, but you still get full birthday points from me ♡";

      $("nextQuestion").textContent =
        questionIndex === questions.length - 1 ? "FINISH ♡" : "NEXT ♡";

      $("nextQuestion").classList.remove("hidden");
    });

    list.appendChild(button);
  });
}

$("nextQuestion").addEventListener("click", () => {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    $("quizQuestion").textContent = "You finished the quiz! ♡";
    $("answerList").innerHTML = "";
    $("quizFeedback").textContent =
      "Thank you for playing. I hope this made you smile.";
    $("nextQuestion").classList.add("hidden");
    $("quizCount").textContent = "QUIZ COMPLETED";
  }
});

renderQuestion();

// Flower messages
document.querySelectorAll(".flower").forEach((flower) => {
  flower.addEventListener("click", () => {
    $("flowerMessage").textContent = flower.dataset.message;
  });
});

// Final present reveal
$("giftBox").addEventListener("click", () => {
  $("finalNote").classList.remove("hidden");
  $("giftBox").querySelector("span").textContent = "💝";
  $("giftBox").querySelector("small").textContent = "opened with love";

  $("finalNote").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

