//Para obter todos os quizzes, faça uma requisição GET para a imageUrl
//const imageUrlListQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

<<<<<<< HEAD
let quizzList = [], idUserPost = []

=======
>>>>>>> refs/remotes/origin/master
//Para buscar um único quizz, faça uma requisição GET para a imageUrl
/*"https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + "ID_DO_QUIZZ";*/

//Para criar um quizz, envie uma requisição POST para a imageUrl
//https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes

let quizz = {
    id: 1,
 	title: "",
 	image: "",
 	questions: []};

let question = {
    title: "",
 	color: "",
 	answers: 
        [
 		    
        ]
    };

//modelos de respostas:
/*{
			    text: "",
    			image: "",
	    		isCorrectAnswer: true
		    },
		    {
 		    	text: "",
 			    image: "",
 			    isCorrectAnswer: false
}*/



let title;
let imageUrl;
let numberOfQuestions;
let numberOfLevels;

//início funcões genéricas

function resetQuizz(){
    quizz.title = "";
 	quizz.image = "";
 	quizz.questions = [];
}

function resetQuestion(){
    question.title = "";
    question.color = "";
    question.answers = [];
}

function resetGlobalVariables(){
    title = "";
    imageUrl = "";
    numberOfQuestions = 0;
    numberOfLevels = 0;
}

//verifica se o numero passado é maior ou igual ao minimo permitido
//as entradas são 2 números e a saída é booleano

function checkLocalStorage(){
    let arr = localStorage.getItem("idUserPost")
    if (arr === null){
        const content = document.querySelector(".creatQuizz")
        content.classList.remove("hidden")
    }

    else{
        const content = document.querySelector(".userQuizzContainer")
        content.classList.remove("hidden")
        arr = JSON.parse(arr)   
        idUserPost = [...arr] 
    }
}

checkLocalStorage()


function aboveOrEqualMin(value, minimal){
    if (value >= minimal){
        return true;
    } else {
        return false;
    }
}

//verifica se o numero passado é menor ou igual ao máximo permitido
//as entradas são 2 números e a saída é booleano
function belowOrEqualMax(value, max){
    if (value <= max){
        return true;
    } else {
        return false;
    }
}

// função auxiliar para checar se quantidade de elementos é igual
// ou maior ao minímo
// quantity é uma string, min é um número, o retorno é booleano
function checkQuantity(quantity, min){
    const number = Number(quantity);
    return aboveOrEqualMin(quantity, number)
}

//checa se a imageUrl da imageUrlm funciona, peguei aqui:
//https://wbruno.com.br/ajax/verificar-um-arquivo-de-imageUrlm-existe-javascript/
//a entrada é uma string que contém a imageUrl da imageUrlm

function validateImageUrl(imageUrl) {
	let img = document.createElement('img');
	img.src = imageUrl;

	img.onload = function() {
	}
	img.onerror = function() {
		console.log("A imageUrl" + imageUrl + " NAO existe");
	}
    if (img.src === imageUrl){
        return true;
    } else {
        return false;
    }
}

function validateMultImageUrl(imageUrls){
    for (let i = 0; i < imageUrls.length; i++){
        if (validateImageUrl(imageUrls[i]) === false){
            return false;
        }
    }
    return true;
}

function hideScreens(){
    const createQuestionsBox = document.querySelector(".main-box-basic-informations");
    createQuestionsBox.classList.add("hidden");

    let secondScreen = document.querySelector(".create-questions-box");
    secondScreen.classList.add("hidden");    
}

//fim funcções genéricas

//inicio Criação do Quizz: Informações básicas do quizz



function createFirstScreen(){
    const main = document.querySelector("main");
    main.classList.add("hidden");


    const createQuestionsBox = document.querySelector(".main-box-basic-informations");
    createQuestionsBox.classList.remove("hidden");
}

//checa o comprimento do titulo
//title é uma string, o retorno é booleano
function validateQuizzTitleLength(title){
    if (aboveOrEqualMin(title.length, 20) && belowOrEqualMax(title.length, 65)){
        return true;
    } else {
        console.log("titulo entre 20 e 65");
        return false;
    }
}

//para validar a imageUrl de uma imageUrlm chame esta função genérica que criei
//esta função está escrita na seção de funções genéricas
//validateImageUrl("");

//checa quantidade de questões
function validateNumberOfQuestions(quantity){
    return checkQuantity(quantity, 3);
}

//checa quantidade de níveis
function validateNumberOfLevels(quantity){
    return checkQuantity(quantity, 2);
}

//checa se as informações são válidas
function validateBasicInfo(title, imageUrl, numberOfQuestions, numberOfLevels){
    
    let count = 0;//conta as validações
    if (validateQuizzTitleLength(title) === true){
        count++;
    }
    if (validateImageUrl(imageUrl) === true){
        count++;
    }
    if (validateNumberOfQuestions(numberOfQuestions) === true){
        count++;
    }
    if (validateNumberOfLevels(numberOfLevels) === true){
        count++;
    }
    //retorna true se todas as informações foram validadas
    if (count === 4){
        return true;
    } else {
        return false;
    }
}

function insertInfoIntoQuizz(title, imageUrl){
    quizz.title = title;
    quizz.image = imageUrl;
}

function goToSecondScreen(){
    let isOk = false;

    title = document.getElementById("title").value;
    imageUrl  = document.getElementById("imageUrl").value;
    numberOfQuestions = document.getElementById("numberOfQuestions").value;
    numberOfLevels = document.getElementById("numberOfLevels").value;

    isOk = validateBasicInfo(title, imageUrl, numberOfQuestions, numberOfLevels);

    if (isOk === true){
        insertInfoIntoQuizz(title, imageUrl);
        console.log(quizz);
        createSecondScreen();
    } else {
        alert("Informações incorretas!");
    }
}

//fim Criação do Quizz: Informações básicas do quizz

//inicio Criação do Quizz: Perguntas do quizz

function createQuestions_box(){
    let questions_box = ``;
    let numeroDaPergunta; 
    for (let i = 0; i<numberOfQuestions; i++){
        numeroDaPergunta = i + 1;
        questions_box += 
        `
            <div class="questions-box">
                <h3>Pergunta ${numeroDaPergunta}</h3>
                <input placeholder="Texto da pergunta" type="text" class="question-text">
                <input placeholder="Cor de fundo da pergunta"type="text" class="question-color">
                <h3>Resposta correta</h3>
                <input placeholder="Resposta correta " type="text" class="answer-txt">
                <input placeholder="URL da imagem"type="text" class="img-url">
                <h3>Respostas incorretas</h3>
                <input placeholder="Resposta incorreta 1" type="text" class="answer-txt">
                <input placeholder="URL da imagem 1"type="text" class="img-url">
                <div class="space"></div>
                <input placeholder="Resposta incorreta 2" type="text" class="answer-txt">
                <input placeholder="URL da imagem 2"type="text" class="img-url">
                <div class="space"></div>
                <input placeholder="Resposta incorreta 3" type="text" class="answer-txt">
                <input placeholder="URL da imagem 3"type="text" class="img-url">
            </div>
            <div class="space"></div>
        `;
    }
    return questions_box;
}

function createSecondScreen(){
    let firstScreen = document.querySelector(".main-box-basic-informations");
    firstScreen.classList.add("hidden");

    let secondScreen = document.querySelector(".create-questions-box");
    secondScreen.classList.remove("hidden");
    secondScreen.innerHTML = 
    `
    <h2>Crie suas perguntas</h2>
    ${createQuestions_box()}
    <div onclick="goToThirdScreen()" class="button"><p>Prosseguir pra criar níveis</p></div>
    `
}

//valida tamanho da questão
//entrada é uma string e saída é um booleano
function validateQuestionLength(question){
    console.log(question);
    return aboveOrEqualMin(question.length, 20);
}

function validateAllQuestionsLength(questions){
    for (let i = 0; i<questions.length; i++){
        if (validateQuestionLength(questions[i] === false)){
            return false;
        }
    }
    return true;
}

function validateBackgroundColor(str){
    if (str[0] === "#" && CSS.supports('color', str)){
        return true;
    } else {
        return false;
    }
}

function validateMultBackgoundColor(colors){
    for(let i = 0; i<colors.length; i++){
        if (validateBackgroundColor(colors[i]) === false){
            return false;
        }
    }
    return false;
}

//checa se a resposta não está vazia
//entada é uma string e saída é um booleano
function answerNotEmpty(answer){
    return aboveOrEqualMin(answer.length, 0);
}

function AllAnswersNotEmpty(answers){
    for(let i = 0; i<answers.length; i++){
        if (answerNotEmpty === false){
            return false;
        }
    }
    return true
}

//para validar a imageUrl de uma imageUrlm chame esta função genérica que criei
//esta função está escrita na seção de funções genéricas
//validateImageUrl("");

//checa se há uma resposta certa na lista de respostas
//a entrada é uma lista de respostas, a saída é booleano
function isThereARightAnswer_aux(answers){
    for(let i = 0; i < answers.length; i++){
        if (answers[i].isCorrectAnswer === true){
            return true;
        }
    } 
    return false
}

//conta quantidade de respostas erradas na questão
//entrada é um objeto questão, saída é um booleano
//retorna falso se quantity for menor que 1
function checkWrongAnswersQuantity(question){
    let quantity = howManyWrongAnswers(question.answers);
    return (aboveOrEqualMin(quantity, 1));
}

function validateQuizzQuestions(){
    let questions_text = document.querySelectorAll(".question-text").values;
    let valid_questions_text = validateAllQuestionsLength(questions_text);
    let question_colors = document.querySelectorAll(".question-color").values;
    let valid_question_colors = validateMultBackgoundColor(question_colors);
    let answers_text = document.querySelectorAll(".answer-text").values;
    let valid_answers_text = validateAllQuestionsLength(answers_text);
    let img_urls = document.querySelectorAll(".img-url").values;
    let valid_img_urls = validateMultImageUrl(img_urls);

    let isOkQuestion = valid_answers_text && valid_question_colors;
    let isOkAnswers = valid_answers_text && valid_img_urls;
    let isOk = isOkQuestion && isOkAnswers;
    if (isOk === true){
        dataToQuizz(questions_text, question_colors, answers_text, img_urls);
    }
    return isOk; 
}

function dataToQuizz(questions, colors, answers, urls){
    //let questions = [];
    for (let i = 0; i<questions.length; i++){
        question.title = questions[i];
        question.color = colors[i];
        for (let j = i; i<answers.length; j++){
            if (i === j){
                question.answers.push = {
                    text: answers[i],
                    image: urls[i],
                    isCorrectAnswer: true
                };
            } else {
                question.answers.push = {
                    text: answers[i],
                    image: urls[i],
                    isCorrectAnswer: false
                };
            }
        }
        quizz.questions.push(question);
        resetQuestion;
    }
}

function goToThirdScreen(){
    let isOk = validateQuizzQuestions();
    console.log(quizz);
    if (isOk === true){
        let secondScreen = document.querySelector(".create-questions-box");
        secondScreen.classList.add("hidden");

        let thirdScreen = document.querySelector(".create-levels-box");
        secondScreen.classList.remove("hidden");
    } else {
        alert("Algo está errado!");
    }
}

//fim Criação do Quizz: Perguntas do quizz

//




//lista dos Quizzes

function showQuizz(quizz){
    if (idUserPost.includes(quizz.id)){
        const content = document.querySelector(".grid")
        content.innerHTML += `<div class= "quizz" onclick = "showSecondScreen()"> 
        <div class = "card">
            <div class="front"></div>
            <img src=${quizz.image} alt =${quizz.title}/> 
            <span class = "quizzTitle" > ${quizz.title} </span> 
        </div> 
        </div>`
        return 
    }
    const content = document.querySelector(".grid")
    content.innerHTML += `<div class= "quizz" onclick = "showSecondScreen()"> 
    <div class = "card">
        <div class="front"></div>
        <img src=${quizz.image} alt =${quizz.title}/> 
        <span class = "quizzTitle" > ${quizz.title} </span> 
    </div> 
    </div>` 
}


 function getQuizes() {
    const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
    axios.get(url)
        .then((response) => {
            response.data.map((quizz) => showQuizz(quizz))
        })
        .catch(error => console.log("erro na requisição get: ", error))
}

<<<<<<< HEAD
getQuizes()


function showSecondScreen(){
    const content = document.querySelector("main")
    const secondeScreen = document.querySelector(".create-questions-box")
    content.classList.add("hidden")
    secondeScreen.classList.remove("hidden")
}

function showthirdScreen(){
    const content = document.querySelector("main")
    const thirdScreen = document.querySelector(".create-levels-box")
    content.classList.add("hidden")
    thirdScreen.classList.remove("hidden")
}

=======
hideScreens();
getQuizes();
>>>>>>> refs/remotes/origin/master
