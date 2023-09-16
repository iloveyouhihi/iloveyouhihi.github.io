const quizQuestion = document.getElementById("question");
const quizAnswers = document.getElementById("answers");
const quizControls = document.getElementById("controls");
const quizIndicator = document.getElementById("currentQuestion");
const quizNext = document.getElementById("next");
const quizPrevious = document.getElementById("previous");
const quizSubmit = document.getElementById("submit");
const quizRestart = document.getElementById("restart");
const quizSvg = document.getElementById("svg");
const quizTheme = document.getElementById("theme");
const quizHeader = document.getElementById("header");
const quizTotalQuestions = document.getElementById("totalQuestions");
let quizCurrentQuestion = 0;
let quizUserAnswers = [];
const quizData = [
	{
		theme: "TS",
		question: "Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?",
		answers: ["Cây mía", "Củ khoai", "Bắp ngô", "Xúc xích"],
		correctAnswer: 3
	},
	{
		theme: "TS",
		question: "Hai tay bưng lấy khư khư. Bụng thì bảo dạ rằng ư đút vào. Đút vào nó sướng làm sao. Rập lên, rập xuống nó trào nước ra?",
		answers: ["Đánh răng", "Ăn mía", "Ăn xúc xích", "Nhiều chó"],
		correctAnswer: 2
	},
	{
		theme: "TS",
		question: "Ngân Hoàng có đồng ý làm ngừi iu Phong Trần không?",
		answers: [
			"Có, Ngân Hoàng đồng ý",
			"Chắc chắn là Ngân Hoàng đồng ý rồi",
			"Ngân Hoàng chắc kèo đồng ý",
			"Không"
		],
		correctAnswer: 1
	}
];
quizTotalQuestions.innerHTML = quizData.length;
function quizInit(questionNumber) {
	let question = quizData[questionNumber];
	const answers = [];
	for (number in question.answers) {
		let wasChecked = "";
		if (quizUserAnswers[questionNumber] === Number(number)) {
			wasChecked = "checked";
		}
		answers.push(`<li class="relative pb-5 mb-5 last:mb-0 text-mono last:border-0 border-b lg:w-full border-b-cyan-600 isolate cursor-pointer">
		<label class="font-mono text-xl font-medium leading-110 flex flex-row justify-start items-center select-none">
		<input type="radio" name="question${questionNumber}" value="${number}" class="answer appearance-none checked:border-4 checked:bg-white border-indigo-900 bg-black/50 w-6 h-6 shrink-0 mr-4 rounded-full before:hidden checked:before:inline-block before:absolute before:inset-y-4 before:-inset-x-12 before:-skew-y-3 before:bg-cyan-400/70 before:-top-4 before:-z-10 " ${wasChecked} />
${question.answers[number]}
		</label>
		</li>`);
	}
	if (quizCurrentQuestion > 0 && quizCurrentQuestion < quizData.length) {
		quizPrevious.classList.remove("hidden");
	} else {
		quizPrevious.classList.add("hidden");
	}
	if (quizCurrentQuestion < quizData.length - 1) {
		quizNext.classList.remove("hidden");
	} else {
		quizNext.classList.add("hidden");
	}
	if (quizCurrentQuestion == quizData.length - 1) {
		quizSubmit.classList.remove("hidden");
	} else {
		quizSubmit.classList.add("hidden");
	}

	quizTheme.innerText = quizData[questionNumber].theme;
	quizIndicator.innerHTML = quizCurrentQuestion + 1;
	quizAnswers.innerHTML = answers.join("");
	quizQuestion.innerText = question.question;
}

quizInit(quizCurrentQuestion);

function checkChecked() {
	let question = quizData[quizCurrentQuestion];
	const selector = `input[name=question${quizCurrentQuestion}]:checked`;
	const userAnswer = Number(quizAnswers.querySelector(selector)?.value);
	if (userAnswer) {
		quizUserAnswers[quizCurrentQuestion] = userAnswer;
	}
}
function showNext() {
	if (quizCurrentQuestion >= quizData.length) {
		return;
	}
    checkChecked();
    let answerChecked = quizUserAnswers[quizCurrentQuestion];
    if (quizCurrentQuestion === 0) {
        if (answerChecked == 2) {
            swal("Đúng rùi!", "Câu tiếp theo!", "success")
            .then((value) => {
                quizCurrentQuestion++;
                quizInit(quizCurrentQuestion);
            });
        } else {
            swal("Sai rùi!", "Câu tiếp theo!", "warning")
            .then((value) => {
                quizCurrentQuestion++;
                quizInit(quizCurrentQuestion);
            });
        }
    }
    if (quizCurrentQuestion === 1) {
        if (answerChecked == 1) {
            swal("Đúng rùi!", "Câu tiếp theo!", "success")
            .then((value) => {
                quizCurrentQuestion++;
                quizInit(quizCurrentQuestion);
            });
        } else {
            swal("Sai rùi!", "Câu tiếp theo!", "warning")
            .then((value) => {
                quizCurrentQuestion++;
                quizInit(quizCurrentQuestion);
            });
        }
    }
    if (quizCurrentQuestion === 2) {
        if (answerChecked == 1 || answerChecked == 0 || answerChecked == 2) {
            swal("Đúng rùi!", "Hoàn thành!", "success")
            .then((value) => {
                swal("Phần thưởng của Ngân Hoàng là 1 cái hun chụt chụt!")
                .then((value) => {
                    console.log('test');
                    window.location.href = '/firework.html'
                });
            });
        } else {
            swal("Sai rùi!", "Vui lòng chọn đáp án khác!", "warning")
        }
    }
    // swal("Click on either the button or outside the modal.")
    // .then((value) => {
    //     checkChecked();
    //     quizCurrentQuestion++;
    //     quizInit(quizCurrentQuestion);
    // });
}
function showPrevious() {
	if (quizCurrentQuestion <= 0) {
		return;
	}
	checkChecked();
	quizCurrentQuestion--;
	quizInit(quizCurrentQuestion);
}
function restartQuiz() {
	quizRestart.classList.add("hidden");
	quizSvg.classList.remove("hidden");
	quizHeader.classList.remove("items-center");
	quizAnswers.classList.remove("flex", "justify-center");
	quizTheme.classList.remove("text-white/95");
	quizUserAnswers = [];
	quizCurrentQuestion = 0;
	quizInit(quizCurrentQuestion);
}
function showResult() {
	quizSubmit.classList.add("hidden");
	quizNext.classList.add("hidden");
	quizPrevious.classList.add("hidden");
	quizRestart.classList.remove("hidden");
	quizSvg.classList.add("hidden");
	quizHeader.classList.add("items-center");
	quizAnswers.classList.add("flex", "justify-center");
	quizTheme.classList.add("text-white/95");

	checkChecked();
	const answers = [];
	const numCorrect = quizUserAnswers.reduce((totalCorrect, answer, index) => {
		let correct;
		let color;
		if (answer === quizData[index].correctAnswer - 1) {
			correct = "is correct!";
			color = "cyan-400";
			totalCorrect++;
		} else {
			correct = "is wrong";
			color = "red-400";
		}
		answers.push(
			`<li class="relative text-mono text-${color} border-b-${color} isolate inline-block mx-4">
			<input type="checkbox" name="question" class="answer appearance-none checked:border-4 checked:bg-${color} border-indigo-900 bg-black/50 w-6 h-6 shrink-0 rounded-full " checked disabled />`
		);
		return totalCorrect;
	}, 0);
	quizTheme.innerText = "Your result is:";

	quizQuestion.innerHTML = `<h1 class="mt-12 text-center font-sans -tracking-[.05em] text-2xl"><span class="text-[120px] ">${numCorrect}</span> out of <span class="text-[40px] ">${quizData.length}</span></h1>`;

	quizAnswers.innerHTML = answers.join("");
}